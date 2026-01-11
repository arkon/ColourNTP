import { useOption } from './useOption';
import { Tooltip } from './Tooltip';
import { NestedContent } from '../../styles';
import type { Settings } from '../../constants/defaults';

interface CheckboxProps {
  label: string;
  tooltip?: string;
  optkey: keyof Settings;
  value: boolean;
  children?: React.ReactNode;
}

export function Checkbox({ label, tooltip, optkey, value: initialValue, children }: CheckboxProps) {
  const { value, handleChange } = useOption(optkey, initialValue);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => handleChange(e.target.checked)}
        />
        {tooltip ? (
          <Tooltip label={label} content={tooltip} />
        ) : (
          <span>{label}</span>
        )}
      </label>
      {value && children && <NestedContent>{children}</NestedContent>}
    </>
  );
}
