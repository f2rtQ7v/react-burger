import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from '@services/store.ts';
import { formActions, TAuthFormAction } from '@services/features/auth/actions.ts';
import { getAuthState, resetError } from '@services/features/auth/slice.ts';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { LoadingScreen } from '@components/screens/screens.tsx';
import styles from './form.module.css';

interface IFormProps {
  action: TAuthFormAction;
  fields: TFormItem[];
  data: TFormData;
  errors: TFormData;
  onChange: (e: TInputEvent) => void;
  onSubmit?: (e: TFormEvent) => void;
  onReset?: (e: TFormEvent) => void;
  showButtons?: boolean;
  submitLabel?: string;
}

const inputs = {
  text: Input,
  password: PasswordInput,
};

type TInput = keyof typeof inputs;

export default function Form({
  action,
  fields,
  data,
  errors,
  onChange,
  onSubmit,
  onReset,
  showButtons = true,
  submitLabel = 'Отправить',
}: IFormProps) {
  const dispatch = useDispatch();

  const { [action]: { request, error: submitError } } = useSelector(getAuthState);

  const [ showErrors, setShowErrors ] = useState(false);

  const onSubmitInner = useCallback((e: TFormEvent) => {
    e.preventDefault();

    const isErrors = fields.some(n => errors[n.name]);
    setShowErrors(isErrors);
    if (isErrors) {
      return;
    }

    dispatch(formActions[action](data))
      .unwrap()
      .then(onSubmit)
      .catch(() => {/*
        всё в порядке, ошибка поймана и записана в slice;
        а тут надо что-то делать (onSubmit) только в том случае, если ошибок не было;
        пустой catch нужен для того, чтобы ошибка в консоль не падала
      */});
  }, [ dispatch, action, fields, data, errors, onSubmit ]);

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
          const Component = inputs[type as TInput] ?? inputs.text;
          const error = errors[n.name];
          return (
            <div key={n.name} className={styles.formItem}>
              <Component
                {...n}
                value={data[n.name] || ''}
                onChange={onChange}
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
