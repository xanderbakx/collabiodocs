/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEditor, Editor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import isHotKey from 'is-hotkey';
import io from 'socket.io-client';
import styled from 'styled-components';
import MarkButton, { Element, Leaf } from '../slateConfig';
import Header from './Header';
import { Button } from '../styles/buttons';
import { getSingleDocument, updateSingleDocument } from '../store';

// Client side socket
const socket = io();

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const SyncEditor = ({
  singleDocument,
  getSingleDocument,
  updateSingleDocument,
}) => {
  const params = useParams();

  // Set initial document value
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];

  // State of value of editor
  const [slateValue, setSlateValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  // Create Slate editor object
  const editor = useMemo(() => withReact(createEditor()), []);

  // Socket Connections
  useEffect(() => {
    socket.once('init', (value) => {
      setSlateValue(value);
    });

    socket.on('update-content', (data) => {
      setSlateValue(data);
    });
  });

  // Display document content from specified ID
  useEffect(() => {
    getSingleDocument(params.id);
  }, []);

  // Set state for document body
  useEffect(() => {
    if (!singleDocument.body) return;
    setSlateValue(JSON.parse(singleDocument.body));
  }, [singleDocument._id]);

  // Change handler for document
  const handleChange = (newValue) => {
    // State set to newValue
    setSlateValue(newValue);
    // console.log('value', newValue);
    // Emit that new value from server to clients
    socket.emit('update-content', newValue);
  };

  // Save handler to update content in DB
  const handleSave = () => {
    const { id } = params;
    updateSingleDocument(id, { body: JSON.stringify(slateValue) });
    setSlateValue(slateValue);
  };

  // SlateJS Specific
  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <>
      <Slate editor={editor} value={slateValue} onChange={handleChange}>
        <ToolbarWrapper>
          <Button variant="contained" type="submit" onClick={handleSave}>
            Save
          </Button>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <Header />
        </ToolbarWrapper>
        <Wrapper>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Start typing..."
            onKeyDown={(event) => {
              Object.keys(HOTKEYS).forEach((hotkey) => {
                if (isHotKey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              });
            }}
          />
        </Wrapper>
      </Slate>
    </>
  );
};

const Wrapper = styled.div`
  background-color: ghostwhite;
  position: absolute;
  width: 816px;
  height: 1056px;
  left: 49.5%;
  margin: 30px 0 50px -410px;
  padding: 50px 50px;
  background-color: white;
  box-shadow: 0 0 5px grey;
`;

const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #9393a8;
  color: white;
  font-family: Helvetica;
  font-weight: 300;
`;

const mapState = (state) => ({
  singleDocument: state.singleDocument,
});

const mapDispatch = (dispatch) => ({
  getSingleDocument: (id) => dispatch(getSingleDocument(id)),
  updateSingleDocument: (id, document) => dispatch(updateSingleDocument(id, document)),
});

export default connect(mapState, mapDispatch)(SyncEditor);
