import styled from 'styled-components';
import { Tooltip } from './Tooltip';

const OptionsContent = styled.div`
  margin-left: 1.5em;
`;

interface RadioProps {
  label: string;
  tooltip?: string;
  value: string;
  group?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

export function Radio({
  label,
  tooltip,
  value,
  group,
  checked,
  onChange,
  children,
}: RadioProps) {
  return (
    <>
      <label>
        <input
          type="radio"
          name={group}
          checked={checked}
          onChange={() => onChange?.(value)}
        />
        {tooltip ? (
          <Tooltip label={label} content={tooltip} />
        ) : (
          <span>{label}</span>
        )}
      </label>
      {checked && children && <OptionsContent>{children}</OptionsContent>}
    </>
  );
}
