import styled from 'styled-components';
import { useOption } from './useOption';
import type { Settings } from '../../constants/defaults';

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

interface TextboxProps {
  label: string;
  optkey: keyof Settings;
  value: string;
}

export function Textbox({ label, optkey, value: initialValue }: TextboxProps) {
  const { value, handleChange } = useOption(optkey, initialValue);

  return (
    <Label>
      <span>{label}:</span>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Label>
  );
}
