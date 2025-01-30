import { useCallback } from 'react';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './form.module.css';

const inputs = {
  text: Input,
  email: EmailInput,
  password: PasswordInput,
};

function Form({
  fields,
  data,
  onChange,
  onSubmit,
  onReset,
  submitLabel,
  error,
}) {
  const onSubmitInner = useCallback(e => {
    e.preventDefault();
    onSubmit?.(data);
  }, [ onSubmit, data ]);

  const onResetInner = useCallback(() => {
    onReset?.();
  }, [ onReset ]);

  return (
    <form className={styles.container} onSubmit={onSubmitInner} onReset={onResetInner}>
      {fields.map(n => {
        const Component = /*inputs[n.type] ?? */inputs.text;
        return (
          <div key={n.name} className={styles.formItem}>
            <Component
              {...n}
              required
              value={data[n.name] || ''}
              onChange={onChange}
            />
          </div>
        );
      })}
      <div className={styles.buttons}>
        {onSubmit && (
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >{submitLabel || 'Отправить'}</Button>
        )}
        {onReset && (
          <Button
            htmlType="reset"
            type="secondary"
            size="medium"
          >Отмена</Button>
        )}
      </div>
      <div className={styles.error}>{error}</div>
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  submitLabel: PropTypes.string,
  error: PropTypes.string,
};

export default Form;
