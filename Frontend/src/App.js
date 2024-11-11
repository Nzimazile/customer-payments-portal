import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeDashboard from './components/EmployeeDashboard';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>International Payments Portal</h1>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
