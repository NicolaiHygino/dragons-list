import React, { useState } from 'react';
import Login from 'components/Login';

const App = () => {
  const [user, setUser] = useState(null);

  if (!user) return <Login setUser={setUser} />;
  return <h1>Dashboard</h1>;
};

export default App;
