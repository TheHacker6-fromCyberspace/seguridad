/**
 * Matricula.js - Lógica del wizard de matrícula y recomendación IA
 */

document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 4;
    const form = document.getElementById('enrollmentForm');
    const btnNext = document.getElementById('btnNext');
    const btnPrev = document.getElementById('btnPrev');
    const btnSubmit = document.getElementById('btnSubmit');

    // Navigation Handlers
    btnNext.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateUI();
            }
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    form.addEventListener('submit', handleFormSubmit);

    function updateUI() {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
        // Show current step
        document.getElementById(`step-${currentStep}`).classList.add('active');

        // Update progress indicators
        document.querySelectorAll('.step-item').forEach((item, index) => {
            const stepNum = index + 1;
            item.classList.remove('active', 'completed');
            if (stepNum === currentStep) {
                item.classList.add('active');
            } else if (stepNum < currentStep) {
                item.classList.add('completed');
            }
        });

        // Button states
        btnPrev.style.visibility = currentStep === 1 ? 'hidden' : 'visible';

        if (currentStep === totalSteps) {
            btnNext.style.display = 'none';
            btnSubmit.style.display = 'block';
        } else {
            btnNext.style.display = 'block';
            btnSubmit.style.display = 'none';
        }

        window.scrollTo(0, 0);
    }

    function validateStep(step) {
        if (step === 1) {
            const name = form.querySelector('[name="fullName"]').value;
            const gpa = form.querySelector('[name="gpa"]').value;
            if (!name || !gpa) {
                alert('Por favor complete todos los campos requeridos.');
                return false;
            }
        }
        if (step === 3) {
            const specialty = document.getElementById('selectedSpecialtyInput').value;
            if (!specialty) {
                alert('Debe seleccionar una especialidad para continuar.');
                return false;
            }
        }
        return true;
    }
});

// AI Recommendation Logic
function generateAIRecommendation() {
    const hobby = document.getElementById('interest-hobbies').value;
    const subject = document.getElementById('interest-subject').value;
    const work = document.getElementById('interest-work').value;

    // Algoritmo simple de recomendación (Simulando IA)
    let recommendation = '';
    let reason = '';
    let targetSpecialty = '';

    if (hobby === 'tech' || work === 'office' || subject === 'math') {
        recommendation = 'Sistemas de Oficina y Tecnología';
        targetSpecialty = 'sistemas_oficina';
        reason = 'Tus intereses en tecnología y ambientes estructurados coinciden con el perfil de un programador o especialista en datos.';
    } else if (hobby === 'health' || work === 'hospital' || subject === 'science') {
        recommendation = 'Enfermería Práctica';
        targetSpecialty = 'enfermeria';
        reason = 'Tu vocación de servicio y gusto por prevenir/curar hacen de la salud tu campo ideal.';
    } else if (hobby === 'hands' || work === 'field') {
        recommendation = 'Artes Culinarias (o Talleres Técnicos)';
        targetSpecialty = 'artes_culinarias';
        reason = 'Disfrutas crear con tus manos y ver resultados tangibles inmediato.';
    } else {
        recommendation = 'Contabilidad';
        targetSpecialty = 'contabilidad';
        reason = 'El análisis, el orden y la estructura son tus fortalezas.';
    }

    // Mostrar resultado con animación
    const container = document.getElementById('ai-results-container');
    const message = document.getElementById('ai-message');

    container.style.display = 'none';
    setTimeout(() => {
        message.innerHTML = `<strong>Recomendación: ${recommendation}</strong><br>${reason}`;
        container.style.display = 'block';

        // Auto-scroll to result
        container.scrollIntoView({ behavior: 'smooth' });

        // Highlight recommended card
        document.querySelectorAll('.card-option').forEach(card => card.style.border = '2px solid #e0e0e0');
        // Find card to highlight (simple implementation)
        // In real app, match by ID
    }, 300);

    // Mover al siguiente paso automáticamente después de leer
    // setTimeout(() => document.getElementById('btnNext').click(), 4000);
}

// Specialty Selection
function selectSpecialty(card, value) {
    // Visually update cards
    document.querySelectorAll('.card-option').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    // Update hidden input
    document.getElementById('selectedSpecialtyInput').value = value;
}

// Form Submission
function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const enrollmentData = Object.fromEntries(formData.entries());

    // Call ServiceManager
    try {
        const result = window.serviceManager.createEnrollment(enrollmentData);
        alert(`¡Felicitaciones ${result.fullName}!\n\nTu pre-matrícula ha sido enviada.\nID: ${result.id}\n\nTe contactaremos pronto.`);
        window.location.href = 'index.html';
    } catch (error) {
        console.error(error);
        alert('Error al procesar la matrícula.');
    }
}
