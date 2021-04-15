import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledLink = styled(NavLink)`
  text-decoration: none;
`;

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
