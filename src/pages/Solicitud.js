import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

const Solicitud = ({ user }) => {
  const [motivo, setMotivo] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const templateParams = {
      correo: user?.correo,
      motivo,
    };
    try {
      await emailjs.send(
        'TU_SERVICE_ID',
        'TU_TEMPLATE_ID',
        templateParams,
        'TU_PUBLIC_KEY'
      );
      setEnviado(true);
    } catch {
      setEnviado(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2}>Solicitud de información</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Correo adscrito" value={user?.correo || ''} fullWidth margin="normal" disabled />
        <TextField label="Motivo de la solicitud" value={motivo} onChange={e => setMotivo(e.target.value)} fullWidth margin="normal" multiline rows={4} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Enviar solicitud</Button>
      </form>
      {enviado && <Alert severity="success" sx={{ mt: 2 }}>Solicitud enviada correctamente.</Alert>}
    </Box>
  );
};

export default Solicitud;
