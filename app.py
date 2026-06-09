from flask import Flask, jsonify, render_template, request
from flask_mysqldb import MySQL
from flask_jwt_extended import JWTManager,create_access_token,jwt_required

app = Flask(__name__)
mysql = MySQL(app)
app.config['JWT_SECRET_KEY']='123'
jwt=JWTManager(app)

app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = ""
app.config['MYSQL_DB'] = "proyectoprestamo"
app.config['MYSQL_PORT'] = 3307


@app.route('/testdb')
def test():
    cursor = mysql.connection.cursor()
    sql = "SELECT 1"
    cursor.execute(sql)
    return "conexion existosa!!!"

#INICIO
@app.route('/')
def inicio(): 
    return render_template('index.html');

# GET - Listar todos los usuarios
@app.route('/usuarios', methods=['GET'])
#@jwt_required()
def listar_usuarios():
    cursor = mysql.connection.cursor()
    sql = """SELECT id_usuario, nombre, apellido, ci, tipo_usuario, 
             telefono, correo FROM usuario ORDER BY id_usuario"""
    cursor.execute(sql)
    datos = cursor.fetchall()
    cursor.close()
    
    usuarios = []
    for fila in datos:
        usuarios.append({
            "id_usuario": fila[0],
            "nombre": fila[1],
            "apellido": fila[2],
            "ci": fila[3],
            "tipo_usuario": fila[4],
            "telefono": fila[5],
            "correo": fila[6]
            }
        )
        cursor.close();
    return jsonify(usuarios)

# GET - Obtener usuario por ID
@app.route('/usuarios/<int:id>', methods=['GET'])
#@jwt_required()
def obtener_usuario(id):
    cursor = mysql.connection.cursor()
    sql = """SELECT id_usuario, nombre, apellido, ci, tipo_usuario, 
             telefono, correo FROM usuario WHERE id_usuario = %s"""
    cursor.execute(sql, (id,))
    datos = cursor.fetchone()
    cursor.close()
    
    if not datos:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    return jsonify({
        "id_usuario": datos[0],
        "nombre": datos[1],
        "apellido": datos[2],
        "ci": datos[3],
        "tipo_usuario": datos[4],
        "telefono": datos[5],
        "correo": datos[6]
    }), 200

# GET - Listar todos los equipos
@app.route('/equipos', methods=['GET'])
#@jwt_required()
def listar_equipos():
    cursor = mysql.connection.cursor()
    sql = """SELECT id_equipo, nombre, descripcion, marca, modelo, 
             codigo_inventario, estado FROM equipo ORDER BY id_equipo"""
    cursor.execute(sql)
    datos = cursor.fetchall()
    cursor.close()
    
    equipos = []
    for fila in datos:
        equipos.append({
            "id_equipo": fila[0],
            "nombre": fila[1],
            "descripcion": fila[2],
            "marca": fila[3],
            "modelo": fila[4],
            "codigo_inventario": fila[5],
            "estado": fila[6]
        })
    
    return jsonify(equipos), 200

# GET - Equipos disponibles
@app.route('/equipos/disponibles', methods=['GET'])
#@jwt_required()
def equipos_disponibles():
    cursor = mysql.connection.cursor()
    sql = """SELECT id_equipo, nombre, descripcion, marca, modelo, 
             codigo_inventario, estado 
             FROM equipo 
             WHERE estado = 'disponible'
             ORDER BY nombre"""
    cursor.execute(sql)
    datos = cursor.fetchall()
    cursor.close()
    
    equipos = []
    for fila in datos:
        equipos.append({
            "id_equipo": fila[0],
            "nombre": fila[1],
            "descripcion": fila[2],
            "marca": fila[3],
            "modelo": fila[4],
            "codigo_inventario": fila[5],
            "estado": fila[6]
        })
    
    return jsonify(equipos), 200

# GET - Obtener equipo por ID
@app.route('/equipos/<int:id>', methods=['GET'])
#@jwt_required()
def obtener_equipo(id):
    cursor = mysql.connection.cursor()
    sql = """SELECT id_equipo, nombre, descripcion, marca, modelo, 
             codigo_inventario, estado FROM equipo WHERE id_equipo = %s"""
    cursor.execute(sql, (id,))
    datos = cursor.fetchone()
    cursor.close()
    
    if not datos:
        return jsonify({"mensaje": "Equipo no encontrado"}), 404
    
    return jsonify({
        "id_equipo": datos[0],
        "nombre": datos[1],
        "descripcion": datos[2],
        "marca": datos[3],
        "modelo": datos[4],
        "codigo_inventario": datos[5],
        "estado": datos[6]
    }), 200

# GET - Listar todos los préstamos
@app.route('/prestamos', methods=['GET'])
#@jwt_required()
def listar_prestamos():
    cursor = mysql.connection.cursor()
    sql = """SELECT p.id_prestamo, p.id_usuario, u.nombre, u.apellido,
             p.fecha_prestamo, p.fecha_devolucion_programada, 
             p.fecha_devolucion_real, p.estado
             FROM prestamo p
             LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
             ORDER BY p.id_prestamo DESC"""
    cursor.execute(sql)
    datos = cursor.fetchall()
    cursor.close()
    
    prestamos = []
    for fila in datos:
        prestamos.append({
            "id_prestamo": fila[0],
            "id_usuario": fila[1],
            "nombre_usuario": fila[2],
            "apellido_usuario": fila[3],
            "fecha_prestamo": str(fila[4]) if fila[4] else None,
            "fecha_devolucion_programada": str(fila[5]) if fila[5] else None,
            "fecha_devolucion_real": str(fila[6]) if fila[6] else None,
            "estado": fila[7]
        })
    
    return jsonify(prestamos), 200

# GET - Préstamos activos
@app.route('/prestamos/activos', methods=['GET'])
#@jwt_required()
def prestamos_activos():
    cursor = mysql.connection.cursor()
    sql = """SELECT p.id_prestamo, p.id_usuario, u.nombre, u.apellido,
             p.fecha_prestamo, p.fecha_devolucion_programada, 
             p.fecha_devolucion_real, p.estado
             FROM prestamo p
             LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
             WHERE p.estado = 'activo'
             ORDER BY p.fecha_prestamo DESC"""
    cursor.execute(sql)
    datos = cursor.fetchall()
    cursor.close()
    
    prestamos = []
    for fila in datos:
        prestamos.append({
            "id_prestamo": fila[0],
            "id_usuario": fila[1],
            "nombre_usuario": fila[2],
            "apellido_usuario": fila[3],
            "fecha_prestamo": str(fila[4]) if fila[4] else None,
            "fecha_devolucion_programada": str(fila[5]) if fila[5] else None,
            "fecha_devolucion_real": str(fila[6]) if fila[6] else None,
            "estado": fila[7]
        })
    
    return jsonify(prestamos), 200


# GET - Historial de préstamos por usuario
@app.route('/prestamos/usuario/<int:id_usuario>', methods=['GET'])
#@jwt_required()
def historial_prestamos_usuario(id_usuario):
    cursor = mysql.connection.cursor()
    sql = """SELECT p.id_prestamo, p.id_usuario, u.nombre, u.apellido,
             p.fecha_prestamo, p.fecha_devolucion_programada, 
             p.fecha_devolucion_real, p.estado
             FROM prestamo p
             LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
             WHERE p.id_usuario = %s
             ORDER BY p.fecha_prestamo DESC"""
    cursor.execute(sql, (id_usuario,))
    datos = cursor.fetchall()
    cursor.close()
    
    prestamos = []
    for fila in datos:
        prestamos.append({
            "id_prestamo": fila[0],
            "id_usuario": fila[1],
            "nombre_usuario": fila[2],
            "apellido_usuario": fila[3],
            "fecha_prestamo": str(fila[4]) if fila[4] else None,
            "fecha_devolucion_programada": str(fila[5]) if fila[5] else None,
            "fecha_devolucion_real": str(fila[6]) if fila[6] else None,
            "estado": fila[7]
        })
    
    return jsonify(prestamos), 200

# GET - Obtener préstamo por ID
@app.route('/prestamos/<int:id>', methods=['GET'])
#@jwt_required()
def obtener_prestamo(id):
    cursor = mysql.connection.cursor()
    sql = """SELECT p.id_prestamo, p.id_usuario, u.nombre, u.apellido,
             p.fecha_prestamo, p.fecha_devolucion_programada, 
             p.fecha_devolucion_real, p.estado
             FROM prestamo p
             LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
             WHERE p.id_prestamo = %s"""
    cursor.execute(sql, (id,))
    datos = cursor.fetchone()
    cursor.close()
    
    if not datos:
        return jsonify({"mensaje": "Préstamo no encontrado"}), 404
    
    return jsonify({
        "id_prestamo": datos[0],
        "id_usuario": datos[1],
        "nombre_usuario": datos[2],
        "apellido_usuario": datos[3],
        "fecha_prestamo": str(datos[4]) if datos[4] else None,
        "fecha_devolucion_programada": str(datos[5]) if datos[5] else None,
        "fecha_devolucion_real": str(datos[6]) if datos[6] else None,
        "estado": datos[7]
    }), 200

# GET - Obtener detalles de un préstamo
@app.route('/prestamos/<int:id_prestamo>/detalles', methods=['GET'])
#@jwt_required()
def obtener_detalle_prestamo(id_prestamo):
    cursor = mysql.connection.cursor()
    sql = """SELECT dp.id_detalle, dp.id_prestamo, dp.id_equipo, 
             e.nombre as nombre_equipo, e.marca, e.modelo
             FROM detalleprestamo dp
             LEFT JOIN equipo e ON dp.id_equipo = e.id_equipo
             WHERE dp.id_prestamo = %s"""
    cursor.execute(sql, (id_prestamo,))
    datos = cursor.fetchall()
    cursor.close()
    
    detalles = []
    for fila in datos:
        detalles.append({
            "id_detalle": fila[0],
            "id_prestamo": fila[1],
            "id_equipo": fila[2],
            "nombre_equipo": fila[3],
            "marca": fila[4],
            "modelo": fila[5]
        })
    
    return jsonify(detalles), 200

# GET - Cantidad de préstamos por usuario
@app.route('/reportes/prestamos_por_usuario', methods=['GET'])
#@jwt_required()
def reportes_prestamos_por_usuario():
    cursor = mysql.connection.cursor()
    sql = """SELECT u.id_usuario, u.nombre, u.apellido, 
             COUNT(p.id_prestamo) as total_prestamos
             FROM usuario u
             LEFT JOIN prestamo p ON u.id_usuario = p.id_usuario
             GROUP BY u.id_usuario, u.nombre, u.apellido
             ORDER BY total_prestamos DESC"""
    cursor.execute(sql)
    datos = cursor.fetchall()
    cursor.close()
    
    resultado = []
    for fila in datos:
        resultado.append({
            "id_usuario": fila[0],
            "nombre": fila[1],
            "apellido": fila[2],
            "total_prestamos": fila[3]
        })
    
    return jsonify(resultado), 200

# GET - Equipos más prestados
@app.route('/reportes/equipos_mas_prestados', methods=['GET'])
#@jwt_required()
def reportes_equipos_mas_prestados():
    cursor = mysql.connection.cursor()
    sql = """SELECT e.id_equipo, e.nombre, e.marca, e.modelo,
             COUNT(dp.id_detalle) as veces_prestado
             FROM equipo e
             LEFT JOIN detalleprestamo dp ON e.id_equipo = dp.id_equipo
             GROUP BY e.id_equipo, e.nombre, e.marca, e.modelo
             ORDER BY veces_prestado DESC"""
    cursor.execute(sql)
    datos = cursor.fetchall()
    cursor.close()
    
    resultado = []
    for fila in datos:
        resultado.append({
            "id_equipo": fila[0],
            "nombre": fila[1],
            "marca": fila[2],
            "modelo": fila[3],
            "veces_prestado": fila[4]
        })
    
    return jsonify(resultado), 200


#---------------------------POSTS----------------------------------------


# POST - Crear usuario
@app.route('/usuarios', methods=['POST'])
#@jwt_required()
def crear_usuario():
    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    ci = data.get('ci')
    tipo_usuario = data.get('tipo_usuario')
    telefono = data.get('telefono')
    correo = data.get('correo')
    
    cursor = mysql.connection.cursor()
    sql = """INSERT INTO usuario (nombre, apellido, ci, tipo_usuario, telefono, correo)
             VALUES (%s, %s, %s, %s, %s, %s)"""
    cursor.execute(sql, (nombre, apellido, ci, tipo_usuario, telefono, correo))
    mysql.connection.commit()
    nuevo_id = cursor.lastrowid
    cursor.close()
    
    return jsonify({
        "mensaje": "Usuario creado exitosamente",
        "id_usuario": nuevo_id
    }), 201

# POST - Crear equipo
@app.route('/equipos', methods=['POST'])
#@jwt_required()
def crear_equipo():
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    marca = data.get('marca')
    modelo = data.get('modelo')
    codigo_inventario = data.get('codigo_inventario')
    estado = data.get('estado', 'disponible')
    
    cursor = mysql.connection.cursor()
    sql = """INSERT INTO equipo (nombre, descripcion, marca, modelo, 
             codigo_inventario, estado)
             VALUES (%s, %s, %s, %s, %s, %s)"""
    cursor.execute(sql, (nombre, descripcion, marca, modelo, codigo_inventario, estado))
    mysql.connection.commit()
    nuevo_id = cursor.lastrowid
    cursor.close()
    
    return jsonify({
        "mensaje": "Equipo creado exitosamente",
        "id_equipo": nuevo_id
    }), 201

# POST - Crear préstamo (solicitud)
@app.route('/prestamos', methods=['POST'])
#@jwt_required()
def crear_prestamo():
    data = request.get_json()
    id_usuario = data.get('id_usuario')
    fecha_prestamo = data.get('fecha_prestamo', datetime.now().strftime('%Y-%m-%d'))
    fecha_devolucion_programada = data.get('fecha_devolucion_programada')
    estado = data.get('estado', 'activo')
    
    cursor = mysql.connection.cursor()
    
    # Verificar que el usuario exista
    cursor.execute("SELECT id_usuario FROM usuario WHERE id_usuario = %s", (id_usuario,))
    if not cursor.fetchone():
        cursor.close()
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    sql = """INSERT INTO prestamo (id_usuario, fecha_prestamo, 
             fecha_devolucion_programada, estado)
             VALUES (%s, %s, %s, %s)"""
    cursor.execute(sql, (id_usuario, fecha_prestamo, fecha_devolucion_programada, estado))
    mysql.connection.commit()
    nuevo_id = cursor.lastrowid
    cursor.close()
    
    return jsonify({
        "mensaje": "Préstamo creado exitosamente",
        "id_prestamo": nuevo_id
    }), 201

# POST - Agregar equipo a préstamo
@app.route('/prestamos/<int:id_prestamo>/detalles', methods=['POST'])
#@jwt_required()
def agregar_equipo_a_prestamo(id_prestamo):
    data = request.get_json()
    id_equipo = data.get('id_equipo')
    
    cursor = mysql.connection.cursor()
    
    # Verificar que el préstamo exista
    cursor.execute("SELECT id_prestamo FROM prestamo WHERE id_prestamo = %s", (id_prestamo,))
    if not cursor.fetchone():
        cursor.close()
        return jsonify({"mensaje": "Préstamo no encontrado"}), 404
    
    # Verificar que el equipo exista
    cursor.execute("SELECT id_equipo, estado FROM equipo WHERE id_equipo = %s", (id_equipo,))
    equipo = cursor.fetchone()
    if not equipo:
        cursor.close()
        return jsonify({"mensaje": "Equipo no encontrado"}), 404
    
    # Insertar el detalle
    sql = """INSERT INTO detalleprestamo (id_prestamo, id_equipo)
             VALUES (%s, %s)"""
    cursor.execute(sql, (id_prestamo, id_equipo))
    mysql.connection.commit()
    nuevo_id = cursor.lastrowid
    
    # Actualizar estado del equipo a 'prestado'
    cursor.execute("""UPDATE equipo SET estado = 'prestado' 
                      WHERE id_equipo = %s""", (id_equipo,))
    mysql.connection.commit()
    cursor.close()
    
    return jsonify({
        "mensaje": "Equipo agregado al préstamo exitosamente",
        "id_detalle": nuevo_id
    }), 201

#-----------------------------------PUTS-------------------------------------

@app.route('/usuarios/<int:id>', methods=['PUT'])
#@jwt_required()
def actualizar_usuario(id):
    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    ci = data.get('ci')
    tipo_usuario = data.get('tipo_usuario')
    telefono = data.get('telefono')
    correo = data.get('correo')
    
    cursor = mysql.connection.cursor()
    sql = """UPDATE usuario 
             SET nombre=%s, apellido=%s, ci=%s, tipo_usuario=%s, 
                 telefono=%s, correo=%s
             WHERE id_usuario = %s"""
    cursor.execute(sql, (nombre, apellido, ci, tipo_usuario, telefono, correo, id))
    mysql.connection.commit()
    affected = cursor.rowcount
    cursor.close()
    
    if affected == 0:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    return jsonify({"mensaje": "Usuario actualizado exitosamente"}), 200

# PUT - Actualizar equipo
@app.route('/equipos/<int:id>', methods=['PUT'])
#@jwt_required()
def actualizar_equipo(id):
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    marca = data.get('marca')
    modelo = data.get('modelo')
    codigo_inventario = data.get('codigo_inventario')
    estado = data.get('estado')
    
    cursor = mysql.connection.cursor()
    sql = """UPDATE equipo 
             SET nombre=%s, descripcion=%s, marca=%s, modelo=%s, 
                 codigo_inventario=%s, estado=%s
             WHERE id_equipo = %s"""
    cursor.execute(sql, (nombre, descripcion, marca, modelo, codigo_inventario, estado, id))
    mysql.connection.commit()
    affected = cursor.rowcount
    cursor.close()
    
    if affected == 0:
        return jsonify({"mensaje": "Equipo no encontrado"}), 404
    
    return jsonify({"mensaje": "Equipo actualizado exitosamente"}), 200

# PUT - Registrar devolución
@app.route('/prestamos/<int:id>/devolver', methods=['PUT'])
#@jwt_required()
def registrar_devolucion(id):
    data = request.get_json()
    fecha_devolucion_real = data.get('fecha_devolucion_real', datetime.now().strftime('%Y-%m-%d'))
    
    cursor = mysql.connection.cursor()
    
    # Verificar que el préstamo exista y esté activo
    cursor.execute("""SELECT id_prestamo, estado FROM prestamo 
                      WHERE id_prestamo = %s""", (id,))
    prestamo = cursor.fetchone()
    
    if not prestamo:
        cursor.close()
        return jsonify({"mensaje": "Préstamo no encontrado"}), 404
    
    if prestamo[1] != 'activo':
        cursor.close()
        return jsonify({"mensaje": "El préstamo ya fue devuelto"}), 400
    
    # Actualizar el préstamo
    sql = """UPDATE prestamo 
             SET fecha_devolucion_real = %s, estado = 'devuelto'
             WHERE id_prestamo = %s"""
    cursor.execute(sql, (fecha_devolucion_real, id))
    mysql.connection.commit()
    cursor.close()
    
    return jsonify({"mensaje": "Devolución registrada exitosamente"}), 200

# PUT - Actualizar préstamo
@app.route('/prestamos/<int:id>', methods=['PUT'])
#@jwt_required()
def actualizar_prestamo(id):
    data = request.get_json()
    id_usuario = data.get('id_usuario')
    fecha_prestamo = data.get('fecha_prestamo')
    fecha_devolucion_programada = data.get('fecha_devolucion_programada')
    estado = data.get('estado')
    
    cursor = mysql.connection.cursor()
    sql = """UPDATE prestamo 
             SET id_usuario=%s, fecha_prestamo=%s, 
                 fecha_devolucion_programada=%s, estado=%s
             WHERE id_prestamo = %s"""
    cursor.execute(sql, (id_usuario, fecha_prestamo, fecha_devolucion_programada, estado, id))
    mysql.connection.commit()
    affected = cursor.rowcount
    cursor.close()
    
    if affected == 0:
        return jsonify({"mensaje": "Préstamo no encontrado"}), 404
    
    return jsonify({"mensaje": "Préstamo actualizado exitosamente"}), 200

#---------------------------------DELETES---------------------------------------

# DELETE - Eliminar usuario
@app.route('/usuarios/<int:id>', methods=['DELETE'])
#@jwt_required()
def eliminar_usuario(id):
    cursor = mysql.connection.cursor()
    sql = "DELETE FROM usuario WHERE id_usuario = %s"
    cursor.execute(sql, (id,))
    mysql.connection.commit()
    affected = cursor.rowcount
    cursor.close()
    
    if affected == 0:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    return jsonify({"mensaje": "Usuario eliminado exitosamente"}), 200

# DELETE - Eliminar equipo
@app.route('/equipos/<int:id>', methods=['DELETE'])
#@jwt_required()
def eliminar_equipo(id):
    cursor = mysql.connection.cursor()
    sql = "DELETE FROM equipo WHERE id_equipo = %s"
    cursor.execute(sql, (id,))
    mysql.connection.commit()
    affected = cursor.rowcount
    cursor.close()
    
    if affected == 0:
        return jsonify({"mensaje": "Equipo no encontrado"}), 404
    
    return jsonify({"mensaje": "Equipo eliminado exitosamente"}), 200

# DELETE - Eliminar préstamo
@app.route('/prestamos/<int:id>', methods=['DELETE'])
#@jwt_required()
def eliminar_prestamo(id):
    cursor = mysql.connection.cursor()
    
    # Primero eliminar los detalles
    cursor.execute("DELETE FROM detalleprestamo WHERE id_prestamo = %s", (id,))
    
    # Luego eliminar el préstamo
    sql = "DELETE FROM prestamo WHERE id_prestamo = %s"
    cursor.execute(sql, (id,))
    mysql.connection.commit()
    affected = cursor.rowcount
    cursor.close()
    
    if affected == 0:
        return jsonify({"mensaje": "Préstamo no encontrado"}), 404
    
    return jsonify({"mensaje": "Préstamo eliminado exitosamente"}), 200

# DELETE - Eliminar equipo de préstamo
@app.route('/prestamos/detalles/<int:id_detalle>', methods=['DELETE'])
#@jwt_required()
def eliminar_detalle_prestamo(id_detalle):
    cursor = mysql.connection.cursor()
    
    # Obtener el id_equipo antes de eliminar
    cursor.execute("SELECT id_equipo FROM detalleprestamo WHERE id_detalle = %s", (id_detalle,))
    resultado = cursor.fetchone()
    
    if not resultado:
        cursor.close()
        return jsonify({"mensaje": "Detalle no encontrado"}), 404
    
    id_equipo = resultado[0]
    
    # Eliminar el detalle
    sql = "DELETE FROM detalleprestamo WHERE id_detalle = %s"
    cursor.execute(sql, (id_detalle,))
    mysql.connection.commit()
    
    # Verificar si el equipo está en otros préstamos activos
    cursor.execute("""SELECT COUNT(*) FROM detalleprestamo dp
                      JOIN prestamo p ON dp.id_prestamo = p.id_prestamo
                      WHERE dp.id_equipo = %s AND p.estado = 'activo'""", (id_equipo,))
    count = cursor.fetchone()[0]
    
    # Si no está en otros préstamos activos, marcar como disponible
    if count == 0:
        cursor.execute("""UPDATE equipo SET estado = 'disponible' 
                          WHERE id_equipo = %s""", (id_equipo,))
        mysql.connection.commit()
    
    cursor.close()
    
    return jsonify({"mensaje": "Equipo removido del préstamo exitosamente"}), 200


if __name__ == '__main__':
    app.run(debug=True)
   