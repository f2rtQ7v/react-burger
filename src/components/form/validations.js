const validateEmpty = val => !val && 'Заполните поле';

export const validations = {
  text: [ validateEmpty ],
  email: [
    validateEmpty,
    val => !/.@./.test(val) && 'Адрес электронной почты должен состоять из двух частей, разделённых символом "@"',
  ],
  password: [
    validateEmpty,
    val => {
      const min = 3;
      return val.length < min && `Пароль должен быть длиннее, минимальное количество символов - ${min}`;
    },
  ],
};

export function validate(type, value) {
  for (const n of validations[type] ?? []) {
    const result = n(value);
    if (result) {
      return result;
    }
  }

  return '';
}

export function validateAll(fields, values) {
  return Object.fromEntries(fields.map(n => [
    n.name,
    validate(n.type, values[n.name] || ''),
  ]));
}
