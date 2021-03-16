import styled from 'styled-components';
import { colour } from '../../../shared/styles/StyleConstants';

export const StyledLink = styled.h1`
  color: ${colour.primary};
  margin-bottom: 1rem;
  &:hover {
    color: ${colour.secondary};
  }
  {/* Important for the options not to disappear */}
  font-size: 1rem;
`;

export const Menu = styled.div`
  width: 100vw;
  padding-top: 2rem;
  height: 100vh;
  max-height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  text-align: center;
  opacity: 0.9;
  transform: translateX(${props => props.translate}vw);
  transition: 0.5s ease;
  background: ${colour.background1};
  overflow-y: scroll;
`;
