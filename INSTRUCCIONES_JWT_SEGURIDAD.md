# 🔐 Sistema de Autenticación JWT - Instrucciones

## ✅ Implementación Completada

Se ha implementado un sistema de autenticación seguro con las siguientes características:

### 🎯 Características de Seguridad

1. **JWT (JSON Web Tokens)** ✅
   - Tokens firmados con HMAC SHA-256
   - Expiración automática después de 2 horas
   - Verificación de firma en cada petición

2. **Encriptación de Contraseñas** ✅
   - PBKDF2 con 100,000 iteraciones
   - Salt aleatorio único para cada contraseña
   - Hash SHA-256
   - Las contraseñas NUNCA se almacenan en texto plano

3. **Protección de Sesión** ✅
   - Token almacenado de forma segura
   - Verificación automática en páginas protegidas
   - Cierre de sesión seguro

## 📋 Credenciales por Defecto

```
Usuario: admin
Contraseña: PCB2026
```

**⚠️ IMPORTANTE**: Cambia la contraseña inmediatamente después del primer login.

## 🔧 Cómo Cambiar la Contraseña

### Método 1: Desde la Consola del Navegador

1. **Inicia sesión** en el dashboard
2. **Abre la consola** del navegador (F12 → Console)
3. **Ejecuta** el siguiente comando:

```javascript
CryptoUtils.hashPassword('TU_NUEVA_CONTRASEÑA').then(hash => {
  console.log('Nuevo hash de contraseña:');
  console.log(hash);
  console.log('\nCopia este hash y pégalo en js/auth-jwt.js');
});
```

4. **Copia** el hash generado
5. **Abre** el archivo `js/auth-jwt.js`
6. **Busca** la línea que dice:
   ```javascript
   passwordHash: null // Se inicializará dinámicamente
   ```
7. **Reemplázala** con:
   ```javascript
   passwordHash: 'EL_HASH_QUE_COPIASTE'
   ```
8. **Guarda** el archivo

### Método 2: Generar Hash Manualmente

1. **Abre** `login.html` en tu navegador
2. **Abre la consola** (F12)
3. **Ejecuta**:
   ```javascript
   CryptoUtils.hashPassword('MiNuevaContraseña123!').then(console.log)
   ```
4. **Copia** el resultado y actualiza `js/auth-jwt.js`

## 🛡️ Archivos del Sistema de Seguridad

### 1. `js/crypto-utils.js`
Funciones de encriptación:
- `hashPassword(password)` - Hashea una contraseña
- `verifyPassword(password, hash)` - Verifica una contraseña
- `sha256(message)` - Hash SHA-256
- `pbkdf2(password, salt)` - Derivación de clave
- `encrypt(data, password)` - Encripta datos
- `decrypt(data, password)` - Desencripta datos

### 2. `js/jwt-simple.js`
Funciones JWT:
- `JWT.create(payload, secret, expiresIn)` - Crea un token
- `JWT.verify(token, secret)` - Verifica un token
- `JWT.decode(token)` - Decodifica sin verificar

### 3. `js/auth-jwt.js`
Sistema de autenticación:
- `AuthJWT.login(username, password)` - Iniciar sesión
- `AuthJWT.logout()` - Cerrar sesión
- `AuthJWT.isAuthenticated()` - Verificar autenticación
- `AuthJWT.getUserData()` - Obtener datos del usuario
- `AuthJWT.refreshToken()` - Renovar token
- `AuthJWT.changePassword(current, new)` - Cambiar contraseña

## 🔒 Seguridad Adicional

### Cambiar el Secret JWT

Para mayor seguridad, cambia el secret JWT:

1. **Abre** `js/auth-jwt.js`
2. **Busca**:
   ```javascript
   const JWT_SECRET = 'PCB_2026_SECRET_KEY_CHANGE_THIS_IN_PRODUCTION';
   ```
3. **Cámbialo** por una cadena aleatoria larga:
   ```javascript
   const JWT_SECRET = 'TuSecretSuperSeguroYAleatorio123!@#$%';
   ```

### Cambiar Duración de Sesión

Por defecto, las sesiones duran 2 horas. Para cambiar:

1. **Abre** `js/auth-jwt.js`
2. **Busca**:
   ```javascript
   const SESSION_DURATION = 2 * 60 * 60; // 2 horas en segundos
   ```
3. **Modifica** el valor:
   ```javascript
   const SESSION_DURATION = 4 * 60 * 60; // 4 horas
   const SESSION_DURATION = 30 * 60;     // 30 minutos
   const SESSION_DURATION = 24 * 60 * 60; // 24 horas
   ```

## 🧪 Probar el Sistema

### 1. Login
1. Abre `login.html`
2. Ingresa: `admin` / `PCB2026`
3. Deberías ver "✅ Acceso concedido"
4. Serás redirigido a `admin.html`

### 2. Verificar Token
En la consola del navegador:
```javascript
// Ver el token
localStorage.getItem('pcb_auth_token')

// Ver datos del usuario
AuthJWT.getUserData().then(console.log)

// Verificar autenticación
AuthJWT.isAuthenticated().then(console.log)
```

### 3. Logout
Haz clic en "🚪 Cerrar Sesión" en el dashboard

## 🔍 Solución de Problemas

### Problema: "Token verification failed"
**Solución**: El token expiró o es inválido. Cierra sesión y vuelve a iniciar.

### Problema: "Usuario o contraseña incorrectos"
**Solución**: Verifica las credenciales. Por defecto: `admin` / `PCB2026`

### Problema: No puedo acceder al dashboard
**Solución**: 
1. Abre la consola (F12)
2. Busca errores en rojo
3. Verifica que los archivos JS se carguen correctamente

### Problema: La contraseña no funciona después de cambiarla
**Solución**: 
1. Verifica que copiaste el hash completo
2. Asegúrate de que el hash esté entre comillas
3. Recarga la página sin caché (Ctrl + Shift + R)

## 📊 Comparación: Antes vs Ahora

| Característica | Sistema Anterior | Sistema Nuevo (JWT) |
|----------------|------------------|---------------------|
| **Contraseña** | Texto plano | Hash PBKDF2 + Salt |
| **Sesión** | localStorage simple | JWT firmado |
| **Expiración** | 2 horas | 2 horas (configurable) |
| **Verificación** | Comparación directa | Firma HMAC SHA-256 |
| **Seguridad** | ⚠️ Baja | ✅ Alta |

## 🎓 Conceptos Técnicos

### ¿Qué es JWT?
JSON Web Token - Un estándar para transmitir información de forma segura entre partes como un objeto JSON.

### ¿Qué es PBKDF2?
Password-Based Key Derivation Function 2 - Función que deriva una clave criptográfica de una contraseña.

### ¿Qué es un Salt?
Datos aleatorios que se combinan con la contraseña antes de hashearla, haciendo cada hash único.

### ¿Qué es HMAC?
Hash-based Message Authentication Code - Código de autenticación que verifica la integridad y autenticidad.

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que todos los archivos JS estén cargados
3. Asegúrate de usar un navegador moderno (Chrome, Firefox, Edge)

---

**Fecha de Implementación**: 2026-02-09  
**Versión**: 1.0  
**Estado**: ✅ PRODUCCIÓN

