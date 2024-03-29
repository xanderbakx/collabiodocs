/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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
import { Button } from '../styles/buttons';
import { getSingleDocument, updateSingleDocument } from '../store';

// Client side socket
const socket = io();

const SyncEditor = ({
  singleDocument,
  getSingleDocument,
  updateSingleDocument,
}) => {
  // debugger;
  const params = useParams();

  // Display document content from specified ID
  useEffect(() => {
    getSingleDocument(params.id);
  }, [params.id]);

  // Set initial document value
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'hello' }],
    },
  ];

  // State of value of editor
  const [slateValue, setSlateValue] = useState(initialValue);

  // Get username and room
  const room = params.id;

  // Set state for document body
  useEffect(() => {
    if (!singleDocument.body) return;
    console.log(singleDocument.body);
    setSlateValue(JSON.parse(singleDocument.body));
  }, [singleDocument._id]);

  // Save handler to update content in DB
  const handleSave = () => {
    const { id } = params;
    console.log('saved -->', slateValue);
    setSlateValue(slateValue);
    updateSingleDocument(id, { body: JSON.stringify(slateValue) });
    // socket.emit('update-content', slateValue);
  };

  useEffect(() => {
    // User has joined document room
    socket.emit('join-room', room);
    // Document change has been made
    socket.on('update-content', (value) => {
      console.log('socket value --->', value);
      setSlateValue(value);
    });

    return () => {
      socket.off('update-content');
    };
  }, []);

  // Create Slate editor object
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <>
      <Helmet>
        <title>{singleDocument.fileName}</title>
      </Helmet>
      <Slate
        editor={editor}
        value={slateValue}
        onChange={(value) => {
          // Filter out click operations
          const ops = editor.operations.filter((o) => {
            if (o) {
              return o.type !== 'set_selection' && o.type !== 'set_value';
            }
            return false;
          });
          // Emit that new value from server to clients
          if (ops.length) {
            setSlateValue(value);
            socket.emit('update-content', value);
          }
        }}
      >
        <ToolbarWrapper>
          <SaveButton variant="contained" type="submit" onClick={handleSave}>
            Save
          </SaveButton>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />

          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        </ToolbarWrapper>
        <FileName>{singleDocument.fileName}</FileName>
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
  left: 50%;
  margin: 30px 0 50px -410px;
  padding: 50px 50px;
  background-color: white;
  box-shadow: 0 0 5px grey;
`;

const ToolbarWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(9, 1fr) 18fr;
  background: #9393a8;
  color: white;
  font-family: Helvetica;
  font-weight: 300;
`;

const SaveButton = styled(Button)`
  background-color: darkseagreen;
  border: none;
  border-radius: 0.2rem;
  &:hover {
    background-color: #b1cab1;
  }
`;

const FileName = styled.h1`
  text-align: center;
`;

const mapState = (state) => ({
  singleDocument: state.singleDocument,
});

const mapDispatch = (dispatch) => ({
  getSingleDocument: (id) => dispatch(getSingleDocument(id)),
  updateSingleDocument: (id, document) => dispatch(updateSingleDocument(id, document)),
});

export default connect(mapState, mapDispatch)(SyncEditor);
