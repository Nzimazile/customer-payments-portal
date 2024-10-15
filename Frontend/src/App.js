import React from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="App">
      <h1>Customer International Payments Portal</h1>
      <RegisterForm />
      <LoginForm />
    </div>
  );
}

export default App;
