import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import Snake from './pages/Snake';

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Snake />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  );
}