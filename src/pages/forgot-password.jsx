import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/forms/';

const fields = [
  { type: 'email', name: 'email', placeholder: 'Укажите e-mail' },
];

const links = [
  { text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' },
];

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate('/reset-password', {
      replace: true,
    });
  };

  return (
    <AuthForm
      action="forgotPassword"
      title="Восстановление пароля"
      submitLabel="Восстановить"
      fields={fields}
      onSubmit={onSubmit}
      links={links}
    />
  );
}
