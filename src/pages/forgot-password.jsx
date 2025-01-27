import Form from '../components/form/form.jsx';

const formFields = [
  { type: 'text', name: 'email', placeholder: 'Укажите e-mail' },
];

const formLinks = [
  { text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' },
];

export default function ForgotPasswordPage() {
  const onSubmit = formData => {

  };

  return (
    <Form
      title="Восстановление пароля"
      submitTitle="Восстановить"
      fields={formFields}
      links={formLinks}
      onSubmit={onSubmit}
    />
  );
}
