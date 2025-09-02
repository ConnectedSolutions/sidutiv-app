import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Box, Typography, Button, TextField, MenuItem, Alert } from '@mui/material';

const tramitesList = [
  { value: 'lentes', label: 'Apoyo para lentes' },
  { value: 'utiles', label: 'Apoyo para útiles' },
  { value: 'juguetes', label: 'Apoyo para juguetes' }
];

const Tramites = ({ user }) => {
  const [tramite, setTramite] = useState('lentes');
  const nombre = user?.correo || '';
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleFile = e => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('correo', nombre);
    formData.append('tramite', tramite);
    if (archivo) formData.append('archivo', archivo);
    try {
      await emailjs.send(
        'TU_SERVICE_ID',
        'TU_TEMPLATE_ID',
        {
          correo: nombre,
          tramite,
          archivo,
        },
        'TU_PUBLIC_KEY'
      );
      setEnviado(true);
      setMensaje('Trámite enviado correctamente.');
    } catch {
      setEnviado(false);
      setMensaje('Error al enviar trámite.');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2}>Trámites</Typography>
      <form onSubmit={handleSubmit}>
        <TextField select label="Tipo de trámite" value={tramite} onChange={e => setTramite(e.target.value)} fullWidth margin="normal">
          {tramitesList.map(t => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
        </TextField>
        <TextField label="Correo adscrito" value={nombre} fullWidth margin="normal" disabled />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>Adjuntar archivo ZIP/RAR/PDF/JPG/PNG
          <input type="file" accept=".zip,.rar,.pdf,.jpg,.jpeg,.png" hidden onChange={handleFile} />
        </Button>
        <Button type="submit" variant="outlined" sx={{ mt: 2 }}>Enviar trámite</Button>
      </form>
      {enviado && <Alert severity="success" sx={{ mt: 2 }}>{mensaje}</Alert>}
    </Box>
  );
};

export default Tramites;
