import styled from 'styled-components';
import { useOption } from './useOption';
import type { Settings } from '../../constants/defaults';

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

interface NumberInputProps {
  label: string;
  optkey: keyof Settings;
  value: number;
}

export function NumberInput({ label, optkey, value: initialValue }: NumberInputProps) {
  const { value, handleChange } = useOption(optkey, initialValue);

  return (
    <Label>
      <span>{label}:</span>
      <input
        type="number"
        min="1"
        max="20"
        value={value.toString()}
        onChange={(e) => handleChange(parseInt(e.target.value, 10))}
      />
    </Label>
  );
}
