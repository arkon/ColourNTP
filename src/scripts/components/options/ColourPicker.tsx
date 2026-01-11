import { useOption } from './useOption';
import { FormLabel } from '../../styles';
import type { Settings } from '../../constants/defaults';

interface ColourPickerProps {
  label: string;
  optkey: keyof Settings;
  value: string;
}

export function ColourPicker({ label, optkey, value: initialValue }: ColourPickerProps) {
  const { value, handleChange } = useOption(optkey, initialValue);

  return (
    <FormLabel>
      <span>{label}:</span>
      <input
        type="color"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </FormLabel>
  );
}
