import { useState, useCallback } from 'react';
import { Link } from 'react-router';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './form.module.css';

function Form({ title, fields, submitTitle, onSubmit, links }) {
  const [ formData, setFormData ] = useState(() => {
    return Object.fromEntries(fields.map(n => [ n.name, '' ]));
  });
  
  const onChange = useCallback(({ target: t }) => {
    setFormData(fd => ({
      ...fd,
      [t.name]: t.value,
    }))
  }, [ setFormData ]);

  return (
    <div className={styles.container}>
      {title && <div className={styles.title}>{title}</div>}
      {fields.map(n => (
        <div key={n.name} className={styles.formItem}>
          <Input
            {...n}
            value={formData[n.name]}
            onChange={onChange}
          />
        </div>
      ))}
      {onSubmit && (
        <div className={styles.submit}>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => onSubmit(formData)}
          >{submitTitle || 'Отправить'}</Button>
        </div>
      )}
      {links?.length && links.map(n => (
        <div key={n.to} className={styles.text}>
          {n.text} <Link to={n.to}>{n.linkText}</Link>
        </div>
      ))}
    </div>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  submitTitle: PropTypes.string,
  onSubmit: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Form;
