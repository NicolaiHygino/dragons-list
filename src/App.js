import React, { useState } from 'react';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  if (!user) return <Login setUser={setUser} />;
  return <Dashboard />;
};

export default App;
