/**
 * Soporte.js - Manejo de tickets y WBL
 */

document.addEventListener('DOMContentLoaded', () => {

    // UI Helpers
    window.showTicketForm = () => document.getElementById('ticketModal').style.display = 'flex';
    window.closeModal = (id) => document.getElementById(id).style.display = 'none';
    window.toggleTechPortal = () => {
        const portal = document.getElementById('techPortal');
        portal.classList.toggle('active');
        if (portal.classList.contains('active')) loadTickets();
    };

    // Forms
    const ticketForm = document.getElementById('newTicketForm');
    const wblForm = document.getElementById('wblLogForm');

    if (ticketForm) {
        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const ticket = window.serviceManager.createTicket(data);
                alert(`Ticket #${ticket.id} creado exitosamente.`);
                window.closeModal('ticketModal');
                e.target.reset();
                loadTickets(); // Refresh if open
            } catch (err) {
                console.error(err);
                alert('Error al crear ticket');
            }
        });
    }

    if (wblForm) {
        wblForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                ticketId: formData.get('ticketId'),
                studentName: formData.get('studentName'),
                description: formData.get('description'),
                hours: parseFloat(formData.get('hours')),
                markCompleted: formData.get('markCompleted') === 'on'
            };

            try {
                window.serviceManager.logWBLHours(data);
                alert('✅ Trabajo registrado. Horas sumadas a tu expediente WBL.');
                window.closeModal('wblModal');
                e.target.reset();
                loadTickets();
            } catch (err) {
                console.error(err);
                alert('Error al registrar trabajo');
            }
        });
    }
});

function loadTickets() {
    const list = document.getElementById('ticketList');
    const allTickets = window.serviceManager.data.tickets_soporte || [];

    // Sort: Open first, then by date
    allTickets.sort((a, b) => {
        if (a.status === b.status) return new Date(b.dateCreated) - new Date(a.dateCreated);
        return a.status === 'abierto' ? -1 : 1;
    });

    if (allTickets.length === 0) {
        list.innerHTML = '<p style="text-align: center;">No hay tickets pendientes.</p>';
        return;
    }

    list.innerHTML = allTickets.map(t => `
        <div class="ticket-card ${t.status === 'resuelto' ? 'resolved' : ''}">
            <div>
                <div style="margin-bottom: 5px;">
                    <span class="status-badge ${t.status}">${t.status.toUpperCase()}</span>
                    <strong style="margin-left: 10px;">${t.type}</strong>
                    <span style="color: #999; font-size: 13px;"> - ${new Date(t.dateCreated).toLocaleDateString()}</span>
                </div>
                <div style="font-weight: bold; font-size: 1.1em;">${t.location}</div>
                <div style="color: #666; margin-top: 5px;">${t.description}</div>
                <div style="font-size: 12px; color: #999; margin-top: 5px;">Solicitado por: ${t.requester}</div>
            </div>
            <div>
                ${t.status === 'abierto' ?
            `<button class="btn btn-primary" style="font-size: 13px; padding: 5px 15px;" onclick="openWBLModal('${t.id}')">Atender</button>` :
            '<span style="color: #2ecc71; font-weight: bold;"><i class="fas fa-check"></i></span>'
        }
            </div>
        </div>
    `).join('');
}

window.openWBLModal = (id) => {
    document.getElementById('wblTicketId').value = id;
    document.getElementById('wblModal').style.display = 'flex';
};
