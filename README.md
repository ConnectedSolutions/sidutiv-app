
# Gestión de Personal Sindical

Aplicación React para la gestión de personal adscrito a un sindicato, lista para desplegar en GitHub Pages.

## Estructura
- **/public/json/**: Archivos JSON como base de datos (adscritos, secciones, roles).
- **/src/components/**: Componentes reutilizables.
- **/src/pages/**: Vistas principales por rol.
- **/src/App.js**: Navegación y lógica principal.

## Funcionalidades
- Login y navegación por roles (adscrito, delegado, comité).
- Edición y descarga de perfil como JSON.
- Formularios de trámites y solicitudes, envío por EmailJS/Formspree.
- Alta/baja de adscritos, notificaciones y designación de delegados (comité).
- Creación de secciones (solo frontend, comité actualiza manualmente el JSON).

## Despliegue en GitHub Pages
- Configura `homepage` en `package.json` y usa rutas relativas.

## Notas
- Los cambios en los archivos JSON solo se reflejan en la app; el comité/delegado debe actualizar manualmente los archivos en el repositorio.
- No se usa backend ni bases de datos externas.
- Los archivos adjuntos solo se envían por correo, no se almacenan.
