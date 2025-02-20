import AuthPage, { IAuthPageProps } from './auth-page/auth-page.tsx';

const props: IAuthPageProps = {
  action: 'createUser',
  title: 'Регистрация',
  submitLabel: 'Зарегистрироваться',
  fields: [
    { type:     'text', name:     'name', placeholder:    'Имя' },
    { type:    'email', name:    'email', placeholder: 'E-mail' },
    { type: 'password', name: 'password', placeholder: 'Пароль' },
  ],
  links: [
    { text: 'Уже зарегистрировались?', linkText: 'Войти', to: '/login' },
  ],
};

export default function RegisterPage() {
  return <AuthPage {...props} />;
}
