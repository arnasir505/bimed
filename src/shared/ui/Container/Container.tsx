import React, { PropsWithChildren } from 'react';
import './style.css';

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className='container'>{children}</div>;
};
