import type { Settings } from '../../constants/defaults';

import { FormLabel } from '../../styles';
import { useOption } from './useOption';

interface DropdownProps {
    label: string;
    options: readonly string[];
    optkey: keyof Settings;
    value: string;
}

export function Dropdown({ label, options, optkey, value: initialValue }: DropdownProps) {
    const { value, handleChange } = useOption(optkey, initialValue);

    return (
        <FormLabel>
            <span>{label}:</span>
            <select value={value} onChange={(e) => handleChange(e.target.value)}>
                {options.map((item, i) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </FormLabel>
    );
}
