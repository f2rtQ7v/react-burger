import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthForm } from '../components/forms/';

const fields = [
  { type: 'password', name: 'password', placeholder:  'Введите новый пароль' },
  { type:     'text', name:    'token', placeholder: 'Введите код из письма' },
];

const links = [
  { text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' },
];

export default function ResetPasswordPage() {
  const { forgotPassword } = useSelector(state => state.auth);

  if (!forgotPassword) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <AuthForm
      action="resetPassword"
      redirect="/login"
      title="Восстановление пароля"
      submitLabel="Сохранить"
      fields={fields}
      links={links}
    />
  );
}
