import { useState, useCallback } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

export const text = Input;
export const email = Input;
export const password = function Password(props) {
  const [ showValue, setShowValue ] = useState(false);
  const toggleShowValue = useCallback(() => {
    setShowValue(show => !show);
  }, [ setShowValue ]);

  return (
    <Input
      {...props}
      type={showValue ? 'text' : 'password'}
      icon={showValue ? 'HideIcon' : 'ShowIcon'}
      onIconClick={toggleShowValue}
    />
  );
};
