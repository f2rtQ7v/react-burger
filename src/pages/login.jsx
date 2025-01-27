import Form from '../components/form/form.jsx';

const formFields = [
  { type:     'text', name:    'email', placeholder: 'E-mail' },
  { type: 'password', name: 'password', placeholder: 'Пароль', icon: 'HideIcon' },
];

const formLinks = [
  { text: 'Вы - новый пользователь?', linkText: 'Зарегистрироваться',  to: '/register' },
  { text: 'Забыли пароль?',           linkText: 'Восстановить пароль', to: '/forgot-password' },
];

export default function LoginPage() {
  const onSubmit = formData => {

  };

  return (
    <Form
      title="Вход"
      submitTitle="Войти"
      fields={formFields}
      links={formLinks}
      onSubmit={onSubmit}
    />
  );
}
