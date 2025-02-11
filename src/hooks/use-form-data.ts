import { useState, useCallback, Dispatch } from 'react';

export default function useFormData({
  initialData = {},
  valueGetter = (e: TInputEvent) => e.target.value,
} = {}): [
  IFormData,
  Dispatch<IFormData>,
  (e: TInputEvent) => void,
] {
  const [ data, setData ] = useState<IFormData>(initialData);

  const onChange = useCallback((e: TInputEvent) => {
    setData(data => ({
      ...data,
      [e.target.name]: valueGetter(e),
    }));
  }, [ valueGetter ]);

  return [ data, setData, onChange ];
}
