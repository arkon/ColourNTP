import { useOption } from './useOption';
import { FormLabel } from '../../styles';
import type { Settings } from '../../constants/defaults';

interface TextboxProps {
  label: string;
  optkey: keyof Settings;
  value: string;
}

export function Textbox({ label, optkey, value: initialValue }: TextboxProps) {
  const { value, handleChange } = useOption(optkey, initialValue);

  return (
    <FormLabel>
      <span>{label}:</span>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </FormLabel>
  );
}
