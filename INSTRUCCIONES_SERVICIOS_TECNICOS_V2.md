# 🛠️ Sistema de Servicios Técnicos V2 - Instrucciones Completas

## ✅ Nuevas Características Implementadas

### 🎯 Mejoras Principales:

1. **Header Completo** ✅
   - Logo y menú de navegación
   - Enlace de regreso a la página principal
   - Menú responsive

2. **Sistema de Autenticación Dual** ✅
   - Login para Técnicos (con usuario y contraseña)
   - Login para Maestros (con usuario y contraseña)
   - Registro de nuevos técnicos

3. **Gestión de Técnicos** ✅
   - Registro con nombre, usuario, contraseña y especialidad
   - Asignación de tickets a técnicos específicos
   - Panel personalizado para cada técnico

4. **Sistema de Calificación Completo** ✅
   - Calificación del cliente (1-5 estrellas)
   - Comentarios del cliente
   - Calificación del maestro (0-100 puntos)
   - Promedio de calificaciones por técnico

5. **Encuesta de Satisfacción** ✅
   - Página dedicada para calificar el servicio
   - Sistema de estrellas interactivo
   - Enlace único por ticket
   - Validación de tickets ya calificados

---

## 📋 Credenciales por Defecto

### Maestro:
```
Usuario: maestro
Contraseña: maestro2026
```

### Técnicos:
Los técnicos deben registrarse usando el botón "Registrarse como Técnico"

---

## 🔄 Flujo Completo del Sistema

### 1. Cliente Abre un Ticket
1. **Completa el formulario** con sus datos
2. **Selecciona** categoría y prioridad
3. **Describe** el problema
4. **Envía** el ticket
5. **Recibe** un ID de ticket

### 2. Maestro Asigna el Ticket
1. **Inicia sesión** como maestro
2. **Ve** todos los tickets abiertos
3. **Selecciona** un técnico del dropdown
4. **Asigna** el ticket
5. El ticket cambia a estado "En Progreso"

### 3. Técnico Resuelve el Ticket
1. **Inicia sesión** como técnico
2. **Ve** sus tickets asignados
3. **Trabaja** en el problema
4. **Marca** como resuelto
5. **Envía** enlace de encuesta al cliente

### 4. Cliente Califica el Servicio
1. **Recibe** el enlace de encuesta
2. **Abre** la encuesta
3. **Califica** con estrellas (1-5)
4. **Agrega** comentarios (opcional)
5. **Envía** la encuesta
6. El ticket cambia a "Completado"

### 5. Maestro Evalúa al Técnico
1. **Revisa** las calificaciones de clientes
2. **Revisa** los tickets resueltos
3. **Asigna** puntuación (0-100)
4. **Guarda** la evaluación

---

## 👥 Guía por Rol

### Para Estudiantes/Clientes:

#### Abrir un Ticket:
1. Ve a `servicios-tecnicos.html`
2. Completa el formulario:
   - Nombre Completo
   - Correo Electrónico
   - Categoría del Problema
   - Prioridad
   - Descripción
3. Haz clic en "Enviar Ticket"
4. Anota tu ID de ticket

#### Calificar el Servicio:
1. Recibe el enlace por correo/mensaje
2. Haz clic en el enlace
3. Selecciona las estrellas (1-5)
4. Agrega comentarios (opcional)
5. Haz clic en "Enviar Encuesta"

### Para Técnicos:

#### Registrarse:
1. Haz clic en "Portal de Técnicos"
2. Haz clic en "Soy Técnico"
3. Haz clic en "Registrarse como Técnico"
4. Completa:
   - Nombre Completo
   - Usuario
   - Contraseña
   - Especialidad (Hardware, Software, Redes, General)
5. Haz clic en "Registrarse"

#### Iniciar Sesión:
1. Haz clic en "Portal de Técnicos"
2. Haz clic en "Soy Técnico"
3. Ingresa usuario y contraseña
4. Haz clic en "Acceder"

#### Resolver Tickets:
1. Ve tus tickets asignados en "Mis Tickets Asignados"
2. Revisa la información del ticket
3. Trabaja en el problema
4. Haz clic en "Marcar como Resuelto"
5. Haz clic en "Enviar Encuesta"
6. Copia el enlace y envíalo al cliente

### Para Maestros:

#### Iniciar Sesión:
1. Haz clic en "Portal de Técnicos"
2. Haz clic en "Soy Maestro"
3. Ingresa: `maestro` / `maestro2026`
4. Haz clic en "Acceder"

#### Asignar Tickets:
1. Ve la sección "Todos los Tickets"
2. Busca tickets con estado "Abierto"
3. Selecciona un técnico del dropdown
4. Haz clic en "Asignar"

#### Evaluar Técnicos:
1. Ve la tabla "Evaluación de Técnicos"
2. Revisa:
   - Tickets Resueltos
   - Calificación Promedio de Clientes
3. Ingresa la puntuación (0-100)
4. Haz clic en "Guardar"

---

## 📊 Estadísticas

### Métricas Disponibles:

1. **Total Tickets**: Todos los tickets creados
2. **Tickets Abiertos**: Pendientes de asignación
3. **Tickets Resueltos**: Completados por técnicos
4. **Tasa de Resolución**: Porcentaje de tickets resueltos

### Por Técnico:

- Cantidad de tickets resueltos
- Calificación promedio de clientes (1-5 estrellas)
- Puntuación del maestro (0-100)

---

## 🔐 Seguridad

### Cambiar Contraseña del Maestro:

1. Abre el navegador
2. Presiona F12 (Herramientas de Desarrollo)
3. Ve a la pestaña "Console"
4. Ejecuta:
```javascript
const teachers = JSON.parse(localStorage.getItem('teachers'));
teachers[0].password = 'NuevaContraseña';
localStorage.setItem('teachers', JSON.stringify(teachers));
```

### Agregar Más Maestros:

```javascript
const teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
teachers.push({
    username: 'maestro2',
    password: 'password123',
    fullName: 'Segundo Maestro',
    role: 'teacher'
});
localStorage.setItem('teachers', JSON.stringify(teachers));
```

---

## 🎨 Estados de Tickets

| Estado | Color | Descripción |
|--------|-------|-------------|
| **Abierto** | Amarillo | Ticket creado, esperando asignación |
| **En Progreso** | Azul | Asignado a un técnico |
| **Resuelto** | Verde | Técnico completó el trabajo |
| **Completado** | Verde | Cliente calificó el servicio |

---

## 📧 Sistema de Encuestas

### Cómo Funciona:

1. Técnico marca ticket como resuelto
2. Sistema genera enlace único:
   ```
   encuesta-satisfaccion.html?ticket=TKT-1234567890
   ```
3. Técnico copia y envía el enlace al cliente
4. Cliente abre el enlace
5. Cliente califica con estrellas
6. Cliente agrega comentarios
7. Sistema guarda la calificación
8. Ticket cambia a "Completado"

### Validaciones:

- ✅ Enlace válido solo para tickets existentes
- ✅ No se puede calificar dos veces
- ✅ Muestra información del ticket
- ✅ Requiere seleccionar estrellas
- ✅ Comentarios opcionales

---

## 🔍 Filtros Disponibles

### En la Lista de Tickets:

1. **Por Estado**:
   - Todos
   - Abiertos
   - En Progreso
   - Resueltos

2. **Por Fecha**:
   - Selector de fecha específica

3. **Búsqueda**:
   - Por nombre del cliente
   - Por ID de ticket

---

## 💾 Almacenamiento de Datos

### LocalStorage Keys:

- `pcb_services_data` - Todos los tickets
- `technicians` - Lista de técnicos registrados
- `teachers` - Lista de maestros
- `techScores` - Puntuaciones asignadas por maestros

### Estructura de un Ticket:

```json
{
  "id": "TKT-1234567890",
  "studentName": "Juan Pérez",
  "studentEmail": "juan@example.com",
  "category": "hardware",
  "priority": "alta",
  "description": "La computadora no enciende",
  "status": "abierto",
  "date": "2026-02-09T12:00:00.000Z",
  "assignedTo": "tech_user",
  "resolvedBy": "tech_user",
  "resolvedDate": "2026-02-09T14:00:00.000Z",
  "completedDate": "2026-02-09T15:00:00.000Z",
  "rating": 5,
  "ratingComment": "Excelente servicio",
  "score": 95
}
```

---

## 📁 Archivos del Sistema

### Modificados:
- ✅ `servicios-tecnicos.html` (1077 líneas)
- ✅ `js/services-manager.js` (función updateTicket agregada)

### Creados:
- ✅ `encuesta-satisfaccion.html` (323 líneas)
- ✅ `INSTRUCCIONES_SERVICIOS_TECNICOS_V2.md` (este archivo)

---

**Fecha de Actualización**: 2026-02-09  
**Versión**: 2.0  
**Estado**: ✅ PRODUCCIÓN

