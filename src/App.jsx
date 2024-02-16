import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import Snake from './pages/Snake';

export default function App() {

  return (
    <div className="App">
      <Routes basename='/snake'>
        <Route path='/' element={<Home />} />
        <Route path='/snake' element={<Snake />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  );
}