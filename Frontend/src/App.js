import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>International Payments Portal</h1>
      <div className="LoginForm">
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
