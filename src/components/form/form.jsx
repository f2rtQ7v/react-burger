import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import * as actions from '../../services/auth/actions.js';
import { resetError } from '../../services/auth/slice.js';
import { LoadingScreen } from '../screens/';
import styles from './form.module.css';

const inputs = {
  text: Input,
  email: EmailInput,
  password: PasswordInput,
};

function Form({
  action,
  fields,
  data,
  onChange,
  onSubmit,
  onReset,
  showButtons = true,
  submitLabel,
}) {
  const dispatch = useDispatch();
  const { request, error } = useSelector(state => state.auth[action]);

  const hideErrorMessage = useCallback(() => {
    dispatch(resetError(action));
  }, [ dispatch, action ]);

  const onSubmitInner = useCallback(e => {
    e.preventDefault();
    dispatch(actions[action](data))
      .unwrap()
      .then(onSubmit)
      .catch(() => {/*
        всё в порядке, ошибка поймана и записана в slice;
        а тут надо что-то делать (onSubmit) только в том случае, если ошибок не было;
        пустой catch нужен для того, чтобы ошибка в консоль не падала
      */});
  }, [ dispatch, action, data, onSubmit ]);

  const onResetInner = useCallback(() => {
    hideErrorMessage();
    onReset?.();
  }, [ dispatch, action, onReset ]);

  useEffect(hideErrorMessage, []);

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={onSubmitInner}
        onReset={onResetInner}
      >
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
        {showButtons && (
          <div className={styles.buttons}>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
            >{submitLabel}</Button>
            {onReset && (
              <Button
                htmlType="reset"
                type="secondary"
                size="medium"
              >Отмена</Button>
            )}
          </div>
        )}
      </form>
      {request && <LoadingScreen />}
      <div className={styles.error}>{error}</div>
    </div>
  );
}

Form.propTypes = {
  action: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  showButtons: PropTypes.bool,
};

export default Form;
