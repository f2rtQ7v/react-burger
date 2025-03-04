import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../services/features/auth/slice.ts';
import AuthPage, { IAuthPageProps } from './auth-page/auth-page.tsx';

const props: IAuthPageProps = {
  action: 'resetPassword',
  redirect: '/login',
  title: 'Восстановление пароля',
  submitLabel: 'Сохранить',
  fields: [
    { type: 'password', name: 'password', placeholder:  'Введите новый пароль' },
    { type:     'text', name:    'token', placeholder: 'Введите код из письма' },
  ],
  links: [
    { text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' },
  ],
};

export default function ResetPasswordPage() {
  const auth = useSelector(getAuthState);
  return auth.passwordResetRequired
    ? <AuthPage {...props} />
    : <Navigate to="/forgot-password" replace />;
}
