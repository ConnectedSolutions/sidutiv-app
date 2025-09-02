import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = ({ role, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gestión Sindical
        </Typography>
        {role === 'adscrito' && (
          <>
            <Button color="inherit" href="/perfil">Perfil</Button>
            <Button color="inherit" href="/tramites">Trámites</Button>
            <Button color="inherit" href="/solicitud">Solicitud</Button>
          </>
        )}
        {role === 'delegado' && (
          <>
            <Button color="inherit" href="/perfil">Perfil</Button>
            <Button color="inherit" href="/seccion">Sección</Button>
          </>
        )}
        {role === 'comite' && (
          <>
            <Button color="inherit" href="/alta">Alta Adscritos</Button>
            <Button color="inherit" href="/baja">Baja Adscritos</Button>
            <Button color="inherit" href="/notificaciones">Notificaciones</Button>
            <Button color="inherit" href="/secciones">Secciones</Button>
            <Button color="inherit" href="/delegados">Delegados</Button>
          </>
        )}
        <Button color="inherit" onClick={onLogout}>Salir</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
