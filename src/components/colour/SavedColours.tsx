import { useState, useEffect } from 'react';
import styled from 'styled-components';

import type { ColourFormat } from '../../constants/settings';
import { get, remove, clear } from '../../modules/saved';
import { theme } from '../../styles/theme';
import { SavedColour } from './SavedColour';

const SavedColoursWrapper = styled.div`
  h1 {
    margin-bottom: 0.5em;
  }
`;

const Button = styled.button`
  background: none;
  border: 1px solid ${theme.colors.lightGrey};
  cursor: pointer;
  color: ${theme.colors.white};
  font: inherit;
  font-size: 0.85em;
  padding: 0.25em 0.5em;
`;

const EmptyMessage = styled.p`
  color: ${theme.colors.lightGrey};
  font-size: 0.9em;
`;

interface SavedColoursProps {
    format: ColourFormat;
}

export function SavedColours({ format }: SavedColoursProps) {
    const [colours, setColours] = useState<string[]>([]);

    useEffect(() => {
        get().then(setColours);
    }, []);

    const handleRemove = (index: number) => {
        setColours(remove(index));
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to remove all of your saved colours?')) {
            setColours(clear());
        }
    };

    return (
        <SavedColoursWrapper>
            <h1>Saved</h1>

            {colours.length > 0 ? (
                <Button onClick={handleClear}>Remove all</Button>
            ) : (
                <EmptyMessage>
                    You don't have anything saved!
                    <br />
                    Click on a code to save it.
                </EmptyMessage>
            )}

            {colours.map((colour, i) => (
                <SavedColour key={i} index={i} colour={colour} format={format} onRemove={handleRemove} />
            ))}
        </SavedColoursWrapper>
    );
}
