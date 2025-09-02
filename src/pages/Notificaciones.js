import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Box, Typography, TextField, Button, MenuItem, Alert } from '@mui/material';

const Notificaciones = () => {
  const [destino, setDestino] = useState('todos');
  const [mensaje, setMensaje] = useState('');
  const [adjunto, setAdjunto] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const handleFile = e => {
    setAdjunto(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await emailjs.send(
        'TU_SERVICE_ID',
        'TU_TEMPLATE_ID',
        {
          destino,
          mensaje,
          adjunto,
        },
        'TU_PUBLIC_KEY'
      );
      setEnviado(true);
    } catch {
      setEnviado(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2}>Enviar Notificación</Typography>
      <form onSubmit={handleSubmit}>
        <TextField select label="Destino" value={destino} onChange={e => setDestino(e.target.value)} fullWidth margin="normal">
          <MenuItem value="todos">Todos</MenuItem>
          <MenuItem value="seccion">Por sección</MenuItem>
        </TextField>
        <TextField label="Mensaje" value={mensaje} onChange={e => setMensaje(e.target.value)} fullWidth margin="normal" multiline rows={4} />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>Adjuntar archivo
          <input type="file" hidden onChange={handleFile} />
        </Button>
        <Button type="submit" variant="outlined" sx={{ mt: 2 }}>Enviar notificación</Button>
      </form>
      {enviado && <Alert severity="success" sx={{ mt: 2 }}>Notificación enviada correctamente.</Alert>}
    </Box>
  );
};

export default Notificaciones;
