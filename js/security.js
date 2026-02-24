// Security Registry System - Simple and Easy to Use

var adminMode = false;
var STORAGE_KEY = 'security_entries';
var PROBLEMS_KEY = 'security_problems';
var PWD_KEY = 'security_admin_pwd';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem(PWD_KEY)) {
        localStorage.setItem(PWD_KEY, 'admin123');
    }
});

// Tab switching
function showTab(tabName) {
    var tabs = document.querySelectorAll('.tab');
    var registerTab = document.getElementById('register-tab');
    var problemTab = document.getElementById('problem-tab');
    var adminTab = document.getElementById('admin-tab');
    
    tabs.forEach(function(t) { t.classList.remove('active'); });
    
    if (tabName === 'register') {
        tabs[0].classList.add('active');
        registerTab.classList.remove('hidden');
        problemTab.classList.add('hidden');
        adminTab.classList.add('hidden');
    } else if (tabName === 'problem') {
        tabs[1].classList.add('active');
        registerTab.classList.add('hidden');
        problemTab.classList.remove('hidden');
        adminTab.classList.add('hidden');
    } else {
        tabs[2].classList.add('active');
        registerTab.classList.add('hidden');
        problemTab.classList.add('hidden');
        adminTab.classList.remove('hidden');
    }
}

// Guest Registration
function guestRegister(e) {
    e.preventDefault();
    
    var name = document.getElementById('guestName').value;
    var type = document.getElementById('guestType').value;
    var action = document.getElementById('guestAction').value;
    
    var entries = loadEntries();
    entries.push({
        id: Date.now(),
        name: name,
        type: type,
        action: action,
        time: new Date().toLocaleString()
    });
    
    saveEntries(entries);
    
    // Show success
    var msg = document.getElementById('registerMessage');
    msg.innerHTML = '<p class="success">✅ ¡Registro exitoso! ' + action + ' registrada a las ' + new Date().toLocaleTimeString() + '</p>';
    
    // Reset form
    document.getElementById('guestForm').reset();
    
    // Auto-hide message after 5 seconds
    setTimeout(function() { msg.innerHTML = ''; }, 5000);
}

// Report Problem
function reportProblem(e) {
    e.preventDefault();
    
    var type = document.getElementById('problemType').value;
    var location = document.getElementById('problemLocation').value;
    var desc = document.getElementById('problemDesc').value;
    var reporter = document.getElementById('problemReporter').value || 'Anónimo';
    var photoInput = document.getElementById('problemPhoto');
    
    var photoData = '';
    if (photoInput.files && photoInput.files[0]) {
        var file = photoInput.files[0];
        // Check file size (limit to 1MB for localStorage)
        if (file.size > 1000000) {
            alert('La foto es muy grande. Máximo 1MB.');
            return;
        }
        var reader = new FileReader();
        reader.onload = function(evt) {
            saveProblemWithPhoto(type, location, desc, reporter, evt.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        saveProblemWithPhoto(type, location, desc, reporter, '');
    }
}

function saveProblemWithPhoto(type, location, desc, reporter, photoData) {
    var problems = loadProblems();
    problems.push({
        id: Date.now(),
        type: type,
        location: location,
        description: desc,
        reporter: reporter,
        photo: photoData,
        date: new Date().toLocaleString()
    });
    
    saveProblems(problems);
    
    // Show success
    var msg = document.getElementById('problemMessage');
    msg.innerHTML = '<p class="success">✅ ¡Reporte enviado! Gracias por tu colaboración.</p>';
    
    // Reset form
    document.getElementById('problemForm').reset();
    document.getElementById('photoPreview').innerHTML = '';
    
    // Auto-hide message after 5 seconds
    setTimeout(function() { msg.innerHTML = ''; }, 5000);
}

function previewPhoto() {
    var input = document.getElementById('problemPhoto');
    var preview = document.getElementById('photoPreview');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = '<img src="' + e.target.result + '" style="max-width:200px;max-height:150px;border-radius:8px;">' +
                ' <button type="button" onclick="clearPhoto()" style="background:#dc3545;padding:5px 10px;margin-left:10px;">✕ Quitar</button>';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function clearPhoto() {
    document.getElementById('problemPhoto').value = '';
    document.getElementById('photoPreview').innerHTML = '';
}

window.previewPhoto = previewPhoto;
window.clearPhoto = clearPhoto;

// Admin Functions
function adminLogin() {
    var password = document.getElementById('adminPassword').value;
    if (password === localStorage.getItem(PWD_KEY)) {
        adminMode = true;
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        loadEntriesForAdmin();
        loadProblemsForAdmin();
    } else {
        alert('❌ Contraseña incorrecta');
    }
}

function adminLogout() {
    adminMode = false;
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('adminPassword').value = '';
}

function showAdminSection(section) {
    if (section === 'entries') {
        document.getElementById('entriesSection').classList.remove('hidden');
        document.getElementById('problemsSection').classList.add('hidden');
    } else {
        document.getElementById('entriesSection').classList.add('hidden');
        document.getElementById('problemsSection').classList.remove('hidden');
    }
}

// Data Functions
function loadEntries() {
    var data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function loadProblems() {
    var data = localStorage.getItem(PROBLEMS_KEY);
    return data ? JSON.parse(data) : [];
}

function saveProblems(problems) {
    localStorage.setItem(PROBLEMS_KEY, JSON.stringify(problems));
}

function loadEntriesForAdmin() {
    var entries = loadEntries();
    entries.reverse();
    var tbody = document.getElementById('entriesBody');
    
    if (entries.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay registros</td></tr>';
        return;
    }
    
    tbody.innerHTML = entries.map(function(e) {
        return '<tr>' +
            '<td>' + e.name + '</td>' +
            '<td>' + e.type + '</td>' +
            '<td>' + e.action + '</td>' +
            '<td>' + e.time + '</td>' +
            '<td><button onclick="deleteEntry(' + e.id + ')" style="background:#dc3545;padding:5px 10px;">🗑️</button></td>' +
        '</tr>';
    }).join('');
}

function loadProblemsForAdmin() {
    var problems = loadProblems();
    problems.reverse();
    var tbody = document.getElementById('problemsBody');
    
    if (problems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No hay problemas reportados</td></tr>';
        return;
    }
    
    tbody.innerHTML = problems.map(function(p) {
        var status = p.resolved ? '<span style="color:green;font-weight:bold;">✅ Resuelto</span>' : '<span style="color:red;font-weight:bold;">⏳ Pendiente</span>';
        var photoBtn = p.photo ? '<button onclick="viewProblemPhoto(' + p.id + ')" style="background:#17a2b8;padding:5px 10px;margin-right:5px;">📷</button>' : '<span style="color:#999;">-</span>';
        return '<tr>' +
            '<td>' + p.type + '</td>' +
            '<td>' + p.location + '</td>' +
            '<td>' + p.description + '</td>' +
            '<td>' + p.reporter + '</td>' +
            '<td>' + p.date + '</td>' +
            '<td>' + status + '</td>' +
            '<td>' + photoBtn + '</td>' +
            '<td>' +
                (p.resolved ? '' : '<button onclick="markProblemDone(' + p.id + ')" style="background:#28a745;padding:5px 10px;margin-right:5px;">✅</button>') +
                '<button onclick="deleteProblem(' + p.id + ')" style="background:#dc3545;padding:5px 10px;">🗑️</button>' +
            '</td>' +
        '</tr>';
    }).join('');
}

function viewProblemPhoto(id) {
    var problems = loadProblems();
    var problem = problems.find(function(p) { return p.id === id; });
    if (problem && problem.photo) {
        var win = window.open('','_blank');
        win.document.write('<html><head><title>Foto del Problema</title></head><body style="margin:0;padding:20px;text-align:center;background:#f5f5f5;">' +
            '<h2>' + problem.type + ' - ' + problem.location + '</h2>' +
            '<p>' + problem.description + '</p>' +
            '<img src="' + problem.photo + '" style="max-width:100%;max-height:80vh;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.3);">' +
            '</body></html>');
    }
}

window.viewProblemPhoto = viewProblemPhoto;

function markProblemDone(id) {
    var problems = loadProblems();
    problems.forEach(function(p) {
        if (p.id === id) {
            p.resolved = true;
            p.resolvedAt = new Date().toLocaleString();
        }
    });
    saveProblems(problems);
    loadProblemsForAdmin();
}

function deleteEntry(id) {
    if (!confirm('¿Eliminar este registro?')) return;
    var entries = loadEntries();
    entries = entries.filter(function(e) { return e.id !== id; });
    saveEntries(entries);
    loadEntriesForAdmin();
}

function deleteProblem(id) {
    if (!confirm('¿Eliminar este problema?')) return;
    var problems = loadProblems();
    problems = problems.filter(function(p) { return p.id !== id; });
    saveProblems(problems);
    loadProblemsForAdmin();
}

function clearEntries() {
    if (!confirm('¿Borrar TODOS los registros?')) return;
    saveEntries([]);
    loadEntriesForAdmin();
}

function exportEntries() {
    var entries = loadEntries();
    if (entries.length === 0) { alert('No hay datos'); return; }
    
    var csv = 'Nombre,Tipo,Accion,Hora\n';
    entries.forEach(function(e) {
        csv += '"' + e.name + '","' + e.type + '","' + e.action + '","' + e.time + '"\n';
    });
    
    downloadCSV(csv, 'registros.csv');
}

function exportProblems() {
    var problems = loadProblems();
    if (problems.length === 0) { alert('No hay datos'); return; }
    
    var csv = 'Tipo,Lugar,Descripcion,Reportero,Fecha,Estado,Resuelto\n';
    problems.forEach(function(p) {
        var estado = p.resolved ? 'Resuelto' : 'Pendiente';
        var resuelto = p.resolvedAt || '';
        csv += '"' + p.type + '","' + p.location + '","' + p.description + '","' + p.reporter + '","' + p.date + '","' + estado + '","' + resuelto + '"\n';
    });
    
    downloadCSV(csv, 'problemas.csv');
}

function downloadCSV(content, filename) {
    var blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Make functions global
window.showTab = showTab;
window.guestRegister = guestRegister;
window.reportProblem = reportProblem;
window.previewPhoto = previewPhoto;
window.adminLogin = adminLogin;
window.adminLogout = adminLogout;
window.showAdminSection = showAdminSection;
window.deleteEntry = deleteEntry;
window.deleteProblem = deleteProblem;
window.markProblemDone = markProblemDone;
window.clearEntries = clearEntries;
window.exportEntries = exportEntries;
window.exportProblems = exportProblems;
