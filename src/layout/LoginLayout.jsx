import React from 'react';
import { Route } from 'react-router-dom';

import './styles.css';

function LoginLayout({ component: Component, ...props }) {
  return (
    <Route {...props} component={Component} />
  );
}

export default LoginLayout;
