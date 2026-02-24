/**
 * Orientacion.js - Manejo de citas y alertas tempranas
 */

document.addEventListener('DOMContentLoaded', () => {

    // Tab Switching
    window.switchTab = (tabName) => {
        // Buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active'); // Assumes onclick passes event, but we use inline onclick so event is global or needs handle

        // Content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`tab-${tabName}`).classList.add('active');

        // Update button visual state if called from non-event context (helper)
        const buttons = document.querySelectorAll('.tab-btn');
        if (tabName === 'estudiantes') buttons[0].classList.add('active');
        if (tabName === 'maestros') buttons[1].classList.add('active');
    };

    // Need to attach event listener properly for switchTab to work if using buttons in html
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => {
        btn.onclick = (e) => {
            const tab = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];

            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`tab-${tab}`).classList.add('active');
        };
    });


    // Appointment Form
    const apptForm = document.getElementById('appointmentForm');
    if (apptForm) {
        apptForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const result = window.serviceManager.createCounselingAppointment(data);
                alert(`✅ Cita solicitada para el ${data.preferredDate}.\nID: ${result.id}\nTe confirmaremos por email.`);
                e.target.reset();
            } catch (err) {
                console.error(err);
                alert('Error al solicitar cita');
            }
        });
    }

    // Early Alert Form
    const alertForm = document.getElementById('earlyAlertForm');
    if (alertForm) {
        alertForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get checkbox values
            const risks = [];
            alertForm.querySelectorAll('input[name="risks"]:checked').forEach(cb => risks.push(cb.value));

            const formData = new FormData(e.target);
            const data = {
                studentName: formData.get('studentName'),
                teacherName: formData.get('teacherName'),
                observations: formData.get('observations'),
                risks: risks
            };

            try {
                window.serviceManager.createEarlyAlert(data);
                alert('⚠️ Alerta enviada al equipo de Consejería y Trabajo Social.\nSe activará el protocolo de intervención.');
                e.target.reset();
            } catch (err) {
                console.error(err);
                alert('Error al enviar alerta');
            }
        });
    }
});
