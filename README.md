# Product Management App - Igloolab Technical Test

<img width="1338" height="564" alt="image" src="https://github.com/user-attachments/assets/11153cff-94cb-465a-a97c-a52136692ef4" />


Proyecto Full Stack desarrollado como parte de la prueba técnica para la posición de Developer Full Stack en igloolab. La aplicación permite gestionar una lista de productos a través de una interfaz limpia y una API RESTful robusta.

## 📄 Tabla de Contenidos

1.  [✨ Características](#caracteristicas)

2.  [🛠️ Pila Tecnológica](#pila-tecnologica)

3.  [🚀 Cómo Empezar (Proyecto ya Desplegado en Ambiente de Pre-Producción)](#cómo-empezar-proyecto-ya-desplegado-en-ambiente-de-pre-producción)

4.  [🚀 Cómo Empezar (Configuración Local)](#cómo-empezar-configuración-local)


## ✨ Características

- **Interfaz de Usuario Moderna**: Creada con React y TypeScript, y estilizada con Tailwind CSS.

- **Gestión de Productos**: Añade, visualiza y elimina productos de forma dinámica.

- **Backend** : API RESTful construida con Node.js, Express y TypeScript.

- **Base de Datos Relacional**: Persistencia de datos gestionada con PostgreSQL.

- **Validación de Datos**: Reglas de validación en el frontend y en el backend para garantizar la integridad de los datos.

- **Entorno Contenerizado**: Uso de Docker y Docker Compose para una configuración de desarrollo sencilla y consistente.

## 🛠️ Pila Tecnológica
- **Frontend**: React, TypeScript, Vite, Axios, Tailwind CSS

- **Backend**: Node.js, Express, TypeScript, TypeORM, class-validator

- **Base de Datos**: PostgreSQL

- **Entorno de Desarrollo**: Docker

## 🚀 Cómo Empezar (Proyecto ya Desplegado en Ambiente de Pre-Producción)

Puedes revisar el funcionamiento del proyecto en este punto, sin necesidad de configuraciones adicionales ni descargas

Despliegue del front-end en Netlify App

Despliegue del backend en Render usando entorno Docker

- Abrir el Proyecto dando click en: https://igloolab-frontend.netlify.app/


## 🚀 Cómo Empezar (Configuración Local)
Sigue estos pasos para ejecutar el proyecto en tu máquina local.

Prerrequisitos
Asegúrate de tener instalado el siguiente software:

- Node.js (v18 o superior)
- Git
- Docker Desktop: Es esencial para ejecutar la base de datos y el backend de forma aislada. Si no lo tienes, puedes descargarlo desde el sitio oficial de Docker, usando el link: https://www.docker.com/products/docker-desktop/ 

### Pasos para iniciar el proyecto completo (Backend, Frontend, Base de Datos)

- Crear una carpeta en tú computador
- Abrir la carpeta en tú editor de código
- Abrir una terminal
- Clona el repositorio:

git clone https://github.com/juan10024/igloolab-test.git

- cd igloolab-test

### Configura el Backend:

- En una terminal en tú editor de código
  
- Navega a la carpeta del backend:
```
cd backend
```
- Crea tu archivo de variables de entorno a partir del ejemplo:

#### En Windows (Command Prompt)
```
copy .env.example .env
```
#### En Windows (PowerShell)
```
cp .env.example .env
```
#### En macOS / Linux
```
cp .env.example .env
```

- Abre el archivo .env y copia los valores por defecto del archivo **.env_config** envíado al correo electrónico.
- Abrir Docker Desktop descargado previamente.
- Luego, en la terminal ejecutar
```
docker-compose up --build -d
```
Este comando construirá la imagen de Docker para el backend y levantará el contenedor de la base de datos.

- Por último
```
npm run dev
```



### Configura el Frontend:

Abre una nueva terminal.

Navega a la carpeta del frontend: 

- cd frontend

- Instala las dependencias:

```
npm install
```

- Ejecutar el cliente en local

```
npm run dev
```

### Configura la Base de Datos

-  Primero, instala alguna herramienta para la conexión remota a la base de datos, puede ser:
Extensión PostgreSQL para VSCode
- Ingresar el nombre de host (como localhost), el usuario, la contraseña, y el número de puerto, datos especificados en el archivo recibido por correo electrónico **database-client-config**

¡Listo, ya puedes acceder a la aplicación! 🥳

Abre tu navegador y visita http://localhost:5173.

¡Y eso es todo! Ahora deberías tener la aplicación completa ejecutándose localmente. El frontend en el puerto 5173 se comunicará con el backend que se ejecuta dentro de Docker en el puerto 3000.



