import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

const AltaAdscrito = () => {
  const [form, setForm] = useState({ correo: '', password: '', estadoCivil: '', areaAdscripcion: '', fechaIngreso: '', rol: 'adscrito', fotografia: '', carta: null });
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = e => {
    setForm({ ...form, carta: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'carta' && value) {
        formData.append('carta', value);
      } else {
        formData.append(key, value);
      }
    });
    try {
      await emailjs.send(
        'TU_SERVICE_ID',
        'TU_TEMPLATE_ID',
        {
          ...form,
          carta: form.carta,
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
      <Typography variant="h5" mb={2}>Alta de Adscrito</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Correo" name="correo" value={form.correo} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Estado Civil" name="estadoCivil" value={form.estadoCivil} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Área de Adscripción" name="areaAdscripcion" value={form.areaAdscripcion} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Fecha de Ingreso" name="fechaIngreso" type="date" value={form.fechaIngreso} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>Carta de aceptación (PDF)
          <input type="file" accept=".pdf" hidden onChange={handleFile} />
        </Button>
        <Button type="submit" variant="outlined" sx={{ mt: 2 }}>Dar de alta</Button>
      </form>
      {enviado && <Alert severity="success" sx={{ mt: 2 }}>Adscrito dado de alta y notificado por correo.</Alert>}
    </Box>
  );
};

export default AltaAdscrito;
