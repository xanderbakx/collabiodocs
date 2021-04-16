import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  padding: 0.6em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 0 0.3em;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: black;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color: #000000;
    background-color: #ffffff;
  }
`;

export const ToolbarButton = styled.button`
  display: inline-block;
  border: none;
  background-color: #e3e3e3;
  margin: 0 0.3em;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color: #000000;
    background-color: #ffffff;
  }
`;
