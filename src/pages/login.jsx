import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/forms/';

const fields = [
  { type:    'email', name:    'email', placeholder: 'E-mail' },
  { type: 'password', name: 'password', placeholder: 'Пароль' },
];

const links = [
  { text: 'Вы - новый пользователь?', linkText: 'Зарегистрироваться',  to: '/register' },
  { text: 'Забыли пароль?',           linkText: 'Восстановить пароль', to: '/forgot-password' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate('/', {
      replace: true,
    });
  };

  return (
    <AuthForm
      action="login"
      title="Вход"
      submitLabel="Войти"
      fields={fields}
      onSubmit={onSubmit}
      links={links}
    />
  );
}
