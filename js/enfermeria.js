/**
 * Enfermeria.js - Manejo del portal de enfermería y registros médicos
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const nurseDashboard = document.getElementById('nurseDashboard');
    const btnLogin = document.getElementById('btnNurseLogin');
    const visitForm = document.getElementById('visitForm');

    // Manejo de Login (Simulado)
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });
    }

    if (visitForm) {
        visitForm.addEventListener('submit', handleVisitSubmit);
    }

    // Verificar si ya está logueado
    if (sessionStorage.getItem('nurse_logged_in') === 'true') {
        nurseDashboard.classList.add('active');
        updateStats();
    }
});

function checkLogin() {
    const pin = document.getElementById('nursePin').value;
    if (pin === '1234') { // PIN Hardcoded para demo
        sessionStorage.setItem('nurse_logged_in', 'true');
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('nurseDashboard').classList.add('active');
        updateStats();
        // Scroll to dashboard
        document.getElementById('nurseDashboard').scrollIntoView({ behavior: 'smooth' });
    } else {
        alert('PIN Incorrecto');
    }
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

function logoutNurse() {
    sessionStorage.removeItem('nurse_logged_in');
    location.reload();
}

function handleVisitSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const visitData = Object.fromEntries(formData.entries());

    try {
        window.serviceManager.registerNurseVisit(visitData);
        alert('✅ Visita registrada correctamente.');
        e.target.reset();
        updateStats();
    } catch (error) {
        console.error(error);
        alert('Error al registrar visita');
    }
}

function updateStats() {
    const stats = window.serviceManager.getNurseStats();

    // Animar números
    animateValue(document.getElementById('statsTotal'), 0, stats.total, 1000);
    animateValue(document.getElementById('statsWeek'), 0, stats.lastWeek, 1000);
}

function generateReport() {
    const stats = window.serviceManager.getNurseStats();
    const reportText = `
    REPORTE DE ENFERMERÍA (Anónimo)
    Fecha: ${new Date().toLocaleDateString()}
    --------------------------------
    Total de visitas históricas: ${stats.total}
    Visitas esta semana: ${stats.lastWeek}
    
    Desglose por Motivo:
    ${JSON.stringify(stats.byType, null, 2)}
    
    Nota: Este reporte no incluye información personal de estudiantes (Ley HIPAA/FERPA).
    `;

    // Simular descarga de PDF/Texto
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte_Enfermeria_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
