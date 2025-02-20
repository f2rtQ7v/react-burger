import AuthPage, { IAuthPageProps } from './auth-page/auth-page.tsx';

const props: IAuthPageProps = {
  action: 'forgotPassword',
  redirect: '/reset-password',
  title: 'Восстановление пароля',
  submitLabel: 'Восстановить',
  fields: [
    { type: 'email', name: 'email', placeholder: 'Укажите e-mail' },
  ],
  links: [
    { text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' },
  ],
};

export default function ForgotPasswordPage() {
  return <AuthPage {...props} />;
}
