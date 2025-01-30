import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFormData from '../../../hooks/use-form-data.js';
import { updateUser } from '../../../services/auth/actions.js';
import { Form } from '../../../components/forms/';
import { LoadingScreen } from '../../../components/screens/';
//import styles from './settings.module.css';

const fields = [
  { type:     'text', name:     'name', placeholder:    'Имя', icon: 'EditIcon' },
  { type:    'email', name:    'email', placeholder: 'E-mail', icon: 'EditIcon' },
  { type: 'password', name: 'password', placeholder: 'Пароль', icon: 'EditIcon' },
];

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { data, setData, onChange } = useFormData();
  const { request, error } = useSelector(state => state.auth);
  const isChanged = data !== user;
  const onSubmit = () => dispatch(updateUser(data));
  const onReset = () => setData(user);

  useEffect(() => {
    setData(user);
  }, [ setData, user ]);

  return (<>
    <Form
      submitLabel="Сохранить"
      fields={fields}
      data={data}
      onChange={onChange}
      onSubmit={isChanged ? onSubmit : null}
      onReset={isChanged ? onReset : null}
      error={error}
    />
    {request && <LoadingScreen />}
  </>);
}
