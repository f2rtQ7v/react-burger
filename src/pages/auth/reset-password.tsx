import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthData } from '../../services/auth/slice.ts';
import AuthPage from './auth-page/auth-page.tsx';

const fields = [
  { type: 'password', name: 'password', placeholder:  'Введите новый пароль' },
  { type:     'text', name:    'token', placeholder: 'Введите код из письма' },
];

const links = [
  { text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' },
];

export default function ResetPasswordPage() {
  const { resetPassword: { forgotPassword } } = useSelector(getAuthData);

  if (!forgotPassword) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <AuthPage
      action="resetPassword"
      redirect="/login"
      title="Восстановление пароля"
      submitLabel="Сохранить"
      fields={fields}
      links={links}
    />
  );
}
