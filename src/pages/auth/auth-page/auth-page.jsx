import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from '../../../components/form/form.jsx';
import useFormData from '../../../hooks/use-form-data.js';
import styles from './auth-page.module.css';

function AuthPage({
  action,
  redirect,
  title,
  submitLabel,
  links,
  fields,
}) {
  const navigate = useNavigate();
  const [ data, , onChange ] = useFormData();
  const onSubmit = () => {
    if (redirect) {
      navigate(redirect, {
        replace: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <Form
        action={action}
        fields={fields}
        data={data}
        onChange={onChange}
        onSubmit={onSubmit}
        submitLabel={submitLabel}
      />
      {links.map(n => (
        <div key={n.to} className={styles.link}>
          {n.text} <Link to={n.to}>{n.linkText}</Link>
        </div>
      ))}
    </div>
  );
}

AuthPage.propTypes = {
  action: PropTypes.string.isRequired,
  redirect: PropTypes.string,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AuthPage;
