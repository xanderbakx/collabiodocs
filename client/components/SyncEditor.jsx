/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import isHotKey from 'is-hotkey';
import io from 'socket.io-client';
import styled from 'styled-components';
import {
  MarkButton,
  BlockButton,
  Element,
  Leaf,
  HOTKEYS,
  toggleMark,
} from '../slateConfig';
import Header from './Header';
import { Button } from '../styles/buttons';
import { getSingleDocument, updateSingleDocument } from '../store';

// Client side socket
const socket = io();

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

  // Display document content from specified ID
  useEffect(() => {
    getSingleDocument(params.id);
    console.log('getSingle');
  }, []);

  // Set state for document body
  useEffect(() => {
    if (!singleDocument.body) return;
    setSlateValue(JSON.parse(singleDocument.body));
    console.log('set value', singleDocument.body);
  }, [singleDocument._id]);

  // Create Slate editor object
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor()), []);

  // Socket Connections
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected', socket.connected);
    });
    socket.on('update-content', (data) => {
      console.log('socket data', data);
      setSlateValue(data);
    });
    console.log('socket');
  }, []);

  // Change handler for document
  const handleChange = (newValue) => {
    // State set to newValue
    setSlateValue(newValue);
    // Emit that new value from server to clients
    socket.emit('update-content', newValue);
    console.log('handleChange', slateValue);
  };

  // Save handler to update content in DB
  const handleSave = () => {
    const { id } = params;
    updateSingleDocument(id, { body: JSON.stringify(slateValue) });
    setSlateValue(slateValue);
  };

  return (
    <>
      <Slate
        editor={editor}
        value={slateValue}
        onChange={() => handleChange(slateValue)}
      >
        <ToolbarWrapper>
          <Button variant="contained" type="submit" onClick={handleSave}>
            Save
          </Button>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />

          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          <Header />
        </ToolbarWrapper>
        <Wrapper>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            autoFocus
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
