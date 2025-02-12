import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuthState } from '../services/auth/slice.ts';
import useFormData from '../hooks/use-form-data.ts';
import Form from '../components/form/form.tsx';

const fields = [
  { type:     'text', name:     'name', placeholder:    'Имя' },
  { type:    'email', name:    'email', placeholder: 'E-mail' },
  { type: 'password', name: 'password', placeholder: 'Пароль' },
];

export default function SettingsPage() {
  const { user } = useSelector(getAuthState);
  const [ data, setData, onChange ] = useFormData({ initialData: user! });
  const reset = useCallback(() => setData(user!), [ user, setData ]);

  useEffect(reset, [ reset ]);

  return (
    <Form
      action="updateUser"
      submitLabel="Сохранить"
      fields={fields}
      data={data}
      onChange={onChange}
      onReset={reset}
      showButtons={data !== user}
    />
  );
}
