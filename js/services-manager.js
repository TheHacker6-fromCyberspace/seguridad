/**
 * Service Manager - Sistema Central de Gestión de Solicitudes Escolares
 * Maneja la lógica de negocio, persistencia de datos y notificaciones simuladas.
 */
class ServiceManager {
    constructor() {
        this.STORAGE_KEY = 'pcb_school_services_data';
        this.data = this.loadData();
    }

    /**
     * Carga los datos del LocalStorage o inicializa la estructura si no existe.
     */
    loadData() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            solicitudes_documentos: [],
            matriculas: [],
            enfermeria_visitas: [],
            tickets_soporte: [],
            citas_orientacion: [],
            inventario_biblioteca: [],
            usuarios: [], // Simulados
            config: {
                schoolName: 'Escuela Superior Vocacional',
                academicYear: '2025-2026'
            },
            news: [] // Array for news/promotions
        };
    }

    /**
     * Guarda el estado actual en LocalStorage.
     */
    saveData() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    }

    /**
     * Genera un ID único para un ticket o solicitud.
     * @param {string} prefix - Prefijo del ID (ej: 'DOC', 'MAT', 'ENF')
     */
    generateId(prefix) {
        const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
        const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${datePart}-${randomPart}`;
    }

    /**
     * Crea una nueva solicitud de documento.
     * @param {Object} requestData - Datos del formulario
     */
    createDocumentRequest(requestData) {
        const id = this.generateId('DOC');
        const newRequest = {
            id: id,
            type: requestData.type, // 'certificacion', 'transcripcion', etc.
            studentName: requestData.studentName,
            studentId: requestData.studentId, // Número de estudiante
            grade: requestData.grade,
            email: requestData.email,
            phone: requestData.phone,
            details: requestData.details,
            status: 'pendiente', // 'pendiente', 'en_proceso', 'completado', 'rechazado'
            requestDate: new Date().toISOString(),
            lastUpdate: new Date().toISOString(),
            comments: []
        };

        this.data.solicitudes_documentos.push(newRequest);
        this.saveData();
        this.simulateNotification(newRequest, 'created');
        return newRequest;
    }

    /**
     * Obtiene una solicitud por su ID.
     */
    getRequestById(id) {
        return this.data.solicitudes_documentos.find(req => req.id === id);
    }

    /**
     * Obtiene todas las solicitudes, opcionalmente filtradas por estado.
     */
    getRequests(status = null) {
        if (status) {
            return this.data.solicitudes_documentos.filter(req => req.status === status);
        }
        return this.data.solicitudes_documentos;
    }

    /**
     * Actualiza el estado de una solicitud.
     */
    updateRequestStatus(id, newStatus, adminComment = '') {
        const request = this.getRequestById(id);
        if (request) {
            request.status = newStatus;
            request.lastUpdate = new Date().toISOString();
            if (adminComment) {
                request.comments.push({
                    text: adminComment,
                    date: new Date().toISOString(),
                    author: 'Administrador'
                });
            }
            this.saveData();
            this.simulateNotification(request, 'updated');
            return true;
        }
        return false;
    }

    /**
     * Crea una nueva solicitud de matrícula.
     */
    createEnrollment(enrollmentData) {
        const id = this.generateId('MAT');
        const newEnrollment = {
            id: id,
            ...enrollmentData,
            status: 'pendiente',
            requestDate: new Date().toISOString()
        };

        this.data.matriculas.push(newEnrollment);
        this.saveData();
        this.simulateNotification(newEnrollment, 'enrollment_created');
        return newEnrollment;
    }

    /**
     * Registra una visita a enfermería.
     */
    registerNurseVisit(visitData) {
        const id = this.generateId('NUR');
        const newVisit = {
            id: id,
            ...visitData,
            date: new Date().toISOString(),
            status: 'atendido'
        };

        this.data.enfermeria_visitas.push(newVisit);
        this.saveData();
        return newVisit;
    }

    /**
     * Obtiene estadísticas anónimas de enfermería.
     */
    getNurseStats() {
        const visits = this.data.enfermeria_visitas;
        const stats = {
            total: visits.length,
            byType: {},
            lastWeek: 0
        };

        // Calcular estadísticas
        visits.forEach(v => {
            stats.byType[v.reason] = (stats.byType[v.reason] || 0) + 1;

            // Check if last week (simple check)
            const visitDate = new Date(v.date);
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            if (visitDate > oneWeekAgo) {
                stats.lastWeek++;
            }
        });

        return stats;
    }

    /**
     * Crea una cita de orientación.
     */
    createCounselingAppointment(appointmentData) {
        const id = this.generateId('CIT');
        const newAppointment = {
            id: id,
            ...appointmentData,
            status: 'pendiente',
            dateCreated: new Date().toISOString()
        };

        this.data.citas_orientacion.push(newAppointment);
        this.saveData();
        this.simulateNotification(newAppointment, 'appointment_created');
        return newAppointment;
    }

    /**
     * Crea una alerta temprana (Riesgo Académico).
     */
    createEarlyAlert(alertData) {
        const id = this.generateId('ALT');
        const newAlert = {
            id: id,
            ...alertData,
            status: 'activa',
            priority: 'alta',
            dateCreated: new Date().toISOString()
        };

        // Podríamos tener una colección separada, pero por simplicidad usaremos tickets de soporte o una genérica
        // Para este MVP, lo guardamos en 'citas_orientacion' con un tipo especial o añadimos 'alertas_tempranas' al schema
        if (!this.data.alertas_tempranas) this.data.alertas_tempranas = [];

        this.data.alertas_tempranas.push(newAlert);
        this.saveData();
        return newAlert;
    }

    /**
     * Crea un ticket de soporte técnico.
     */
    createTicket(ticketData) {
        const id = this.generateId('TICK');
        const newTicket = {
            id: id,
            ...ticketData,
            status: 'abierto',
            assignedTo: null,
            dateCreated: new Date().toISOString(),
            logs: []
        };

        this.data.tickets_soporte.push(newTicket);
        this.saveData();
        this.simulateNotification(newTicket, 'ticket_created');
        return newTicket;
    }

    /**
     * Registra horas de trabajo WBL para un estudiante técnico.
     */
    logWBLHours(logData) {
        const ticket = this.data.tickets_soporte.find(t => t.id === logData.ticketId);
        if (ticket) {
            ticket.logs.push({
                studentName: logData.studentName,
                hours: logData.hours,
                description: logData.description,
                date: new Date().toISOString(),
                evidenceUrl: logData.evidenceUrl || null
            });

            // Si se marca como completado
            if (logData.markCompleted) {
                ticket.status = 'resuelto';
                ticket.dateClosed = new Date().toISOString();
            }

            this.saveData();
            return true;
        }
        return false;
    }

    /**
     * Busca libros en el catálogo simulado.
     */
    searchBooks(query) {
        // Catálogo simulado
        const catalog = [
            { id: 'LIB001', title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', category: 'Literatura' },
            { id: 'LIB002', title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', category: 'Literatura' },
            { id: 'LIB003', title: 'Biología Celular', author: 'Albert Bruce', category: 'Ciencias' },
            { id: 'LIB004', title: 'Álgebra de Baldor', author: 'Aurelio Baldor', category: 'Matemáticas' },
            { id: 'LIB005', title: 'Historia de Puerto Rico', author: 'Fernando Picó', category: 'Historia' }
        ];

        if (!query) return catalog;
        const lowerQ = query.toLowerCase();
        return catalog.filter(book =>
            book.title.toLowerCase().includes(lowerQ) ||
            book.author.toLowerCase().includes(lowerQ)
        );
    }

    /**
     * Crea una reserva de libro.
     */
    reserveBook(reservationData) {
        const id = this.generateId('RES');
        const newReservation = {
            id: id,
            ...reservationData,
            status: 'pendiente',
            dateReserved: new Date().toISOString()
        };

        // Guardamos en una lista genérica por ahora o extendemos schema
        if (!this.data.reservas_biblioteca) this.data.reservas_biblioteca = [];
        this.data.reservas_biblioteca.push(newReservation);
        this.saveData();
        return newReservation;
    }

    /**
     * Envía un mensaje desde el portal de padres.
     */
    sendParentMessage(messageData) {
        const id = this.generateId('MSG');
        const newMessage = {
            id: id,
            ...messageData,
            status: 'enviado',
            dateSent: new Date().toISOString()
        };

        if (!this.data.mensajes_padres) this.data.mensajes_padres = [];
        this.data.mensajes_padres.push(newMessage);
        this.saveData();
        this.simulateNotification(newMessage, 'message_sent');
        return newMessage;
    }

    /**
     * Registra una visita en el módulo de seguridad.
     */
    registerVisitor(visitorData) {
        const id = this.generateId('VISIT');
        const newVisit = {
            id: id,
            ...visitorData,
            checkIn: new Date().toISOString(),
            checkOut: null,
            status: 'active'
        };

        if (!this.data.seguridad_visitas) this.data.seguridad_visitas = [];
        this.data.seguridad_visitas.push(newVisit);
        this.saveData();
        return newVisit;
    }

    /**
     * Registra la salida de un visitante.
     */
    checkoutVisitor(visitorId) {
        if (!this.data.seguridad_visitas) return false;

        const visit = this.data.seguridad_visitas.find(v => v.id === visitorId);
        if (visit && visit.status === 'active') {
            visit.checkOut = new Date().toISOString();
            visit.status = 'completed';
            this.saveData();
            return true;
        }
        return false;
    }

    /**
     * Reporta un incidente de seguridad.
     */
    reportIncident(incidentData) {
        const id = this.generateId('INC');
        const newIncident = {
            id: id,
            ...incidentData,
            dateReported: new Date().toISOString(),
            status: 'investigating'
        };

        if (!this.data.seguridad_incidentes) this.data.seguridad_incidentes = [];
        this.data.seguridad_incidentes.push(newIncident);
        this.saveData();
        this.simulateNotification(newIncident, 'incident_reported');
        return newIncident;
    }

    /**
     * Respuesta simple del Asistente IA.
     */
    getAIResponse(query) {
        const lowerQ = query.toLowerCase();

        if (lowerQ.includes('horari') || lowerQ.includes('hora')) {
            return "El horario escolar es de 7:30 AM a 2:30 PM para estudiantes.";
        }
        if (lowerQ.includes('matricula') || lowerQ.includes('inscrip')) {
            return "Puedes realizar la matrícula en línea a través de la sección 'Solicitudes' > 'Matrícula'.";
        }
        if (lowerQ.includes('comedor') || lowerQ.includes('almuerzo')) {
            return "El comedor sirve almuerzo de 11:00 AM a 1:00 PM. Puedes ver el menú en la sección 'Comedor'.";
        }
        if (lowerQ.includes('biblioteca')) {
            return "La biblioteca abre de 7:00 AM a 2:00 PM. Puedes reservar libros en línea.";
        }
        if (lowerQ.includes('enferme') || lowerQ.includes('medico')) {
            return "La enfermería está disponible para urgencias básicas y administración de medicamentos con autorización.";
        }

        return "Lo siento, soy un asistente en entrenamiento. Por favor contacta a la oficina administrativa para esa consulta.";
    }

    /**
     * Agrega una nueva noticia/promoción.
     */
    addNews(newsData) {
        const id = this.generateId('NEWS');
        const newNews = {
            id: id,
            ...newsData,
            date: new Date().toISOString(),
            active: true
        };

        if (!this.data.news) this.data.news = [];
        this.data.news.push(newNews);
        this.saveData();
        return newNews;
    }

    /**
     * Elimina una noticia por ID.
     */
    deleteNews(id) {
        if (!this.data.news) return false;
        this.data.news = this.data.news.filter(n => n.id !== id);
        this.saveData();
        return true;
    }

    /**
     * Obtiene la última noticia activa.
     */
    getLatestNews() {
        if (!this.data.news || this.data.news.length === 0) return null;
        // Sort by date desc
        const sorted = [...this.data.news].sort((a, b) => new Date(b.date) - new Date(a.date));
        return sorted[0];
    }

    /**
     * Obtiene todas las noticias.
     */
    getAllNews() {
        return this.data.news || [];
    }

    /**
     * Simula el envío de notificaciones (Email/WhatsApp).
     */
    simulateNotification(request, event) {
        console.log(`🔔 NOTIFICATION [${event}]:`, request);

        let message = '';
        if (event === 'created') {
            message = `Su solicitud ${request.id} ha sido recibida. Le notificaremos cuando esté lista.`;
        } else if (event === 'updated') {
            message = `Actualización de solicitud ${request.id}: Su estado ahora es ${request.status.toUpperCase()}.`;
        }

        // En un entorno real, aquí se llamaría a una API de envío.
        // Aquí solo mostramos un log o podríamos usar Notification API del navegador si fuera necesario.
        // alert(`Simulación de envio de correo a ${request.email}:\n\n${message}`);
    }

    /**
     * Add a new support ticket
     */
    addTicket(ticket) {
        if (!this.data.tickets_soporte) {
            this.data.tickets_soporte = [];
        }
        this.data.tickets_soporte.push(ticket);
        this.saveData();
        return ticket;
    }

    /**
     * Get all support tickets
     */
    getAllTickets() {
        if (!this.data.tickets_soporte) {
            this.data.tickets_soporte = [];
        }
        return this.data.tickets_soporte;
    }

    /**
     * Update a ticket
     */
    updateTicket(updatedTicket) {
        const index = this.data.tickets_soporte.findIndex(t => t.id === updatedTicket.id);
        if (index !== -1) {
            this.data.tickets_soporte[index] = updatedTicket;
            this.saveData();
        }
        return updatedTicket;
    }

    /**
     * Resolve a ticket
     */
    resolveTicket(ticketId, techName) {
        const ticket = this.data.tickets_soporte.find(t => t.id === ticketId);
        if (ticket) {
            ticket.status = 'resuelto';
            ticket.resolvedBy = techName;
            ticket.resolvedDate = new Date().toISOString();
            this.saveData();
        }
        return ticket;
    }

    /**
     * Save technician score
     */
    saveTechScore(techName, score) {
        if (!this.data.techScores) {
            this.data.techScores = {};
        }
        this.data.techScores[techName] = score;
        this.saveData();
    }

    /**
     * Get technician score
     */
    getTechScore(techName) {
        if (!this.data.techScores) {
            this.data.techScores = {};
        }
        return this.data.techScores[techName] || 0;
    }
}

// Exportar instancia global
window.serviceManager = new ServiceManager();
