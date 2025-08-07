import React from 'react';
import { RoomProvider } from './context/RoomContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <RoomProvider>
      <Dashboard />
    </RoomProvider>
  );
}

export default App;
