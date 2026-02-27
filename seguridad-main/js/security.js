// Security System - PCB School
// Admin mode and functionality

// Admin state
let isAdmin = false;
const ADMIN_PASSWORD = 'admin123'; // Change this password for security

// Temporary storage for the photo data URL while filling the form
let currentPhoto = null;

// Data storage keys
const ENTRIES_KEY = 'security_entries';
const PROBLEMS_KEY = 'security_problems';

// Load entries from localStorage
function loadEntries() {
  const data = localStorage.getItem(ENTRIES_KEY);
  return data ? JSON.parse(data) : [];
}

// Save entries to localStorage
function saveEntries(entries) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

// Load problems from localStorage
function loadProblems() {
  const data = localStorage.getItem(PROBLEMS_KEY);
  return data ? JSON.parse(data) : [];
}

// Save problems to localStorage
function saveProblems(problems) {
  localStorage.setItem(PROBLEMS_KEY, JSON.stringify(problems));
}

// Show admin panel (called after successful login)
function showAdminPanel() {
  const adminPanel = document.getElementById('adminPanel');
  const securityTabs = document.querySelector('.security-tabs');
  
  if (adminPanel) {
    adminPanel.classList.remove('hidden');
  }
  // Hide tabs while in admin mode
  if (securityTabs) {
    securityTabs.classList.add('hidden');
  }
  showAdminSection('entries');
  updateStats();
}

// Toggle admin mode
function toggleAdminMode() {
  const adminPanel = document.getElementById('adminPanel');
  const securityTabs = document.querySelector('.security-tabs');

  if (isAdmin) {
    // Close admin panel
    if (adminPanel) {
      adminPanel.classList.add('hidden');
    }
    isAdmin = false;
    // Show tabs again
    if (securityTabs) {
      securityTabs.classList.remove('hidden');
    }
    // Show register tab
    showTab('register');
  } else {
    // Hide tabs
    if (securityTabs) {
      securityTabs.classList.add('hidden');
    }
    // Show admin login tab
    showTab('admin');
  }
}

// Admin login
function adminLogin() {
  const passwordInput = document.getElementById('adminPassword');
  const password = passwordInput ? passwordInput.value : '';
  
  if (password === ADMIN_PASSWORD) {
    isAdmin = true;
    
    // Show success message
    const loginForm = document.getElementById('loginForm');
    const adminWelcome = document.getElementById('adminWelcome');
    
    if (loginForm) loginForm.classList.add('hidden');
    if (adminWelcome) adminWelcome.classList.remove('hidden');
    
    // Show admin panel
    setTimeout(() => {
      const adminPanel = document.getElementById('adminPanel');
      if (adminPanel) {
        adminPanel.classList.remove('hidden');
      }
      showAdminSection('entries');
      updateStats();
    }, 500);
  } else {
    alert('Contraseña incorrecta');
    if (passwordInput) passwordInput.value = '';
  }
}

// Show admin section
function showAdminSection(section) {
  const entriesSection = document.getElementById('entriesSection');
  const problemsSection = document.getElementById('problemsSection');
  
  if (section === 'entries') {
    if (entriesSection) entriesSection.classList.remove('hidden');
    if (problemsSection) problemsSection.classList.add('hidden');
    renderEntries();
  } else if (section === 'problems') {
    if (entriesSection) entriesSection.classList.add('hidden');
    if (problemsSection) problemsSection.classList.remove('hidden');
    renderProblems();
  }
}

// Render entries table
function renderEntries() {
  const tbody = document.getElementById('entriesBody');
  if (!tbody) return;
  
  const entries = loadEntries();
  
  if (entries.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--security-text-soft);">No hay registros</td></tr>';
    return;
  }
  
  tbody.innerHTML = entries.map((entry, index) => `
    <tr>
      <td>${entry.name}</td>
      <td>${entry.type}</td>
      <td>${entry.action}</td>
      <td>${entry.time}</td>
      <td>
        <button class="action-btn delete" onclick="deleteEntry(${index})">
          <i class="fas fa-trash"></i> Eliminar
        </button>
      </td>
    </tr>
  `).join('');
}

// Render problems table
function renderProblems() {
  const tbody = document.getElementById('problemsBody');
  if (!tbody) return;
  
  const problems = loadProblems();
  
  if (problems.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: var(--security-text-soft);">No hay problemas reportados</td></tr>';
    return;
  }
  
  tbody.innerHTML = problems.map((problem, index) => `
    <tr>
      <td>${problem.type}</td>
      <td>${problem.location}</td>
      <td>${problem.description}</td>
      <td>${problem.reporter || 'Anónimo'}</td>
      <td>${problem.date}</td>
      <td>
        <span class="status-badge ${problem.resolved ? 'solved' : 'pending'}">
          ${problem.resolved ? '<i class="fas fa-check"></i> Resuelto' : '<i class="fas fa-clock"></i> Pendiente'}
        </span>
      </td>
      <td>
        ${problem.photo ? `<img src="${problem.photo}" class="problem-thumb" onclick="openPhoto(${index})" alt="Foto">` : '-'}
      </td>
      <td>
        ${!problem.resolved ? `<button class="action-btn solve" onclick="resolveProblem(${index})"><i class="fas fa-check"></i> Resolver</button>` : ''}
        <button class="action-btn delete" onclick="deleteProblem(${index})"><i class="fas fa-trash"></i> Eliminar</button>
      </td>
    </tr>
  `).join('');
}

// Delete entry
function deleteEntry(index) {
  if (!confirm('¿Estás seguro de eliminar este registro?')) return;
  
  const entries = loadEntries();
  entries.splice(index, 1);
  saveEntries(entries);
  renderEntries();
  updateStats();
}

// Delete problem
function deleteProblem(index) {
  if (!confirm('¿Estás seguro de eliminar este reporte?')) return;
  
  const problems = loadProblems();
  problems.splice(index, 1);
  saveProblems(problems);
  renderProblems();
  updateStats();
}

// Resolve problem
function resolveProblem(index) {
  const problems = loadProblems();
  problems[index].resolved = true;
  saveProblems(problems);
  renderProblems();
  updateStats();
}

// Clear all entries
function clearEntries() {
  if (!confirm('¿Estás seguro de eliminar TODOS los registros? Esta acción no se puede deshacer.')) return;
  
  localStorage.removeItem(ENTRIES_KEY);
  renderEntries();
  updateStats();
}

// Clear all problems
function clearAllProblems() {
  if (!confirm('¿Estás seguro de eliminar TODOS los problemas reportados? Esta acción no se puede deshacer.')) return;
  
  localStorage.removeItem(PROBLEMS_KEY);
  renderProblems();
  updateStats();
}

// Export entries to CSV
function exportEntries() {
  const entries = loadEntries();
  if (entries.length === 0) {
    alert('No hay registros para exportar');
    return;
  }
  
  let csv = 'Nombre,Tipo,Acción,Hora\n';
  entries.forEach(entry => {
    csv += `"${entry.name}","${entry.type}","${entry.action}","${entry.time}"\n`;
  });
  
  downloadCSV(csv, 'registros_seguridad.csv');
}

// Export problems to CSV
function exportProblems() {
  const problems = loadProblems();
  if (problems.length === 0) {
    alert('No hay problemas para exportar');
    return;
  }
  
  let csv = 'Tipo,Lugar,Descripción,Reportero,Fecha,Estado\n';
  problems.forEach(problem => {
    csv += `"${problem.type}","${problem.location}","${problem.description}","${problem.reporter || 'Anónimo'}","${problem.date}","${problem.resolved ? 'Resuelto' : 'Pendiente'}"\n`;
  });
  
  downloadCSV(csv, 'problemas_seguridad.csv');
}

// Download CSV file
function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// Guest registration
function guestRegister(event) {
  event.preventDefault();
  
  const name = document.getElementById('guestName').value;
  const type = document.getElementById('guestType').value;
  const action = document.getElementById('guestAction').value;
  
  const entry = {
    name: name,
    type: type,
    action: action,
    time: new Date().toLocaleString('es-ES')
  };
  
  const entries = loadEntries();
  entries.push(entry);
  saveEntries(entries);
  
  // Show success message
  const messageDiv = document.getElementById('registerMessage');
  if (messageDiv) {
    messageDiv.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Registro completado exitosamente</div>';
    setTimeout(() => {
      messageDiv.innerHTML = '';
    }, 3000);
  }
  
  // Reset form
  document.getElementById('guestForm').reset();
  updateStats();
}

// Report problem
function reportProblem(event) {
  event.preventDefault();
  
  const type = document.getElementById('problemType').value;
  const location = document.getElementById('problemLocation').value;
  const description = document.getElementById('problemDesc').value;
  const reporter = document.getElementById('problemReporter').value;
  // ensure reporter is provided
  if (!reporter || reporter.trim() === '') {
    alert('Por favor ingresa tu nombre');
    return;
  }
  
  const problem = {
    type: type,
    location: location,
    description: description,
    reporter: reporter,
    date: new Date().toLocaleString('es-ES'),
    resolved: false,
    photo: currentPhoto // may be null if no photo selected
  };
  
  const problems = loadProblems();
  problems.push(problem);
  saveProblems(problems);
  
  // Show success message
  const messageDiv = document.getElementById('problemMessage');
  if (messageDiv) {
    messageDiv.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Reporte enviado exitosamente</div>';
    setTimeout(() => {
      messageDiv.innerHTML = '';
    }, 3000);
  }
  
  // Reset form
  document.getElementById('problemForm').reset();
  document.getElementById('photoPreview').innerHTML = '';
  currentPhoto = null;
  updateStats();
}

// Preview photo
function previewPhoto() {
  const input = document.getElementById('problemPhoto');
  const preview = document.getElementById('photoPreview');
  
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      currentPhoto = e.target.result; // save data URL for later submission
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    }
    reader.readAsDataURL(input.files[0]);
  }
}

// Function to open a problem photo in a new window
function openPhoto(index) {
  const problems = loadProblems();
  const p = problems[index];
  if (p && p.photo) {
    window.open(p.photo, '_blank');
  }
}

// Show tab
function showTab(tabName) {
  // Hide all tabs
  document.getElementById('register-tab').classList.add('hidden');
  document.getElementById('problem-tab').classList.add('hidden');
  document.getElementById('admin-tab').classList.add('hidden');
  
  // Show selected tab
  document.getElementById(tabName + '-tab').classList.remove('hidden');
  
  // Update tab buttons
  document.querySelectorAll('.security-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('data-tab') === tabName) {
      tab.classList.add('active');
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  updateStats();
});
