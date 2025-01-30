import { useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../services/auth/actions.js';
import { resetError } from '../../../services/auth/slice.js';
import useFormData from '../../../hooks/use-form-data.js';
import Form from '../form/form.jsx';
import { LoadingScreen } from '../../screens/';
import styles from './auth-form.module.css';

function AuthForm({
  action,
  title,
  submitLabel,
  links,
  fields,
  onSubmit,
}) {
  const dispatch = useDispatch();
  const { request, error } = useSelector(state => state.auth);
  const { data, onChange } = useFormData();
  const onSubmitInner = useCallback(data => {
    dispatch(actions[action](data))
      .unwrap()
      .then(onSubmit)
      .catch(() => {/*
        всё в порядке, ошибка поймана и записана в slice,
        а тут надо что-то делать (onSubmit) только в том случае, если ошибок не было
        пустой catch нужен для того, чтобы ошибка в консоль не падала
      */});
  }, [ dispatch, action, onSubmit ]);

  useEffect(() => {
    dispatch(resetError());
  }, [ dispatch ]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <Form
        fields={fields}
        data={data}
        onChange={onChange}
        onSubmit={onSubmitInner}
        submitLabel={submitLabel}
        error={error}
      />
      {links.map(n => (
        <div key={n.to} className={styles.link}>
          {n.text} <Link to={n.to}>{n.linkText}</Link>
        </div>
      ))}
      {request && <LoadingScreen />}
    </div>
  );
}

AuthForm.propTypes = {
  action: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func,
};

export default AuthForm;
