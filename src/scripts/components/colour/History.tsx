import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import type { ColourFormat } from '../../constants/settings';
import { format } from '../../modules/colours';
import { add } from '../../modules/saved';
import { theme } from '../../styles/theme';

const HistoryWrapper = styled.div`
  bottom: 0;
  display: flex;
  height: 0.5em;
  left: 0;
  position: fixed;
  right: 0;
  z-index: ${theme.zIndex.above};
`;

const HistoryItem = styled.div<{ $color?: string }>`
  background-color: ${({ $color }) => $color || 'transparent'};
  cursor: pointer;
  flex: 1;
  transition: background-color 0.8s;

  &::after {
    background: inherit;
    color: inherit;
    content: attr(data-colour);
    display: block;
    font-size: 0.75rem;
    opacity: 0;
    padding: 0.5em;
    position: relative;
    top: -2em;
    transition: opacity 0.2s;
    white-space: nowrap;
  }

  &:hover::after {
    opacity: 1;
  }
`;

interface HistoryProps {
    colour: string;
    format: ColourFormat;
    max?: number;
}

export function History({ colour, format: colourFormat, max = 10 }: HistoryProps) {
    const [history, setHistory] = useState<(string | undefined)[]>(() => new Array(max));
    const lastColourRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (colour !== lastColourRef.current) {
            lastColourRef.current = colour;
            setHistory((prev) => {
                const newHistory = [...prev, colour];
                return newHistory.slice(-max);
            });
        }
    }, [colour, max]);

    return (
        <HistoryWrapper>
            {history.map((c, i) => {
                if (!c) return <HistoryItem key={i} />;

                const formattedColour = format(c, colourFormat);

                return (
                    <HistoryItem
                        key={i}
                        $color={c}
                        data-colour={formattedColour}
                        data-clipboard-text={formattedColour}
                        onClick={() => add(c)}
                    />
                );
            })}
        </HistoryWrapper>
    );
}
