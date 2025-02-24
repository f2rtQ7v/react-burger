import { useState, useCallback, useEffect, Dispatch } from 'react';

type TValidator = (val: string) => string;
type TValidations = {
  [key: string]: TValidator[];
};

type TFormDataOptions = {
  initialData?: TFormData;
  fields?: TFormItem[];
};

type TFormDataReturn = {
  data: TFormData,
  setData: Dispatch<TFormData>,
  onChange: (e: TInputEvent) => void,
  errors: TFormData,
};

const validateEmpty: TValidator = val => val ? '' : 'Заполните поле';

const validations: TValidations = {
  text: [
    validateEmpty,
  ],
  email: [
    validateEmpty,
    val => /.@./.test(val) ? '' : 'Адрес электронной почты должен состоять из двух частей, разделённых символом "@"',
  ],
  password: [
    validateEmpty,
    val => {
      const min = 3;
      return val.length >= min ? '' : `Пароль должен быть длиннее, минимальное количество символов - ${min}`;
    },
  ],
};

function validate(formItem: TFormItem, value: string) {
  for (const n of validations[formItem.type] ?? []) {
    const result = n(value);
    if (result) {
      return result;
    }
  }

  return '';
}

export default function useFormData({
  initialData = {},
  fields = [],
}: TFormDataOptions): TFormDataReturn {
  const [ data, setData ] = useState<TFormData>(initialData);
  const [ errors, setErrors ] = useState<TFormData>({});

  const onChange = useCallback(({ target: t }: TInputEvent) => {
    setData(data => ({
      ...data,
      [t.name]: t.value,
    }));
  }, []);

  useEffect(() => {
    setErrors(Object.fromEntries(fields.map(n => [
      n.name,
      validate(n, data[n.name] || ''),
    ])));
  }, [ fields, data ]);

  return { data, setData, onChange, errors };
}
