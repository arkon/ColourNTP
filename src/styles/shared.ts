import styled from 'styled-components';

import { theme } from './theme';

/** Shared label for form inputs with inline layout */
export const FormLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5em;
`;

/** Container for nested options with indentation */
export const NestedContent = styled.div`
    margin-left: 1.5em;
`;

/** Standard button styling */
export const Button = styled.button`
  background: none;
  border: 1px solid ${theme.colors.lightGrey};
  cursor: pointer;
  color: ${theme.colors.white};
  font: inherit;
  font-size: 0.85em;
  padding: 0.25em 0.5em;
`;

/** Icon button with hover opacity effect */
export const IconButton = styled.button<{ $size?: string }>`
  background: none;
  border: 0;
  cursor: pointer;
  height: ${({ $size }) => $size || '1em'};
  opacity: 0.5;
  transition: opacity 0.2s;
  width: ${({ $size }) => $size || '1em'};

  &:hover {
    opacity: 1;
  }

  svg {
    fill: ${theme.colors.white};
    height: 100%;
    width: 100%;
  }
`;
