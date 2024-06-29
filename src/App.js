import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import SignupComponent from './components/SignupComponent';
import  './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/signup" element={<SignupComponent />} />
      </Routes>
    </Router>
  );
}

export default App;