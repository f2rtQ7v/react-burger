import Form from '../components/form/form.jsx';

const formFields = [
  { type:     'text', name:     'name', placeholder:    'Имя' },
  { type:     'text', name:    'email', placeholder: 'E-mail' },
  { type: 'password', name: 'password', placeholder: 'Пароль', icon: 'HideIcon' },
];

const formLinks = [
  { text: 'Уже зарегистрировались?', linkText: 'Войти', to: '/login' },
];

export default function RegisterPage() {
  const onSubmit = formData => {

  };

  return (
    <Form
      title="Регистрация"
      submitTitle="Зарегистрироваться"
      fields={formFields}
      links={formLinks}
      onSubmit={onSubmit}
    />
  );
}
