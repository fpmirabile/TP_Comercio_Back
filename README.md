# TP_Comercio_Back
Aplicaciones Interactivas TP (REACT + NODEJS)

# Informacion basica del proyecto

Creado con [express](https://expressjs.com/es/) y [typescript](https://www.typescriptlang.org/).

## Instalacion y ejecucion en dev environment

Este bloque unicamente funciona con docker desktop (Para facilitar la exportabilidad a los diferentes SO).
Siga los siguientes pasos para poder utilizarlo:

1. Instalar [Docker Desktop](https://www.docker.com/products/docker-desktop).
    Importante: Si se encuentra en Windows, va a tener que instalar tambien [WSL2 For Docker](https://docs.docker.com/docker-for-windows/wsl/)

2. Una vez instalado docker, descargar el proyecto con un simple `git clone`

3. Terminado esto, ejecutar el npm i dentro de la carpeta del proyecto, para que descargue el `node_modules`

4. Ejecutar `docker-compose build` y deberia descargar y crear una imagen de docker dentro de nuestro docker-desktop para luego utilizarla.

5. Para finalizar, simplemente correr el comando `docker-compose up` (De ser necesaria la consola pueden agregar un `-d` al final para que la deje libre).
    Importante: En caso de tener error se puede utilizar un `docker-compose logs app` para saber lo ocurrido.
    Importante 2: No es necesario hacer un build cada vez que se edita codigo, este paquete contiene un watcher de archivos que recargan automaticamente.

## Comandos

Dentro de este directorio se puede ejecutar:

### `npm start`

Ejecuta el backend desde un archivo js (index.js) (No recomendado usar por fuera del docker).

### `npm run build`

Crea el bundle de nodejs, se puede facilmente exportar a un servidor.
Importante: Recordar agregar las variables de entorno que se encuentran en el archivo `docker-compose.yml`

### `npm run dev`

Ejecuta la aplicacion con nodemon para facilitar el desarrollo.

### `npm run prettier:write`

Es un script que ejecuta prettier sobre todos los archivos ts, tsx, scss y los modifica en base a las reglas de linting.