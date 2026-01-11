import styled from 'styled-components';
import { theme } from '../../styles/theme';

const TooltipWrapper = styled.abbr`
  user-select: none;
  position: relative;

  &::after {
    color: ${theme.colors.lightGrey};
    content: '[?]';
    font-size: 0.8em;
    margin-left: 0.75em;
  }
`;

const TooltipContent = styled.div`
  border: 1px solid ${theme.colors.lightGrey};
  display: none;
  margin-left: 2.5em;
  margin-top: -1em;
  max-width: 25em;
  padding: 0.5em 1.25em;
  z-index: ${theme.zIndex.above};

  ${TooltipWrapper}:hover & {
    background: ${theme.colors.white};
    color: ${theme.colors.darkGrey};
    display: inline-block;
    position: absolute;

    &::before {
      border-bottom: 0.75em solid transparent;
      border-right: 0.75em solid ${theme.colors.white};
      border-top: 0.75em solid transparent;
      content: '';
      font-size: 1rem;
      height: 0;
      left: -0.5em;
      position: absolute;
      top: 1.25em;
      width: 0;
    }
  }

  strong {
    line-height: 1.25;
  }
`;

interface TooltipProps {
  label: string;
  content: string;
}

export function Tooltip({ label, content }: TooltipProps) {
  return (
    <TooltipWrapper>
      <span>{label}</span>
      <TooltipContent>
        <strong>{label}</strong>
        <p>{content}</p>
      </TooltipContent>
    </TooltipWrapper>
  );
}
