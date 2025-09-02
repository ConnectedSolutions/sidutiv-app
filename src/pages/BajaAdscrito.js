import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Box, Typography, TextField, Button, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const BajaAdscrito = ({ user }) => {
  const [correo, setCorreo] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setConfirm(true);
  };

  const handleConfirm = async () => {
    setConfirm(false);
    try {
      await emailjs.send(
        'TU_SERVICE_ID',
        'TU_TEMPLATE_ID',
        { correo },
        'TU_PUBLIC_KEY'
      );
      setEnviado(true);
    } catch {
      setEnviado(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2}>Baja de Adscrito</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Correo del adscrito" value={correo} onChange={e => setCorreo(e.target.value)} fullWidth margin="normal" />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Solicitar baja</Button>
      </form>
      <Dialog open={confirm} onClose={() => setConfirm(false)}>
        <DialogTitle>Confirmar baja</DialogTitle>
        <DialogContent>¿Está seguro de dar de baja al adscrito?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm(false)}>Cancelar</Button>
          <Button onClick={handleConfirm} color="error">Confirmar</Button>
        </DialogActions>
      </Dialog>
      {enviado && <Alert severity="success" sx={{ mt: 2 }}>Baja notificada por correo.</Alert>}
    </Box>
  );
};

export default BajaAdscrito;
