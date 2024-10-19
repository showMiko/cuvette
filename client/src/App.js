import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginForm';
import RegistrationForm from './pages/RegistrationForm';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
  }, []); 

  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <Navbar setToken={setToken} />
          <div className="flex flex-grow">
            {token && <Sidebar />} 
            <div className={`flex-grow ${token ? 'ml-10' : ''}`}> 
              <Routes>
                {token ? (
                  <>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Navigate to="/" />} />
                    <Route path="/register" element={<Navigate to="/" />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginForm setToken={setToken} />} />
                    <Route path="/register" element={<RegistrationForm setToken={setToken} />} />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
