LANDININV3 — HTML, CSS Y JAVASCRIPT PUROS

Uso
Abre index.html directamente o aloja esta carpeta en un servidor estático.
No necesita React, Astro, Node ni compilación del frontend.
Incluye la imagen de fondo, fotos de testimonios, Exo 2 y DM Mono localmente.

Subir a Railway
1. Conecta el repositorio que contenga esta carpeta a un servicio de Railway.
2. Si el repositorio es landings, configura Root Directory como /landininv3
   y la ruta del archivo de configuración como /landininv3/railway.json.
   Si esta carpeta es la raíz del repositorio, usa los valores predeterminados.
3. Railway construye el Dockerfile. No definas comandos de build o inicio
   adicionales. Nginx sirve los archivos en PORT (8080 por defecto).
4. Genera el dominio del servicio en Networking.
Referencia: https://docs.railway.com/config-as-code/reference
Esta entrega prepara la carpeta, sin publicar en una cuenta de Railway.
No se ejecutó Docker en este equipo porque no está instalado.

Archivos
index.html       Estructura, textos y contenido.
styles.css       Estilos estáticos y adaptación a pantallas.
script.js        Contador, formulario, gráfico SVG y avisos flotantes.
assets/          Fotografías, fuentes y licencias.
Dockerfile       Contenedor de Nginx.
nginx.conf       Servidor estático que escucha en PORT.
railway.json     Configuración de build y comprobación de disponibilidad en /.

Formulario
El original no incluye backend, CRM ni receptor de WhatsApp.
Se validan nombre, correo, WhatsApp, fecha de nacimiento y país.
Sin destino configurado, el formulario informa que los datos no se han enviado.
No guarda datos personales en el navegador.
Configura formEndpoint en LANDING_CONFIG, al principio de script.js, con un
endpoint POST que acepte JSON: name, email, phone, dob y country.
El servidor debe responder con un estado HTTP satisfactorio al recibirlos.
No incluyas claves privadas o credenciales en los archivos públicos.

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
