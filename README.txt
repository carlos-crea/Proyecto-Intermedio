Integrantes:
Fermoso Flores Omar 310113069
Fuentes Rojas Andrea 317243705
González Arceo Carlos Eduardo 318286488
Lázaro Pérez David Jonathan 316059710

Nota:
Para la parte de Back usamos json server como Base de Datos para evitar complicaciones de compatibilidad
y de uso de aplicaciones extras.

Para poder cargar los datos de la base de datos es necesario hacer la instalacion de varias dependencias.
Para ello se deben colocar lo siguientes comandos:

Nota extra: Estos comandos se deben colocar posicionados en la raíz de la carpeta del proyecto.

comando 1
npm install -g json-server

comando 2
npm install crypto-js

comando 3
npx json-server --watch db.json

Para este comando debe salir en consola lo siguiente:
\{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/productos
  http://localhost:3000/resenas
  http://localhost:3000/usuarios
  http://localhost:3000/carrito
  http://localhost:3000/cupones

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
--------------------------------------------------------------------------------------------------------
Observacion: Es necesario que los comandos se hagan en el orden que aparecen.

Recomendación: Se recomienda el uso de la extensión de VSCode Live Server, sin embargo no es necesaria.