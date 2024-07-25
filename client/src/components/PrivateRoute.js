import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the token is in local storage

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
