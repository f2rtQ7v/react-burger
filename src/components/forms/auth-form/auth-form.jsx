import { useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  redirect,
  title,
  submitLabel,
  links,
  fields,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, error } = useSelector(state => state.auth);
  const { data, onChange } = useFormData();
  const onSubmit = useCallback(data => {
    dispatch(actions[action](data))
      .unwrap()
      .then(() => {
        if (redirect) {
          navigate(redirect, {
            replace: true,
          });
        }
      })
      .catch(() => {/*
        всё в порядке, ошибка поймана и записана в slice;
        а тут надо что-то делать (редирект) только в том случае, если ошибок не было;
        пустой catch нужен для того, чтобы ошибка в консоль не падала
      */});
  }, [ dispatch, action, navigate, redirect ]);

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
        onSubmit={onSubmit}
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
  redirect: PropTypes.string,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AuthForm;
