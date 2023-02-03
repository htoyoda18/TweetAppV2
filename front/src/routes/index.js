import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from '../pages/signup';
import { Login } from '../pages/login';
import { PasswordReset } from '../pages/password_reset';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/password_reset" element={<PasswordReset />}></Route>
    </Routes>
  )
}
