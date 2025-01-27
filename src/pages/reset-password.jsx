import Form from '../components/form/form.jsx';

const formFields = [
  { type: 'password', name: 'password', placeholder:  'Введите новый пароль' },
  { type:     'text', name:     'code', placeholder: 'Введите код из письма' },
];

const formLinks = [
  { text: 'Вспомнили пароль?', linkText: 'Войти', to: '/login' },
];

export default function ResetPasswordPage() {
  const onSubmit = formData => {

  };

  return (
    <Form
      title="Восстановление пароля"
      submitTitle="Сохранить"
      fields={formFields}
      links={formLinks}
      onSubmit={onSubmit}
    />
  );
}
