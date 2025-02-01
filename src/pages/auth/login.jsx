import AuthPage from './auth-page/auth-page.jsx';

const fields = [
  { type:    'email', name:    'email', placeholder: 'E-mail' },
  { type: 'password', name: 'password', placeholder: 'Пароль' },
];

const links = [
  { text: 'Вы - новый пользователь?', linkText: 'Зарегистрироваться',  to: '/register' },
  { text: 'Забыли пароль?',           linkText: 'Восстановить пароль', to: '/forgot-password' },
];

export default function LoginPage() {
  return (
    <AuthPage
      action="login"
      redirect="/"
      title="Вход"
      submitLabel="Войти"
      fields={fields}
      links={links}
    />
  );
}
