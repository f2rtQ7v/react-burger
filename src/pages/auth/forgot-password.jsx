import AuthPage from './auth-page/auth-page.jsx';

const fields = [
  { type: 'email', name: 'email', placeholder: 'Укажите e-mail' },
];

const links = [
  { text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' },
];

export default function ForgotPasswordPage() {
  return (
    <AuthPage
      action="forgotPassword"
      redirect="/reset-password"
      title="Восстановление пароля"
      submitLabel="Восстановить"
      fields={fields}
      links={links}
    />
  );
}
