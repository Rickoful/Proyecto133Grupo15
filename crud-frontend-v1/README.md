# PrestamoManager - Frontend

Este README contiene las instrucciones básicas para configurar, desarrollar y desplegar la parte frontend del proyecto junto con notas útiles para integrarlo con el backend Flask del mismo repositorio.

Contenido
- Requisitos
- Cómo ejecutar en desarrollo (Vite)
- Cómo generar el build (producción) y servirlo desde Flask
- Autenticación y llamadas al backend (JWT)
- Archivos que NO subir a Git

Requisitos
- Node.js (v16+ recomendado) y npm
- Python 3.8+ (para el backend en la raíz del repo)
- MySQL (xampp) base de datos llamada: proyectoprestamo

Instalación (frontend)
1. Ir a la carpeta del frontend:

```bash
cd crud-frontend-v1
```

2. Instalar dependencias:

```bash
npm install
```

Desarrollo (modo hot-reload con Vite)

1. Levanta el servidor de desarrollo de Vite:

```bash
npm run dev
```

2. Verifica que el backend esté corriendo. El frontend actual consume el backend con rutas directas como `/login`, `/usuarios`, `/equipos` y `/prestamos`, así que el flujo más estable es abrirlo servido por Flask desde `http://127.0.0.1:5000/`.

3. Abre: http://localhost:5173 (o la URL que indique Vite) y trabaja con hot-reload.

Nota sobre Vite

El `vite.config.js` incluye un proxy para `/api`, pero tu frontend actual no está usando ese prefijo. Si quieres trabajar solo con Vite en desarrollo, tendrás que ajustar el frontend o el proxy para que ambos usen el mismo esquema de rutas.

Generar build de producción

Para producir el bundle estático que Flask puede servir desde `dist`:

```bash
npm run build
```

Después de `npm run build` verás la carpeta `dist/` con `index.html` y los assets.

Servir el frontend desde Flask (producción)

1. Desde la raíz del proyecto (donde está `app.py`) ejecuta:

```bash
python app.py
```

2. Flask sirve por defecto los archivos en `crud-frontend-v1/dist` si existen; entra en `http://127.0.0.1:5000/`.

Sin usar `dist` (modo recomendado en desarrollo)

Si prefieres no usar `dist` en desarrollo, levanta Vite (`npm run dev`) y abre `http://localhost:5173`; en ese caso, asegúrate de que las rutas del frontend y el proxy apunten al mismo backend.

Autenticación y API

- El frontend realiza llamadas al backend para autenticación JWT a `/login` (POST).
- Credenciales por defecto en backend de ejemplo: `admin / 123` (consulta `app.py`).
- Después del login el frontend guarda `access_token` en `localStorage` y lo envía en `Authorization: Bearer <token>` en las siguientes peticiones.

Endpoints principales (resumen)
- `POST /login` — login (recibe JSON {username, password})
- `GET/POST/PUT/DELETE /usuarios` — CRUD de usuarios
- `GET/POST/PUT/DELETE /equipos` — CRUD de equipos
- `GET/POST/PUT/DELETE /prestamos` — CRUD de préstamos y endpoints auxiliares como `/prestamos/<id>/devolver` o `/prestamos/<id>/detalles`

Archivos y carpetas que NO subir a Git
- `node_modules/`
- `dist/` (si prefieres compilar en CI o en producción)
- Entornos virtuales de Python: `.venv/`, `venv/`
- Archivos de entorno: `.env`, `.env.local`, `crud-frontend-v1/.env`
- Archivos del editor: `.vscode/`, `.idea/`
- Archivos temporales y logs: `*.log`, `__pycache__/`, `*.pyc`

Instrucciones rápidas para limpiar el repo antes de subir

```bash
# crear o actualizar .gitignore en la raíz (ver recomendaciones en la raíz del repo)
git add .gitignore
# quitar del control archivos ya añadidos (no los borra del disco)
git rm -r --cached crud-frontend-v1/node_modules
git rm -r --cached crud-frontend-v1/dist
git rm -r --cached .venv
git commit -m "Ignore local build, node_modules y entornos"
git push origin main
```
