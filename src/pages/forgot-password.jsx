import { AuthForm } from '../components/forms/';

const fields = [
  { type: 'email', name: 'email', placeholder: 'Укажите e-mail' },
];

const links = [
  { text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' },
];

export default function ForgotPasswordPage() {
  return (
    <AuthForm
      action="forgotPassword"
      redirect="/reset-password"
      title="Восстановление пароля"
      submitLabel="Восстановить"
      fields={fields}
      links={links}
    />
  );
}
