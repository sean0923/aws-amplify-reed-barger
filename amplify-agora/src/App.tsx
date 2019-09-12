import React from 'react';
import './App.css';

import SwitchAndRoutes from './layout/switch-and-routes.component';

import { AuthProvider } from './context/auth/auth.context';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SwitchAndRoutes />
    </AuthProvider>
  );
};
export default App;
