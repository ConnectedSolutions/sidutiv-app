import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const Login = ({ onLogin }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/json/DB_Adscritos.json');
      const adscritos = await res.json();
      const user = adscritos.find(u => u.correo === correo && u.password === password);
      if (user) {
        setError('');
        onLogin(user);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch {
      setError('Error al validar usuario');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" mb={2}>Iniciar sesión</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Correo" fullWidth margin="normal" value={correo} onChange={e => setCorreo(e.target.value)} />
        <TextField label="Contraseña" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Entrar</Button>
      </form>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default Login;
