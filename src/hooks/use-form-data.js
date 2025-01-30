import { useState, useCallback } from 'react';

export default function useFormData(initialState = {}) {
  const [ data, setData ] = useState(initialState);

  const onChange = useCallback(({ target: t }) => {
    setData(data => ({
      ...data,
      [t.name]: t.value,
    }));
  }, []);

  return { data, setData, onChange };
}
