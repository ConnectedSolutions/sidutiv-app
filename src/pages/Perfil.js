import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Avatar } from '@mui/material';

const Perfil = ({ user }) => {
  const [perfil, setPerfil] = useState(user);
  const [secciones, setSecciones] = useState([]);
  const [foto, setFoto] = useState(user.fotografia || '');

  useEffect(() => {
    fetch('/json/DB_Secciones.json')
      .then(res => res.json())
      .then(setSecciones);
  }, []);

  const handleChange = e => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleFoto = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDescargar = () => {
    const perfilDescarga = { ...perfil, fotografia: foto };
    const blob = new Blob([JSON.stringify(perfilDescarga, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'perfil.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2}>Mi Perfil</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar src={foto} sx={{ width: 64, height: 64, mr: 2 }} />
        <Button variant="contained" component="label">Fotografía
          <input type="file" accept="image/*" hidden onChange={handleFoto} />
        </Button>
      </Box>
      <TextField label="Correo" name="correo" value={perfil.correo} fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Estado Civil" name="estadoCivil" value={perfil.estadoCivil} fullWidth margin="normal" onChange={handleChange} />
      <TextField select label="Área de Adscripción" name="areaAdscripcion" value={perfil.areaAdscripcion} fullWidth margin="normal" onChange={handleChange}>
        {secciones.map(sec => <MenuItem key={sec} value={sec}>{sec}</MenuItem>)}
      </TextField>
      <TextField label="Fecha de Ingreso" name="fechaIngreso" type="date" value={perfil.fechaIngreso} fullWidth margin="normal" onChange={handleChange} InputLabelProps={{ shrink: true }} />
      <Button variant="outlined" sx={{ mt: 2 }} onClick={handleDescargar}>Descargar perfil JSON</Button>
    </Box>
  );
};

export default Perfil;
