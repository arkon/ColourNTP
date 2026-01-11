import { type ReactElement } from 'react';
import { Radio } from './Radio';
import { useOption } from './useOption';
import type { Settings } from '../../constants/defaults';

interface RadioGroupProps {
  group: string;
  optkey: keyof Settings;
  value: string;
  children: ReactElement<{
    label: string;
    tooltip?: string;
    value: string;
    children?: React.ReactNode;
  }>[];
}

export function RadioGroup({ group, optkey, value: initialValue, children }: RadioGroupProps) {
  const { value, handleChange } = useOption(optkey, initialValue);

  return (
    <>
      {children.map((radio, i) => (
        <Radio
          key={i}
          label={radio.props.label}
          tooltip={radio.props.tooltip}
          value={radio.props.value}
          checked={value === radio.props.value}
          group={group}
          onChange={handleChange}
        >
          {radio.props.children}
        </Radio>
      ))}
    </>
  );
}
