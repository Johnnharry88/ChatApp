import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import IndexPage from './components/IndexPage';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './components/AuthContext';

function App() {
 const { authUser } = useAuthContext();
  return (
     <div className="App">
            <Routes>
              <Route path='/' element={<IndexPage />} />
              <Route path='/register' element={<Registration />} />
              <Route path='/login' element={authUser ? <Navigate to='/home' /> : <Login />} />
              <Route path='/home' element={<Home />} />
              <Route path="/profile" element={<Profile />} />
          </Routes>
     <Toaster />
    </div>
  );
}

export default App;
