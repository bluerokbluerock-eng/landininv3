LANDININV3 — HTML, CSS Y JAVASCRIPT PUROS

Uso
La página conserva su diseño original y sus recursos locales. Para que el
formulario funcione, usa el servidor Node incluido: node --env-file=.env server.mjs
Requiere Node 24. No necesita dependencias ni compilación del frontend.
Abrir index.html directamente sirve para revisar el diseño, sin envío de datos.

Subir a Railway
1. Conecta el repositorio que contiene esta carpeta a un servicio de Railway.
2. Si el repositorio es landings, configura Root Directory como /landininv3
   y el archivo de configuración como /landininv3/railway.json.
3. Railway construye el Dockerfile; no agregues comandos de build o inicio.
4. En Variables configura GOOGLE_SHEETS_WEBAPP_URL y GOOGLE_SHEETS_TOKEN.
   Son los mismos valores privados para las seis landings.
5. Genera el dominio en Networking. El servidor escucha en PORT (8080 por defecto).
La integración necesita que el receptor Apps Script esté desplegado y autorizado
en la cuenta de Zaira. Preparar archivos no publica automáticamente en Railway.

Archivos
index.html / styles.css / script.js  Página original y sus interacciones.
leads-client.js                     Envío y reintentos sin duplicados.
server.mjs                         Archivos públicos y endpoint /api/leads.
landing.config.json                Identidad de esta landing en el servidor.
assets/                            Imágenes, fuentes y licencias.
Dockerfile / railway.json          Despliegue sin dependencias adicionales.
.env.example                       Variables de ejemplo, sin claves reales.
nginx.conf                         Configuración anterior; ya no se utiliza.

Formulario
Valida nombre, correo, WhatsApp, país y fecha de nacimiento. El servidor añade
landininv3 — TracePay Recovery como origen; no acepta una identidad elegida por el cliente.
La hoja recibe fecha y hora, landing, los cinco campos, página e ID de registro.
No se guardan datos personales en localStorage ni se publican claves privadas.
El ID se conserva en memoria si falla un envío y permite reintentar sin duplicar.
Solo muestra confirmación cuando Google Sheets devuelve el ID guardado. Si falta
configuración o falla Google, conserva el formulario y permite volver a intentarlo.
Nunca pongas el token en script.js, index.html o un repositorio. Para uso local,
copia .env.example a .env y completa las variables; .env está excluido de Git.

Diseño y comportamiento
Se conservan la marca TracePay Recovery, los textos, imágenes y testimonios
que aparecen en App.tsx. Los avisos y los datos del gráfico proceden del ZIP;
no están conectados a actividad real ni a una fuente de datos en vivo.
El contador empieza en siete minutos cada vez que se carga la página, como en
el código original. Ambas versiones, móvil y escritorio, están sincronizadas.
El botón del pie lleva al formulario. El gráfico incluye tooltips y acceso
mediante teclado. Los avisos se pueden cerrar con su botón.
No se añadieron el video, logo importado ni secciones definidas que el App.tsx
original no muestra. El ZIP no incluye un .fig o captura del lienzo independiente;
la referencia visual es la página generada por su código original.
Se mantuvo noindex, nofollow. Cámbialo cuando corresponda indexar públicamente.

Recursos
Fotografías originales: Unsplash. https://unsplash.com/license
Exo 2 y DM Mono: Google Fonts, SIL Open Font License.
Iconos SVG: Lucide, licencia ISC.
CSS compilado con Tailwind CSS, licencia MIT; no requiere Tailwind en ejecución.
Licencias redistribuidas en assets/licenses/.
