import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFormData from '../../hooks/use-form-data.ts';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import * as actions from '../../services/auth/actions.ts';
import { validate, validateAll } from './validations.ts';
import { resetError } from '../../services/auth/slice.ts';
import { LoadingScreen } from '../screens/';
import styles from './form.module.css';

interface IFormProps {
  action: string;
  fields: IFormItem[];
  data: IFormData;
  onChange?: (e: TInputEvent) => void;
  onSubmit?: (e: TFormEvent) => void;
  onReset?: (e: TFormEvent) => void;
  showButtons?: boolean;
  submitLabel: string;
}

const inputs: {
  [key: string]: typeof Input | typeof PasswordInput,
} = {
  text: Input,
  password: PasswordInput,
};

export default function Form({
  action,
  fields,
  data,
  onChange,
  onSubmit,
  onReset,
  showButtons = true,
  submitLabel,
}: IFormProps) {
  const dispatch = useDispatch();

  const { request, error: submitError } = useSelector(state => state.auth[action]);

  const [ showErrors, setShowErrors ] = useState(false);
  const [ inputErrors, setInputErrors, onChangeInputErrors ] = useFormData({
    initialData: () => validateAll(fields, data),
    valueGetter: ({ target: t }) => validate(t.dataset.type ?? '', t.value),
  });

  const onChangeInner = useCallback((e: TInputEvent) => {
    onChangeInputErrors(e);
    onChange?.(e);
  }, [ onChangeInputErrors, onChange ]);

  const onSubmitInner = useCallback((e: TFormEvent) => {
    e.preventDefault();

    const errors = validateAll(fields, data);
    const isErrors = fields.some(n => errors[n.name]);
    setInputErrors(errors);
    setShowErrors(isErrors);
    if (isErrors) {
      return;
    }

    dispatch(actions[action](data))
      .unwrap()
      .then(onSubmit)
      .catch(() => {/*
        всё в порядке, ошибка поймана и записана в slice;
        а тут надо что-то делать (onSubmit) только в том случае, если ошибок не было;
        пустой catch нужен для того, чтобы ошибка в консоль не падала
      */});
  }, [ dispatch, action, fields, data, setInputErrors, onSubmit ]);

  const hideSubmitError = useCallback(() => {
    dispatch(resetError(action));
  }, [ dispatch, action ]);

  const onResetInner = useCallback((e: TFormEvent) => {
    setShowErrors(false);
    hideSubmitError();
    onReset?.(e);
  }, [ onReset, hideSubmitError ]);

  useEffect(hideSubmitError, [ hideSubmitError ]);

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={onSubmitInner}
        onReset={onResetInner}
        noValidate
      >
        {fields.map(({ type, ...n }) => {
          const Component = inputs[type] ?? inputs.text;
          const error = inputErrors[n.name];
          return (
            <div key={n.name} className={styles.formItem}>
              <Component
                {...n}
                data-type={type}
                value={data[n.name] || ''}
                onChange={onChangeInner}
                error={showErrors && !!error}
                errorText={showErrors ? error : ''}
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
      <div className={styles.error}>{submitError}</div>
    </div>
  );
}
