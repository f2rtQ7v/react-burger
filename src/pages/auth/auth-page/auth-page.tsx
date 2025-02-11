import { useLocation, useNavigate, Link } from 'react-router-dom';
import Form from '../../../components/form/form.tsx';
import useFormData from '../../../hooks/use-form-data.ts';
import styles from './auth-page.module.css';

interface IAuthPageLink {
  text: string;
  linkText: string;
  to: string;
}

interface IAuthPageProps {
  action: string;
  redirect?: string;
  title: string;
  submitLabel: string;
  links: IAuthPageLink[];
  fields: IFormItem[];
}

export default function AuthPage({
  action,
  redirect,
  title,
  submitLabel,
  links,
  fields,
}: IAuthPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [ data, , onChange ] = useFormData();
  const onSubmit = () => {
    if (redirect && !location.state?.from) {
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
