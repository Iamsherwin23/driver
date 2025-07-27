// In App.js in a new project

import * as React from 'react';
import { Navigation } from './navigation/index.js';
import { AuthProvider } from './context/AuthContext.js';


export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}