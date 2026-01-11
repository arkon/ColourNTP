import { useState, useEffect, useCallback } from 'react';
import { setSetting } from '../../modules/browser';
import type { Settings } from '../../constants/defaults';

export function useOption<T>(optkey: keyof Settings, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = useCallback(
    (newValue: T) => {
      setSetting(optkey, newValue as never);
      setValue(newValue);
    },
    [optkey]
  );

  return { value, handleChange };
}
