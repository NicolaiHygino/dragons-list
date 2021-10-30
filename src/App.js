import React, { useState } from 'react';
import Login from 'views/Login';
import Dashboard from 'views/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  if (!user) return <Login setUser={setUser} />;
  return <Dashboard />;
};

export default App;
