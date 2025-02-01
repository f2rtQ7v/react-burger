import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useFormData from '../hooks/use-form-data.js';
import Form from '../components/form/form.jsx';

const fields = [
  { type:     'text', name:     'name', placeholder:    'Имя', icon: 'EditIcon' },
  { type:    'email', name:    'email', placeholder: 'E-mail', icon: 'EditIcon' },
  { type: 'password', name: 'password', placeholder: 'Пароль', icon: 'EditIcon' },
];

export default function SettingsPage() {
  const { user } = useSelector(state => state.auth);
  const { data, setData, onChange } = useFormData();
  const reset = useCallback(() => setData(user), [ user, setData ]);

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
