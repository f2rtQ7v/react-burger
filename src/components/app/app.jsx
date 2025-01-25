import { Routes, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header.jsx';
import Constructor from '../../pages/constructor/constructor.jsx';
import Page404 from '../../pages/404/404.jsx';
import styles from './app.module.css';

export default function App() {
  return (
    <div className={styles.container}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Constructor />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
