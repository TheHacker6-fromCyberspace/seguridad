/**
 * Padres.js - Lógica del portal de padres
 */

document.addEventListener('DOMContentLoaded', () => {
    window.toggleMessageBox = () => {
        const box = document.getElementById('parentMessageBox');
        box.classList.toggle('active');
        if (box.classList.contains('active')) {
            box.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const form = document.getElementById('parentMessageForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                window.serviceManager.sendParentMessage(data);
                alert('✅ Mensaje enviado correctamente. La oficina administrativa ha sido notificada.');
                e.target.reset();
                window.toggleMessageBox();
            } catch (err) {
                console.error(err);
                alert('Error al enviar mensaje');
            }
        });
    }
});
