import { useState, useCallback } from 'react';

export default function useFormData({
  initialData = {},
  valueGetter = e => e.target.value,
} = {}) {
  const [ data, setData ] = useState(initialData);

  const onChange = useCallback(e => {
    setData(data => ({
      ...data,
      [e.target.name]: valueGetter(e),
    }));
  }, [ valueGetter ]);

  return [ data, setData, onChange ];
}
