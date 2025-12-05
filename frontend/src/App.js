import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import SetupScreen from './pages/SetupScreen';
import ReminderScreen from './pages/ReminderScreen';
import FamilyScreen from './pages/FamilyScreen';
import { Toaster } from './components/toaster';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/setup" element={<SetupScreen />} />
          <Route path="/reminder" element={<ReminderScreen />} />
          <Route path="/family" element={<FamilyScreen />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
