import styled from 'styled-components';
import { useOption } from './useOption';
import { Tooltip } from './Tooltip';
import type { Settings } from '../../constants/defaults';

const OptionsContent = styled.div`
  margin-left: 1.5em;
`;

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
      {value && children && <OptionsContent>{children}</OptionsContent>}
    </>
  );
}
