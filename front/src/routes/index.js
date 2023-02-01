import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from '../pages/signup'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  )
}
