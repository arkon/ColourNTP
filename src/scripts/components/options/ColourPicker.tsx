import styled from 'styled-components';
import { useOption } from './useOption';
import type { Settings } from '../../constants/defaults';

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

interface ColourPickerProps {
  label: string;
  optkey: keyof Settings;
  value: string;
}

export function ColourPicker({ label, optkey, value: initialValue }: ColourPickerProps) {
  const { value, handleChange } = useOption(optkey, initialValue);

  return (
    <Label>
      <span>{label}:</span>
      <input
        type="color"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Label>
  );
}
