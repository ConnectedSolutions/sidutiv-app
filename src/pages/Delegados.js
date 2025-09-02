import React, { useState, useEffect } from 'react';
import { Box, Typography, MenuItem, TextField, Button, Alert } from '@mui/material';

const Delegados = () => {
  const [secciones, setSecciones] = useState([]);
  const [adscritos, setAdscritos] = useState([]);
  const [seccion, setSeccion] = useState('');
  const [delegado, setDelegado] = useState('');
  const [asignado, setAsignado] = useState(false);

  useEffect(() => {
    fetch('/json/DB_Secciones.json').then(res => res.json()).then(setSecciones);
    fetch('/json/DB_Adscritos.json').then(res => res.json()).then(setAdscritos);
  }, []);

  const handleAsignar = () => {
    if (seccion && delegado) {
      setAsignado(true);
      // Aquí se generaría el JSON actualizado para que el comité lo descargue
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2}>Designar Delegado</Typography>
      <TextField select label="Sección" value={seccion} onChange={e => setSeccion(e.target.value)} fullWidth margin="normal">
        {secciones.map(sec => <MenuItem key={sec} value={sec}>{sec}</MenuItem>)}
      </TextField>
      <TextField select label="Adscripto" value={delegado} onChange={e => setDelegado(e.target.value)} fullWidth margin="normal">
        {adscritos.filter(a => a.areaAdscripcion === seccion).map(a => <MenuItem key={a.correo} value={a.correo}>{a.correo}</MenuItem>)}
      </TextField>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleAsignar}>Asignar delegado</Button>
      {asignado && <Alert severity="info" sx={{ mt: 2 }}>Delegado asignado. Recuerde actualizar el archivo JSON manualmente.</Alert>}
    </Box>
  );
};

export default Delegados;
