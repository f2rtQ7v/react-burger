import { AuthForm } from '../components/forms/';

const fields = [
  { type:     'text', name:     'name', placeholder:    'Имя' },
  { type:    'email', name:    'email', placeholder: 'E-mail' },
  { type: 'password', name: 'password', placeholder: 'Пароль' },
];

const links = [
  { text: 'Уже зарегистрировались?', linkText: 'Войти', to: '/login' },
];

export default function RegisterPage() {
  return (
    <AuthForm
      action="createUser"
      title="Регистрация"
      submitLabel="Зарегистрироваться"
      fields={fields}
      links={links}
    />
  );
}
