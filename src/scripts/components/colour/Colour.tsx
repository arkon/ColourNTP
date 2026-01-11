import styled from 'styled-components';
import { format } from '../../modules/colours';
import { add } from '../../modules/saved';
import type { ColourFormat } from '../../constants/settings';

const ColourWrapper = styled.h2`
  animation: shiftUp 0.5s ease-out 0.15s forwards;
  contain: content;
  margin-top: 1.5rem;
  opacity: 0;
`;

const CopySpan = styled.span`
  cursor: pointer;
`;

interface ColourProps {
  colour: string;
  format: ColourFormat;
}

export function Colour({ colour, format: colourFormat }: ColourProps) {
  const formattedColour = format(colour, colourFormat);

  return (
    <ColourWrapper>
      <CopySpan
        className="copy"
        title="Copy to clipboard"
        data-clipboard-text={formattedColour}
        onClick={() => add(colour)}
      >
        {formattedColour}
      </CopySpan>
    </ColourWrapper>
  );
}
