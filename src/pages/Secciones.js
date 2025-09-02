import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Alert, List, ListItem } from '@mui/material';

const Secciones = () => {
  const [secciones, setSecciones] = useState([]);
  const [nueva, setNueva] = useState('');
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    fetch('/json/DB_Secciones.json')
      .then(res => res.json())
      .then(setSecciones);
  }, []);

  const handleAgregar = () => {
    if (nueva && !secciones.includes(nueva)) {
      setSecciones([...secciones, nueva]);
      setAgregado(true);
      setNueva('');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2}>Secciones</Typography>
      <List>
        {secciones.map(sec => <ListItem key={sec}>{sec}</ListItem>)}
      </List>
      <TextField label="Nueva sección" value={nueva} onChange={e => setNueva(e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleAgregar}>Agregar sección</Button>
      {agregado && <Alert severity="info" sx={{ mt: 2 }}>Sección agregada. Recuerde actualizar el archivo JSON manualmente.</Alert>}
    </Box>
  );
};

export default Secciones;
