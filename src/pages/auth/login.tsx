import AuthPage, { IAuthPageProps } from './auth-page/auth-page.tsx';

const props: IAuthPageProps = {
  action: 'login',
  title: 'Вход',
  submitLabel: 'Войти',
  fields: [
    { type:    'email', name:    'email', placeholder: 'E-mail' },
    { type: 'password', name: 'password', placeholder: 'Пароль' },
  ],
  links: [
    { text: 'Вы - новый пользователь?', linkText: 'Зарегистрироваться',  to: '/register' },
    { text: 'Забыли пароль?',           linkText: 'Восстановить пароль', to: '/forgot-password' },
  ],
};

export default function LoginPage() {
  return <AuthPage {...props} />;
}
