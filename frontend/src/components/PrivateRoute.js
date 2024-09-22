// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth';

const PrivateRoute = ({ children }) => {
    const currentUser = AuthService.getCurrentUser();
    return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;