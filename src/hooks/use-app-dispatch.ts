import { useDispatch } from 'react-redux';
import { AppDispatch } from '../services/store.ts';

export default useDispatch.withTypes<AppDispatch>();
