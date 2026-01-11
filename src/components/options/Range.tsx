import styled from 'styled-components';

import type { Settings } from '../../constants/defaults';
import { useOption } from './useOption';

const Label = styled.label`
  display: block;
`;

const RangeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-top: 0.25em;
`;

interface RangeProps {
    label: string;
    optkey: keyof Settings;
    value: number;
}

export function Range({ label, optkey, value: initialValue }: RangeProps) {
    const { value, handleChange } = useOption(optkey, initialValue);

    return (
        <Label>
            <p>{label}:</p>
            <RangeRow>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={value}
                    onChange={(e) => handleChange(parseInt(e.target.value, 10))}
                />
                <span>({value}%)</span>
            </RangeRow>
        </Label>
    );
}
