# 📅 Sistema de Reservas & Turnero Full Stack

> Aplicación web Full Stack desarrollada como proyecto académico y de portfolio profesional para la gestión de servicios y turnos en línea, con validación de disponibilidad en tiempo real.

---

## 🚀 Tecnologías Utilizadas

### Backend
* **Node.js** & **Express.js** (API REST con ES Modules)
* **Sequelize ORM** (Modelos, relaciones y manejo de migraciones)
* **PostgreSQL** (Base de datos relacional)
* **CORS** & **Dotenv**

### Frontend
* **React** con **Vite** (Desarrollo ultrarrápido y componentes modulares)
* **Bootstrap** / **React-Bootstrap** (Diseño responsive y componentes de interfaz)
* **Axios** (Cliente HTTP para la comunicación con la API)

### Despliegue & DevOps
* **Backend:** Render (Web Service Node.js)
* **Base de Datos:** PostgreSQL en la nube (Render)
* **Frontend:** Vercel

---

## ✨ Características Principales

* **Gestión de Servicios:** Creación, listado y administración de servicios ofrecidos (con duración en minutos y precios).
* **Sistema de Turnos:** Formulario interactivo para que los clientes reserven turnos seleccionando servicio, fecha y hora.
* **Validación de Disponibilidad:** Restricción a nivel de base de datos e índices únicos (`UNIQUE constraint`) para evitar la superposición de turnos en el mismo horario.
* **Manejo de Errores y Feedback:** Alertas visuales dinámicas en el frontend para notificar éxitos o conflictos de horarios en tiempo real.
* **Interfaz Responsive:** Diseño limpio adaptado para dispositivos móviles y de escritorio gracias a Bootstrap.

---

## 🛠️ Estructura de la Base de Datos (Sequelize Models)

* **Service:** `id`, `name`, `duration_minutes`, `price`, `timestamps`
* **Appointment:** `id`, `client_name`, `client_email`, `service_id` (FK), `date`, `time_slot`, `status`, `timestamps`
  * *Relación:* Un Servicio tiene muchos Turnos (`1:N`).

---

## 📦 Instalación y Ejecución Local

Si deseas clonar y probar este proyecto en tu máquina local, sigue estos pasos:

### 1. Clonar los repositorios
```bash
git clone https://github.com/cristiangc92/turnero-api.git
git clone https://github.com/cristiangc92/turnero-client.git
```

### 2. Configurar el Backend
```bash
cd turnero-api
npm install
```
Crea un archivo `.env` en la raíz del backend con las siguientes variables:
```env
PORT=3001
DATABASE_URL=postgresql://usuario:password@localhost:5432/turnero_db
```
Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

### 3. Configurar el Frontend
```bash
cd ../turnero-client
npm install
```
Crea un archivo `.env` en la raíz del frontend:
```env
VITE_API_URL=http://localhost:3001/api
```
Inicia la aplicación de React:
```bash
npm run dev
```

---

## 🌐 Enlaces de Producción
* **Frontend (Vercel):** [Ver Aplicación en Vercel](https://turnero-client.vercel.app/)
* **Backend API (Render):** [Ver Estado de la API](https://turnero-api-kjj0.onrender.com/)

---

## 👤 Autor
* **Cristian Gabriel Cacciolatti.** — *Desarrollador Web Full Stack* — [GitHub](https://github.com/cristiangc92)