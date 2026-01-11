import styled from 'styled-components';

import closeSvg from '../../../assets/img/close.svg?raw';
import type { ColourFormat } from '../../constants/settings';
import { format, isDark, hexToRgb } from '../../modules/colours';

const SavedColourWrapper = styled.div<{ $isDark: boolean }>`
  border-radius: 3px;
  cursor: pointer;
  margin-top: 0.5em;
  padding: 0.5em 1em;
  position: relative;
  transition: transform 0.2s;
  color: ${({ $isDark }) => ($isDark ? '#111' : '#fff')};

  &:hover {
    transform: scale(1.05);
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  height: 0.75em;
  opacity: 0;
  position: absolute;
  right: 0.75em;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.2s;
  width: 0.75em;

  ${SavedColourWrapper}:hover & {
    opacity: 0.5;
  }

  &:hover {
    opacity: 1 !important;
  }

  svg {
    height: 100%;
    width: 100%;
  }
`;

interface SavedColourProps {
    index: number;
    colour: string;
    format: ColourFormat;
    onRemove: (index: number) => void;
}

export function SavedColour({ index, colour, format: colourFormat, onRemove }: SavedColourProps) {
    const formattedColour = format(colour, colourFormat);
    const colourIsDark = isDark(...hexToRgb(colour));

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove(index);
    };

    return (
        <SavedColourWrapper
            $isDark={colourIsDark}
            style={{ backgroundColor: colour }}
            title="Copy to clipboard"
            data-clipboard-text={formattedColour}
        >
            {formattedColour}
            <RemoveButton title="Remove" onClick={handleRemove} dangerouslySetInnerHTML={{ __html: closeSvg }} />
        </SavedColourWrapper>
    );
}
