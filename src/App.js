import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Tramites from './pages/Tramites';
import Solicitud from './pages/Solicitud';
import AltaAdscrito from './pages/AltaAdscrito';
import BajaAdscrito from './pages/BajaAdscrito';
import Notificaciones from './pages/Notificaciones';
import Secciones from './pages/Secciones';
import Delegados from './pages/Delegados';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      {user && <Navbar role={user.rol} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={user ? <Navigate to={user.rol === 'comite' ? '/alta' : '/perfil'} /> : <Login onLogin={handleLogin} />} />
        {/* Rutas por rol, ejemplo: */}
  <Route path="/perfil" element={user ? <Perfil user={user} /> : <Navigate to="/" />} />
  <Route path="/tramites" element={user ? <Tramites user={user} /> : <Navigate to="/" />} />
  <Route path="/alta" element={user && user.rol === 'comite' ? <AltaAdscrito /> : <Navigate to="/" />} />
  <Route path="/baja" element={user && user.rol === 'comite' ? <BajaAdscrito /> : <Navigate to="/" />} />
  <Route path="/notificaciones" element={user && user.rol === 'comite' ? <Notificaciones /> : <Navigate to="/" />} />
  <Route path="/secciones" element={user && user.rol === 'comite' ? <Secciones /> : <Navigate to="/" />} />
  <Route path="/delegados" element={user && user.rol === 'comite' ? <Delegados /> : <Navigate to="/" />} />
    <Route path="/solicitud" element={user ? <Solicitud user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
