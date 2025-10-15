import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // npm i react-router-dom
import { AdminDashboard } from './components/admin/AdminDashboard';
import { WizardSteps } from './components/cake-builder/WizardSteps';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';

export const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/constructor" element={<WizardSteps />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* Другие routes */}
    </Routes>
  </Router>
);
