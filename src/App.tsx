import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ChartScreen from './Screens/ChartScreen';
import DemoChartScreen from './Screens/DemoChartScreen';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/chart" element={<ChartScreen />} />
        <Route path="/demo" element={<DemoChartScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
