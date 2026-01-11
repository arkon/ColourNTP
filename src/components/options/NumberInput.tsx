import type { Settings } from '../../constants/defaults';
import { FormLabel } from '../../styles';
import { useOption } from './useOption';

interface NumberInputProps {
    label: string;
    optkey: keyof Settings;
    value: number;
}

export function NumberInput({ label, optkey, value: initialValue }: NumberInputProps) {
    const { value, handleChange } = useOption(optkey, initialValue);

    return (
        <FormLabel>
            <span>{label}:</span>
            <input
                type="number"
                min="1"
                max="20"
                value={value.toString()}
                onChange={(e) => handleChange(parseInt(e.target.value, 10))}
            />
        </FormLabel>
    );
}
