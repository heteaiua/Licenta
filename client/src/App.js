import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './auth/login/Login'
import './App.css';
import Home from './pages/home/Home';
function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
  );
}
export default App;
