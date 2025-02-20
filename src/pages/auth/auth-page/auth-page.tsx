import { useLocation, useNavigate, Link } from 'react-router-dom';
import Form from '../../../components/form/form.tsx';
import useFormData from '../../../hooks/use-form-data.ts';
import { TAuthFormAction } from '../../../services/auth/actions.ts';
import styles from './auth-page.module.css';

interface IAuthPageLink {
  text: string;
  linkText: string;
  to: string;
}

export interface IAuthPageProps {
  action: TAuthFormAction;
  redirect?: string;
  title: string;
  submitLabel?: string;
  links: IAuthPageLink[];
  fields: TFormItem[];
}

export default function AuthPage({
  redirect,
  title,
  links,
  ...props
}: IAuthPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, onChange, errors } = useFormData({ fields: props.fields });
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
        data={data}
        errors={errors}
        onChange={onChange}
        onSubmit={onSubmit}
        {...props}
      />
      {links.map(n => (
        <div key={n.to} className={styles.link}>
          {n.text} <Link to={n.to}>{n.linkText}</Link>
        </div>
      ))}
    </div>
  );
}
