import MySQLdb

try:
    conn = MySQLdb.connect(host='localhost', user='root', passwd='')
    cursor = conn.cursor()
    cursor.execute('SHOW DATABASES LIKE "proyectoprestamo"')
    db = cursor.fetchone()
    print('Database exists:', db is not None)
    
    if db:
        cursor.execute('USE proyectoprestamo')
        cursor.execute('SHOW TABLES')
        tables = cursor.fetchall()
        print('Tables:', [t[0] for t in tables])
        
        cursor.execute('SELECT COUNT(*) FROM usuario')
        count = cursor.fetchone()
        print('Users in database:', count[0])
    
    conn.close()
except Exception as e:
    print('Error:', str(e))
