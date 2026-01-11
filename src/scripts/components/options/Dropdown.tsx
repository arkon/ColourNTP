import styled from 'styled-components';
import { useOption } from './useOption';
import type { Settings } from '../../constants/defaults';

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

interface DropdownProps {
  label: string;
  options: readonly string[];
  optkey: keyof Settings;
  value: string;
}

export function Dropdown({ label, options, optkey, value: initialValue }: DropdownProps) {
  const { value, handleChange } = useOption(optkey, initialValue);

  return (
    <Label>
      <span>{label}:</span>
      <select value={value} onChange={(e) => handleChange(e.target.value)}>
        {options.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </Label>
  );
}
