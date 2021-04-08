/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { createEditor, Editor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import isHotKey from 'is-hotkey';
import io from 'socket.io-client';
import styled from 'styled-components';

const port = process.env.PORT || 3000;

// Client side socket
const socket = io(`https://localhost:${port}`);

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const SyncEditor = () => {
  // Create Slate editor object
  const editor = useMemo(() => withReact(createEditor()), []);

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
  // State of value of editor
  const [value, setValue] = useState(
    // [localStorage.getItem("content")] ||
    initialValue,
  );

  // Change handler for document
  const handleChange = (newValue) => {
    // console.log("change made");
    // State set to newValue
    setValue(newValue);
    // TODO: Save content value in db
    const content = JSON.stringify(newValue);
    // localStorage.getItem("content", content);
    console.log('content', content);
    // Emit that new value from server to clients
    socket.emit('update-content', newValue);
  };

  useEffect(() => {
    socket.once('init', (value) => {
      setValue(value);
    });

    socket.on('update-content', (data) => {
      // console.log('update', data)
      setValue(data);
    });
  });

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

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
      <Wrapper>
        <Slate editor={editor} value={value} onChange={handleChange}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
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
        </Slate>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: ghostwhite;
  position: absolute;
  width: 820px;
  height: 1100px;
  left: 49.5%;
  margin: 30px 0 50px -410px;
  padding: 30px 50px;
  background-color: white;
  box-shadow: 0 0 5px grey;
`;

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};

export default SyncEditor;
