/**
 * Solicitudes.js - Maneja la interacción del formulario de solicitud de documentos
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('documentRequestForm');
    const formContainer = document.getElementById('requestFormContainer');
    const successMessage = document.getElementById('successMessage');
    const ticketIdDisplay = document.getElementById('ticketIdDisplay');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        // 1. Recopilar datos del formulario
        const formData = new FormData(form);
        const requestData = {
            type: formData.get('type'),
            studentName: formData.get('studentName'),
            studentId: formData.get('studentId'),
            grade: formData.get('grade'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            details: formData.get('details')
        };

        // 2. Validaciones básicas (adicionales a HTML5)
        if (!validateForm(requestData)) {
            return;
        }

        // 3. Enviar al Service Manager
        try {
            const btnSubmit = form.querySelector('.btn-submit');
            const originalText = btnSubmit.innerText;

            // Simular carga
            btnSubmit.disabled = true;
            btnSubmit.innerText = 'Procesando...';

            setTimeout(() => {
                // Crear la solicitud
                const newTicket = window.serviceManager.createDocumentRequest(requestData);

                // 4. Mostrar confirmación
                showSuccess(newTicket);
            }, 1000); // Pequeño delay para UX

        } catch (error) {
            console.error('Error al procesar solicitud:', error);
            alert('Hubo un error al procesar su solicitud. Por favor intente nuevamente.');
        }
    }

    function validateForm(data) {
        // Validación de SIE (Debe ser numérico)
        if (!/^\d+$/.test(data.studentId)) {
            alert('El número de estudiante debe contener solo números.');
            return false;
        }
        return true;
    }

    function showSuccess(ticket) {
        // Ocultar formulario y mostrar mensaje de éxito
        formContainer.style.display = 'none';
        successMessage.style.display = 'block';

        // Mostrar ID del ticket
        ticketIdDisplay.textContent = ticket.id;

        // Opcional: Simular envío de notificación visual
        // alert(`📧 Se ha enviado un correo de confirmación a: ${ticket.email}`);
    }
});
