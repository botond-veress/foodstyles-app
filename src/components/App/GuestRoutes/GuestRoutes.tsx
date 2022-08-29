import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router';

import { CenteredContent } from '@/components/App/CenteredContent';

import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';

export const GuestRoutes: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <CenteredContent>
          <Outlet />
        </CenteredContent>
      }
    >
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Route>
  </Routes>
);
