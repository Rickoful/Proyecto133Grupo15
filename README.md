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

Instalacion (backend)
1. Crear el entorno virtual
```bash
python -m venv .venv
```
2. Activar el entorno virtual
```bash
.\.venv\Scripts\Activate
```
3. Instalar los requerimientos de FLASK
```bash
 pip install -r requirements.txt
```

Instalación (frontend)
1. Ir a la carpeta del frontend:

```bash
cd crud-frontend-v1
```

2. Instalar dependencias:

```bash
npm install
```

Desarrollo (modo desarrollador con Vite)

1. Levanta el servidor de desarrollo de Vite:

```bash
npm run build
```
2. Volver a la raiz.

```bash
cd ..
```

Servir el frontend desde Flask (producción)

1. Desde la raíz del proyecto (donde está `app.py`) y ejecuta:

```bash
python app.py
```
2. Deberia correr tanto el backend como el frontend

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

## Ejercicios resueltos

Adjunto aquí la documentación de los ejercicios implementados en el backend (`app.py`): endpoints, tablas implicadas y ejemplos mínimos.

1) Registrar información relacionada con equipos disponibles
- Tabla: `equipo` (campos: `id_equipo`, `nombre`, `descripcion`, `marca`, `modelo`, `codigo_inventario`, `estado`).
- Endpoints:
	- `GET /equipos` — listar todos los equipos.
	- `GET /equipos/disponibles` — listar equipos con `estado = 'disponible'`.
	- `GET /equipos/<id>` — obtener equipo por id.
	- `POST /equipos` — crear un nuevo equipo.
	- `PUT /equipos/<id>` — actualizar equipo.
	- `DELETE /equipos/<id>` — eliminar equipo.

2) Gestionar solicitudes de préstamo
- Tablas: `prestamo` (cabecera), `detalleprestamo` (items del préstamo).
- Endpoints:
	- `POST /prestamos` — crear solicitud de préstamo.
	- `POST /prestamos/<id_prestamo>/detalles` — agregar equipo al préstamo (marca el equipo como `prestado`).
	- `GET /prestamos` — listar préstamos.
	- `GET /prestamos/activos` — listar préstamos activos.
	- `GET /prestamos/<id>` — obtener préstamo por id.

3) Controlar devoluciones y disponibilidad
- Endpoints y comportamiento:
	- `PUT /prestamos/<id>/devolver` — registrar devolución; cambia `prestamo.estado` a `devuelto` y guarda `fecha_devolucion_real`.
	- `DELETE /prestamos/detalles/<id_detalle>` — remueve equipo del préstamo; si no está en otros préstamos activos, actualiza `equipo.estado = 'disponible'`.

4) Consultar el historial de préstamos realizados
- Endpoints:
	- `GET /prestamos/usuario/<id_usuario>` — historial de préstamos de un usuario.
	- `GET /prestamos/<id>` — obtener préstamo específico.
	- `GET /prestamos/<id_prestamo>/detalles` — ver equipos del préstamo.

5) Obtener reportes o consultas personalizadas sobre préstamos
- Endpoints:
	- `GET /reportes/prestamos_por_usuario` — total de préstamos por usuario.
	- `GET /reportes/equipos_mas_prestados` — equipos ordenados por veces prestados.

Notas rápidas:
- Muchas rutas están protegidas con JWT (`@jwt_required()`); primero hacer `POST /login` y enviar `Authorization: Bearer <token>`.
- Tablas principales: `usuario`, `equipo`, `prestamo`, `detalleprestamo`.
- Ejemplos básicos de uso se pueden encontrar en la documentación del proyecto o solicitar que los agregue en cURL/Postman.

---
