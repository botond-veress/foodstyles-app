import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router';

import { CenteredContent } from '@/components/App/CenteredContent';
import { Header } from '@/components/App/Header';

import { TodosPage } from '@/pages/TodosPage';

export const AuthorizedRoutes: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <React.Fragment>
          <Header className="hidden md:block" />

          <CenteredContent>
            <Outlet />
          </CenteredContent>
        </React.Fragment>
      }
    >
      <Route path="/todos" element={<TodosPage />} />
      <Route path="*" element={<Navigate to="/todos" replace />} />
    </Route>
  </Routes>
);
