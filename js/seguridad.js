/**
 * Seguridad.js - Control de acceso e incidentes
 * Enhanced with statistics, search, filter, quick actions, and admin mode
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize features
    initDateTime();
    loadActiveVisits();
    updateStats();
    initSearch();
    initFilters();
    initQuickReport();
    initDirectorReport();
    initEvidencePreview();
    initAdminPanel();

    // Visitor Check-In
    const visitorForm = document.getElementById('visitorForm');
    if (visitorForm) {
        visitorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                window.serviceManager.registerVisitor(data);
                showAlert('✅ Entrada registrada correctamente.', 'success');
                e.target.reset();
                loadActiveVisits();
                updateStats();
                loadAdminRegistry();
            } catch (err) {
                console.error(err);
                showAlert('Error al registrar visita', 'danger');
            }
        });
    }

    // Incident Report
    const incidentForm = document.getElementById('incidentForm');
    if (incidentForm) {
        incidentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                window.serviceManager.reportIncident(data);
                showAlert('⚠️ Incidente reportado. Se ha notificado a la administración.', 'warning');
                e.target.reset();
                updateStats();
                loadAdminRegistry();
            } catch (err) {
                console.error(err);
                showAlert('Error al reportar incidente', 'danger');
            }
        });
    }
});

// Initialize date/time display
function initDateTime() {
    const updateTime = () => {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit'
        };
        const dateTimeStr = now.toLocaleDateString('es-ES', options);
        const element = document.getElementById('currentDateTime');
        if (element) {
            element.textContent = dateTimeStr;
        }
    };
    
    updateTime();
    setInterval(updateTime, 60000);
}

// Update statistics dashboard
function updateStats() {
    try {
        // Ensure serviceManager and data exist
        if (!window.serviceManager || !window.serviceManager.data) {
            console.error('ServiceManager not initialized');
            return;
        }
        
        // Initialize data arrays if they don't exist
        if (!window.serviceManager.data.seguridad_visitas) {
            const savedVisits = localStorage.getItem('seguridad_visitas');
            window.serviceManager.data.seguridad_visitas = savedVisits ? JSON.parse(savedVisits) : [];
        }
        if (!window.serviceManager.data.seguridad_reportes) {
            const savedReports = localStorage.getItem('seguridad_reportes');
            window.serviceManager.data.seguridad_reportes = savedReports ? JSON.parse(savedReports) : [];
        }
        if (!window.serviceManager.data.seguridad_incidentes) {
            const savedIncidents = localStorage.getItem('seguridad_incidentes');
            window.serviceManager.data.seguridad_incidentes = savedIncidents ? JSON.parse(savedIncidents) : [];
        }
        
        const data = window.serviceManager.data;
        const today = new Date().toDateString();
        
        const visits = data.seguridad_visitas || [];
        const todayVisits = visits.filter(v => new Date(v.checkIn).toDateString() === today);
        
        document.getElementById('statTotalVisits').textContent = todayVisits.length;
        
        const activeVisits = visits.filter(v => v.status === 'active');
        document.getElementById('statActiveVisits').textContent = activeVisits.length;
        
        const incidents = data.seguridad_incidentes || [];
        document.getElementById('statIncidents').textContent = incidents.length;
        
        const reports = data.seguridad_reportes || [];
        document.getElementById('statReports').textContent = reports.length;
    } catch (err) {
        console.log('Stats update error:', err);
    }
}

// Load active visits with enhanced display
function loadActiveVisits(filter = 'all', searchTerm = '') {
    // Ensure serviceManager and data exist
    if (!window.serviceManager || !window.serviceManager.data) {
        console.error('ServiceManager not initialized');
        return;
    }
    
    // Initialize data arrays if they don't exist
    if (!window.serviceManager.data.seguridad_visitas) {
        const savedVisits = localStorage.getItem('seguridad_visitas');
        window.serviceManager.data.seguridad_visitas = savedVisits ? JSON.parse(savedVisits) : [];
    }
    
    const list = document.getElementById('activeLog');
    const logs = window.serviceManager.data.seguridad_visitas || [];
    let active = logs.filter(v => v.status === 'active');
    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        active = active.filter(v => 
            v.name.toLowerCase().includes(term) || 
            v.reason.toLowerCase().includes(term)
        );
    }
    
    if (filter !== 'all') {
        active = active.filter(v => {
            const reason = v.reason.toLowerCase();
            switch(filter) {
                case 'administrative':
                    return reason.includes('reunión administrativa') || reason.includes('administrativa');
                case 'maestro':
                    return reason.includes('maestro') || reason.includes('profesor');
                case 'padre':
                    return reason.includes('padre') || reason.includes('encargado') || reason.includes('madre');
                default:
                    return true;
            }
        });
    }

    if (active.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users-slash"></i>
                <p>${searchTerm || filter !== 'all' ? 'No se encontraron visitas que coincidan con los filtros.' : 'No hay visitas activas en el plantel.'}</p>
            </div>
        `;
        return;
    }

    list.innerHTML = active.map(v => {
        const checkInTime = new Date(v.checkIn);
        const now = new Date();
        const durationMs = now - checkInTime;
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        const durationStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        
        return `
            <div class="visit-item">
                <div class="visit-info">
                    <div class="visit-name">${escapeHtml(v.name)}</div>
                    <div class="visit-details">
                        <span class="visit-badge checkin">
                            <i class="fas fa-sign-in-alt"></i> ${checkInTime.toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}
                        </span>
                        <span class="visit-badge duration">
                            <i class="fas fa-clock"></i> ${durationStr}
                        </span>
                        <span>${escapeHtml(v.reason)}</span>
                        <span style="color: var(--security-text-muted);">• ID: **${escapeHtml(v.idNumber.slice(-4))}</span>
                    </div>
                </div>
                <button class="security-btn security-btn-success" style="padding: 8px 16px; font-size: 0.85rem;" onclick="checkout('${v.id}')">
                    <i class="fas fa-sign-out-alt"></i> Salida
                </button>
            </div>
        `;
    }).join('');
}

window.checkout = (id) => {
    if (confirm('¿Confirmar salida del visitante?')) {
        window.serviceManager.checkoutVisitor(id);
        loadActiveVisits();
        updateStats();
        loadAdminRegistry();
    }
};

function initSearch() {
    const searchInput = document.getElementById('visitSearch');
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const activeTab = document.querySelector('.filter-tab.active');
                const filter = activeTab ? activeTab.dataset.filter : 'all';
                loadActiveVisits(filter, e.target.value);
            }, 300);
        });
    }
}

function initFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const searchInput = document.getElementById('visitSearch');
            const searchTerm = searchInput ? searchInput.value : '';
            loadActiveVisits(tab.dataset.filter, searchTerm);
        });
    });
}

function quickReport(type) {
    const select = document.getElementById('situationTypeSelect');
    if (select) {
        select.value = type;
        document.querySelector('.director-report-section').scrollIntoView({behavior: 'smooth'});
    }
}

function initDirectorReport() {
    const form = document.getElementById('directorReportForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Handle file upload - convert to base64
            const evidenceFile = document.getElementById('evidenceFile');
            let evidenceData = null;
            
            if (evidenceFile && evidenceFile.files && evidenceFile.files[0]) {
                try {
                    evidenceData = await fileToBase64(evidenceFile.files[0]);
                } catch (err) {
                    console.error('Error converting file:', err);
                }
            }
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            // Add evidence data
            if (evidenceData) {
                data.evidence = evidenceData;
                data.evidenceType = evidenceFile.files[0].type;
                data.evidenceName = evidenceFile.files[0].name;
            }
            
            try {
                if (window.serviceManager && window.serviceManager.data) {
                    if (!window.serviceManager.data.seguridad_reportes) {
                        window.serviceManager.data.seguridad_reportes = [];
                    }
                    window.serviceManager.data.seguridad_reportes.push({
                        id: Date.now().toString(),
                        ...data,
                        dateTime: new Date().toISOString(),
                        status: 'received'
                    });
                    
                    localStorage.setItem('seguridad_reportes', JSON.stringify(window.serviceManager.data.seguridad_reportes));
                }
                
                showAlert('✅ Reporte confidencial enviado exitosamente. Gracias por tu colaboración.', 'success');
                e.target.reset();
                updateStats();
                loadAdminRegistry();
            } catch (err) {
                console.error(err);
                showAlert('Error al enviar el reporte', 'danger');
            }
        });
    }
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Preview uploaded file
function initEvidencePreview() {
    const evidenceFile = document.getElementById('evidenceFile');
    if (evidenceFile) {
        evidenceFile.addEventListener('change', async function(e) {
            const file = this.files[0];
            if (!file) return;
            
            // Create or update preview container
            let previewContainer = document.getElementById('evidencePreview');
            if (!previewContainer) {
                previewContainer = document.createElement('div');
                previewContainer.id = 'evidencePreview';
                previewContainer.className = 'evidence-preview';
                this.parentElement.parentElement.appendChild(previewContainer);
            }
            
            if (file.type.startsWith('image/')) {
                // Show image preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewContainer.innerHTML = `
                        <img src="${e.target.result}" alt="Vista previa" class="evidence-preview-img">
                        <button type="button" class="evidence-preview-remove" onclick="removeEvidencePreview()">
                            <i class="fas fa-times"></i> Eliminar
                        </button>
                        <p class="evidence-preview-name">${file.name}</p>
                    `;
                    previewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('video/')) {
                // Show video preview
                previewContainer.innerHTML = `
                    <video src="${URL.createObjectURL(file)}" controls class="evidence-preview-video"></video>
                    <button type="button" class="evidence-preview-remove" onclick="removeEvidencePreview()">
                        <i class="fas fa-times"></i> Eliminar
                    </button>
                    <p class="evidence-preview-name">${file.name}</p>
                `;
                previewContainer.style.display = 'block';
            }
        });
    }
}

window.removeEvidencePreview = function() {
    const evidenceFile = document.getElementById('evidenceFile');
    if (evidenceFile) {
        evidenceFile.value = '';
    }
    const previewContainer = document.getElementById('evidencePreview');
    if (previewContainer) {
        previewContainer.style.display = 'none';
        previewContainer.innerHTML = '';
    }
};

// ============================================
// ADMIN PANEL FUNCTIONS
// ============================================

function initAdminPanel() {
    // Entry type change handler
    const entryType = document.getElementById('entryType');
    if (entryType) {
        entryType.addEventListener('change', (e) => {
            document.getElementById('visitFields').style.display = e.target.value === 'visit' ? 'block' : 'none';
            document.getElementById('incidentFields').style.display = e.target.value === 'incident' ? 'block' : 'none';
            document.getElementById('reportFields').style.display = e.target.value === 'report' ? 'block' : 'none';
        });
    }
    
    // Add entry form
    const addForm = document.getElementById('adminAddEntryForm');
    if (addForm) {
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = document.getElementById('entryType').value;
            
            try {
                if (type === 'visit') {
                    const data = {
                        name: document.getElementById('newVisitName').value,
                        reason: document.getElementById('newVisitReason').value,
                        idNumber: document.getElementById('newVisitId').value || '0000',
                        checkIn: new Date().toISOString(),
                        status: 'active'
                    };
                    window.serviceManager.registerVisitor(data);
                    showAlert('✅ Visita agregada correctamente.', 'success');
                } else if (type === 'incident') {
                    const data = {
                        type: document.getElementById('newIncidentType').value,
                        description: document.getElementById('newIncidentDesc').value,
                        location: document.getElementById('newIncidentLocation').value,
                        dateTime: new Date().toISOString()
                    };
                    if (!window.serviceManager.data.seguridad_incidentes) {
                        window.serviceManager.data.seguridad_incidentes = [];
                    }
                    window.serviceManager.data.seguridad_incidentes.push({
                        id: Date.now().toString(),
                        ...data
                    });
                    localStorage.setItem('seguridad_incidentes', JSON.stringify(window.serviceManager.data.seguridad_incidentes));
                    showAlert('✅ Incidente agregado correctamente.', 'success');
                } else if (type === 'report') {
                    const data = {
                        situationType: document.getElementById('newReportType').value,
                        details: document.getElementById('newReportDesc').value,
                        contactInfo: document.getElementById('newReportContact').value,
                        dateTime: new Date().toISOString(),
                        status: 'received'
                    };
                    if (!window.serviceManager.data.seguridad_reportes) {
                        window.serviceManager.data.seguridad_reportes = [];
                    }
                    window.serviceManager.data.seguridad_reportes.push({
                        id: Date.now().toString(),
                        ...data
                    });
                    localStorage.setItem('seguridad_reportes', JSON.stringify(window.serviceManager.data.seguridad_reportes));
                    showAlert('✅ Reporte agregado correctamente.', 'success');
                }
                
                e.target.reset();
                updateStats();
                loadAdminRegistry();
                loadAllEntries();
            } catch (err) {
                console.error(err);
                showAlert('Error al agregar entrada', 'danger');
            }
        });
    }
    
    // Load initial data
    loadAdminRegistry();
    loadAllEntries();
}

window.toggleAdminMode = function() {
    const panel = document.getElementById('adminPanel');
    const btn = document.getElementById('adminToggleBtn');
    
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-times"></i> Cerrar Admin';
        loadAdminRegistry();
        loadAllEntries();
    } else {
        panel.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-cog"></i> Admin';
    }
};

window.switchAdminTab = function(tabName) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById('admin' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.add('active');
    
    // Load problems data when Problems tab is selected
    if (tabName === 'problems') {
        loadProblemsTab();
    }
};

function loadAdminRegistry() {
    try {
        // Ensure serviceManager and data exist
        if (!window.serviceManager || !window.serviceManager.data) {
            console.error('ServiceManager not initialized');
            return;
        }
        
        // Initialize data arrays if they don't exist
        if (!window.serviceManager.data.seguridad_visitas) {
            window.serviceManager.data.seguridad_visitas = [];
        }
        if (!window.serviceManager.data.seguridad_reportes) {
            // Try to load from localStorage
            const savedReports = localStorage.getItem('seguridad_reportes');
            window.serviceManager.data.seguridad_reportes = savedReports ? JSON.parse(savedReports) : [];
        }
        if (!window.serviceManager.data.seguridad_incidentes) {
            // Try to load from localStorage
            const savedIncidents = localStorage.getItem('seguridad_incidentes');
            window.serviceManager.data.seguridad_incidentes = savedIncidents ? JSON.parse(savedIncidents) : [];
        }
        
        const data = window.serviceManager.data;
        
        // Load visits
        const visits = data.seguridad_visitas || [];
        const visitsBody = document.getElementById('visitsTableBody');
        if (visitsBody) {
            visitsBody.innerHTML = visits.map(v => `
                <tr>
                    <td>${escapeHtml(v.name)}</td>
                    <td>${escapeHtml(v.reason)}</td>
                    <td>**${escapeHtml(v.idNumber ? v.idNumber.slice(-4) : '----')}</td>
                    <td>${new Date(v.checkIn).toLocaleString('es-ES')}</td>
                    <td>${v.checkOut ? new Date(v.checkOut).toLocaleString('es-ES') : '-'}</td>
                    <td><span class="status-badge ${v.status}">${v.status === 'active' ? 'Activa' : 'Completada'}</span></td>
                </tr>
            `).join('') || '<tr><td colspan="6" style="text-align: center; color: var(--security-text-muted);">No hay registros</td></tr>';
        }
        
        // Load incidents
        const incidents = data.seguridad_incidentes || [];
        const incidentsBody = document.getElementById('incidentsTableBody');
        if (incidentsBody) {
            incidentsBody.innerHTML = incidents.map(i => `
                <tr>
                    <td>${escapeHtml(i.type)}</td>
                    <td>${escapeHtml(i.description || '').substring(0, 50)}${(i.description || '').length > 50 ? '...' : ''}</td>
                    <td>${escapeHtml(i.location || '-')}</td>
                    <td>${new Date(i.dateTime || i.checkIn).toLocaleString('es-ES')}</td>
                    <td class="actions">
                        <button class="btn-edit" onclick="editEntry('incident', '${i.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn-delete" onclick="deleteEntry('incident', '${i.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('') || '<tr><td colspan="5" style="text-align: center; color: var(--security-text-muted);">No hay incidentes</td></tr>';
        }
        
        // Load reports
        const reports = data.seguridad_reportes || [];
        const reportsBody = document.getElementById('reportsTableBody');
        if (reportsBody) {
            reportsBody.innerHTML = reports.map(r => `
                <tr>
                    <td>${escapeHtml(r.situationType || r.type || '')}</td>
                    <td>${escapeHtml(r.details || r.description || '').substring(0, 50)}${(r.details || r.description || '').length > 50 ? '...' : ''}</td>
                    <td>${new Date(r.dateTime).toLocaleString('es-ES')}</td>
                    <td>${escapeHtml(r.contactInfo || '-')}</td>
                    <td class="actions">
                        ${r.evidence ? `<button class="btn-view" onclick="viewEvidence('${r.id}')" title="Ver evidencia"><i class="fas fa-image"></i></button>` : ''}
                        <button class="btn-edit" onclick="editEntry('report', '${r.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn-delete" onclick="deleteEntry('report', '${r.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('') || '<tr><td colspan="5" style="text-align: center; color: var(--security-text-muted);">No hay reportes</td></tr>';
        }
    } catch (err) {
        console.error('Error loading admin registry:', err);
    }
}

function loadAllEntries() {
    try {
        // Initialize data arrays if they don't exist
        if (!window.serviceManager.data.seguridad_visitas) {
            const savedVisits = localStorage.getItem('seguridad_visitas');
            window.serviceManager.data.seguridad_visitas = savedVisits ? JSON.parse(savedVisits) : [];
        }
        if (!window.serviceManager.data.seguridad_incidentes) {
            const savedIncidents = localStorage.getItem('seguridad_incidentes');
            window.serviceManager.data.seguridad_incidentes = savedIncidents ? JSON.parse(savedIncidents) : [];
        }
        if (!window.serviceManager.data.seguridad_reportes) {
            const savedReports = localStorage.getItem('seguridad_reportes');
            window.serviceManager.data.seguridad_reportes = savedReports ? JSON.parse(savedReports) : [];
        }
        
        const data = window.serviceManager.data;
        const entries = [];
        
        // Add visits
        (data.seguridad_visitas || []).forEach(v => {
            entries.push({
                type: 'visit',
                id: v.id,
                name: v.name,
                details: v.reason,
                date: v.checkIn
            });
        });
        
        // Add incidents
        (data.seguridad_incidentes || []).forEach(i => {
            entries.push({
                type: 'incident',
                id: i.id,
                name: i.type,
                details: (i.description || '').substring(0, 80),
                date: i.dateTime || i.checkIn
            });
        });
        
        // Add reports
        (data.seguridad_reportes || []).forEach(r => {
            entries.push({
                type: 'report',
                id: r.id,
                name: r.situationType || r.type,
                details: (r.details || r.description || '').substring(0, 80),
                date: r.dateTime
            });
        });
        
        // Sort by date (newest first)
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const tbody = document.getElementById('allEntriesTableBody');
        if (tbody) {
            tbody.innerHTML = entries.map(e => `
                <tr>
                    <td><span class="status-badge ${e.type === 'visit' ? 'active' : e.type === 'incident' ? 'completed' : 'received'}">${e.type === 'visit' ? 'Visita' : e.type === 'incident' ? 'Incidente' : 'Reporte'}</span></td>
                    <td>${escapeHtml(e.name)}</td>
                    <td>${escapeHtml(e.details)}</td>
                    <td>${new Date(e.date).toLocaleString('es-ES')}</td>
                    <td class="actions">
                        <button class="btn-edit" onclick="editEntry('${e.type}', '${e.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn-delete" onclick="deleteEntry('${e.type}', '${e.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('') || '<tr><td colspan="5" style="text-align: center; color: var(--security-text-muted);">No hay entradas</td></tr>';
        }
    } catch (err) {
        console.error('Error loading all entries:', err);
    }
}

window.editEntry = function(type, id) {
    const data = window.serviceManager.data;
    let entry = null;
    let list = null;
    
    if (type === 'visit') {
        list = data.seguridad_visitas;
    } else if (type === 'incident') {
        list = data.seguridad_incidentes;
    } else if (type === 'report') {
        list = data.seguridad_reportes;
    }
    
    if (list) {
        entry = list.find(item => item.id === id);
    }
    
    if (!entry) {
        showAlert('Entrada no encontrada', 'danger');
        return;
    }
    
    const newValue = prompt(`Editar ${type === 'visit' ? 'nombre' : 'descripción'}:`, 
        type === 'visit' ? entry.name : (entry.description || entry.details || entry.type));
    
    if (newValue !== null) {
        if (type === 'visit') {
            entry.name = newValue;
        } else if (type === 'incident') {
            entry.description = newValue;
        } else if (type === 'report') {
            entry.details = newValue;
        }
        
        // Save to localStorage
        if (type === 'visit') {
            localStorage.setItem('seguridad_visitas', JSON.stringify(data.seguridad_visitas));
        } else if (type === 'incident') {
            localStorage.setItem('seguridad_incidentes', JSON.stringify(data.seguridad_incidentes));
        } else if (type === 'report') {
            localStorage.setItem('seguridad_reportes', JSON.stringify(data.seguridad_reportes));
        }
        
        loadAdminRegistry();
        loadAllEntries();
        loadActiveVisits();
        showAlert('✅ Entrada actualizada correctamente.', 'success');
    }
};

window.deleteEntry = function(type, id) {
    if (!confirm('¿Está seguro de que desea eliminar esta entrada?')) {
        return;
    }
    
    const data = window.serviceManager.data;
    
    if (type === 'visit') {
        data.seguridad_visitas = (data.seguridad_visitas || []).filter(v => v.id !== id);
        localStorage.setItem('seguridad_visitas', JSON.stringify(data.seguridad_visitas));
    } else if (type === 'incident') {
        data.seguridad_incidentes = (data.seguridad_incidentes || []).filter(i => i.id !== id);
        localStorage.setItem('seguridad_incidentes', JSON.stringify(data.seguridad_incidentes));
    } else if (type === 'report') {
        data.seguridad_reportes = (data.seguridad_reportes || []).filter(r => r.id !== id);
        localStorage.setItem('seguridad_reportes', JSON.stringify(data.seguridad_reportes));
    }
    
    loadAdminRegistry();
    loadAllEntries();
    loadActiveVisits();
    updateStats();
    showAlert('✅ Entrada eliminada correctamente.', 'success');
};

// Color Editor Functions
window.updateColor = function(colorName, value) {
    document.getElementById('color' + colorName.charAt(0).toUpperCase() + colorName.slice(1) + 'Text').value = value;
    document.getElementById('color' + colorName.charAt(0).toUpperCase() + colorName.slice(1)).value = value;
    
    // Apply preview immediately
    const root = document.documentElement;
    switch(colorName) {
        case 'primary': root.style.setProperty('--security-primary', value); break;
        case 'secondary': root.style.setProperty('--security-secondary', value); break;
        case 'accent': root.style.setProperty('--security-accent', value); break;
        case 'success': root.style.setProperty('--security-success', value); break;
        case 'danger': root.style.setProperty('--security-danger', value); break;
        case 'warning': root.style.setProperty('--security-warning', value); break;
        case 'bg': root.style.setProperty('--security-bg', value); break;
        case 'text': root.style.setProperty('--security-text', value); break;
    }
};

window.applyColorChanges = function() {
    const colors = {
        primary: document.getElementById('colorPrimary').value,
        secondary: document.getElementById('colorSecondary').value,
        accent: document.getElementById('colorAccent').value,
        success: document.getElementById('colorSuccess').value,
        danger: document.getElementById('colorDanger').value,
        warning: document.getElementById('colorWarning').value,
        bg: document.getElementById('colorBg').value,
        text: document.getElementById('colorText').value
    };
    
    // Save to localStorage
    localStorage.setItem('security_custom_colors', JSON.stringify(colors));
    showAlert('✅ Colores guardados correctamente.', 'success');
};

window.resetColors = function() {
    const defaultColors = {
        primary: '#1e3a5f',
        secondary: '#2c5282',
        accent: '#4299e1',
        success: '#38a169',
        danger: '#c53030',
        warning: '#d69e2e',
        bg: '#f7fafc',
        text: '#2d3748'
    };
    
    // Reset inputs
    Object.keys(defaultColors).forEach(color => {
        document.getElementById('color' + color.charAt(0).toUpperCase() + color.slice(1)).value = defaultColors[color];
        document.getElementById('color' + color.charAt(0).toUpperCase() + color.slice(1) + 'Text').value = defaultColors[color];
        updateColor(color, defaultColors[color]);
    });
    
    localStorage.removeItem('security_custom_colors');
    showAlert('✅ Colores restablecidos.', 'success');
};

// Load saved colors on startup
function loadSavedColors() {
    const saved = localStorage.getItem('security_custom_colors');
    if (saved) {
        const colors = JSON.parse(saved);
        Object.keys(colors).forEach(color => {
            document.getElementById('color' + color.charAt(0).toUpperCase() + color.slice(1)).value = colors[color];
            document.getElementById('color' + color.charAt(0).toUpperCase() + color.slice(1) + 'Text').value = colors[color];
            updateColor(color, colors[color]);
        });
    }
    
    // Load custom element colors
    loadCustomElementColors();
}

// Color picker for specific elements
let colorPickerActive = false;
let selectedElement = null;

window.toggleColorPicker = function() {
    colorPickerActive = !colorPickerActive;
    const btn = document.getElementById('colorPickerToggle');
    
    if (colorPickerActive) {
        document.body.classList.add('color-picker-active');
        btn.innerHTML = '<i class="fas fa-times"></i> Desactivar selector';
        btn.style.background = 'var(--security-danger)';
        
        // Add click listeners to all text elements
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, label, a, li, td, th, .security-card-header h3, .visit-name, .visit-details').forEach(el => {
            el.style.cursor = 'crosshair';
            el.addEventListener('click', handleElementClick);
        });
    } else {
        document.body.classList.remove('color-picker-active');
        btn.innerHTML = '<i class="fas fa-eye-dropper"></i> Activar selector';
        btn.style.background = '';
        
        // Remove click listeners
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, label, a, li, td, th, .security-card-header h3, .visit-name, .visit-details').forEach(el => {
            el.style.cursor = '';
            el.removeEventListener('click', handleElementClick);
        });
    }
};

function handleElementClick(e) {
    if (!colorPickerActive) return;
    e.preventDefault();
    e.stopPropagation();
    
    const element = e.target;
    const colorPicker = document.getElementById('elementColorPicker');
    const selectedColor = colorPicker.value;
    
    // Get a unique selector for this element
    const selector = getElementSelector(element);
    
    // Apply color
    element.style.color = selectedColor;
    
    // Save to localStorage
    let customElements = JSON.parse(localStorage.getItem('security_custom_elements') || '{}');
    customElements[selector] = {
        color: selectedColor,
        tag: element.tagName.toLowerCase()
    };
    localStorage.setItem('security_custom_elements', JSON.stringify(customElements));
    
    // Update info display
    const infoDiv = document.getElementById('selectedElementInfo');
    document.getElementById('elementSelectorPath').textContent = selector;
    infoDiv.style.display = 'block';
    
    // Show success
    showAlert('✅ Color aplicado al elemento: ' + selector, 'success');
    
    // Refresh list
    loadCustomElementColors();
}

function getElementSelector(el) {
    // Build a unique selector
    if (el.id) {
        return '#' + el.id;
    }
    
    let selector = el.tagName.toLowerCase();
    
    if (el.className && typeof el.className === 'string') {
        selector += '.' + el.className.split(' ').filter(c => c).join('.');
    }
    
    // Add parent context if available
    if (el.parentElement) {
        const parent = el.parentElement;
        if (parent.id) {
            selector = '#' + parent.id + ' > ' + selector;
        } else if (parent.className && typeof parent.className === 'string') {
            selector = parent.tagName.toLowerCase() + '.' + parent.className.split(' ').filter(c => c).join('.') + ' > ' + selector;
        }
    }
    
    return selector;
}

function loadCustomElementColors() {
    const customElements = JSON.parse(localStorage.getItem('security_custom_elements') || '{}');
    const listContainer = document.getElementById('customElementsList');
    
    if (Object.keys(customElements).length === 0) {
        listContainer.innerHTML = '<p style="color: var(--security-text-muted); font-style: italic;">No hay elementos con colores personalizados</p>';
        return;
    }
    
    listContainer.innerHTML = Object.entries(customElements).map(([selector, data]) => `
        <div class="custom-element-item">
            <div class="element-info">
                <div class="color-preview" style="background: ${data.color}"></div>
                <span class="element-selector">${selector}</span>
            </div>
            <button class="remove-btn" onclick="removeCustomElement('${selector}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    // Apply saved colors
    Object.entries(customElements).forEach(([selector, data]) => {
        try {
            const el = document.querySelector(selector);
            if (el) {
                el.style.color = data.color;
            }
        } catch (e) {
            console.log('Invalid selector:', selector);
        }
    });
}

window.removeCustomElement = function(selector) {
    let customElements = JSON.parse(localStorage.getItem('security_custom_elements') || '{}');
    delete customElements[selector];
    localStorage.setItem('security_custom_elements', JSON.stringify(customElements));
    
    // Remove style from element
    try {
        const el = document.querySelector(selector);
        if (el) {
            el.style.color = '';
        }
    } catch (e) {}
    
    loadCustomElementColors();
    showAlert('✅ Color eliminado', 'success');
};

window.clearAllCustomColors = function() {
    if (!confirm('¿Estás seguro de que quieres borrar todos los colores personalizados?')) {
        return;
    }
    
    localStorage.removeItem('security_custom_elements');
    
    // Reload page to reset all styles
    location.reload();
};

// Load saved colors after page load
setTimeout(loadSavedColors, 100);

// Show alert message
function showAlert(message, type = 'success') {
    const existingAlerts = document.querySelectorAll('.alert-message');
    existingAlerts.forEach(alert => alert.remove());
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-message ${type}`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'times-circle'}"></i>
        ${message}
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// View evidence image
window.viewEvidence = function(reportId) {
    const data = window.serviceManager.data;
    const report = (data.seguridad_reportes || []).find(r => r.id === reportId);
    
    if (!report || !report.evidence) {
        showAlert('No hay evidencia disponible', 'warning');
        return;
    }
    
    // Create modal to show image
    const modal = document.createElement('div');
    modal.className = 'evidence-modal';
    modal.innerHTML = `
        <div class="evidence-modal-content">
            <span class="evidence-modal-close" onclick="this.closest('.evidence-modal').remove()">&times;</span>
            <h3>Evidencia</h3>
            <img src="${report.evidence}" alt="Evidencia" style="max-width: 100%; max-height: 80vh; border-radius: 8px;">
            <p style="margin-top: 10px; color: var(--security-text-muted);">${report.evidenceName || 'Archivo adjunto'}</p>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
};

// Load Problems Tab
function loadProblemsTab() {
    try {
        // Ensure serviceManager and data exist
        if (!window.serviceManager || !window.serviceManager.data) {
            console.error('ServiceManager not initialized');
            return;
        }
        
        // Initialize data arrays if they don't exist
        if (!window.serviceManager.data.seguridad_incidentes) {
            const savedIncidents = localStorage.getItem('seguridad_incidentes');
            window.serviceManager.data.seguridad_incidentes = savedIncidents ? JSON.parse(savedIncidents) : [];
        }
        if (!window.serviceManager.data.seguridad_reportes) {
            const savedReports = localStorage.getItem('seguridad_reportes');
            window.serviceManager.data.seguridad_reportes = savedReports ? JSON.parse(savedReports) : [];
        }
        
        const data = window.serviceManager.data;
        const incidents = data.seguridad_incidentes || [];
        const reports = data.seguridad_reportes || [];
        
        // Update summary stats
        document.getElementById('problemIncidentsCount').textContent = incidents.length;
        document.getElementById('problemReportsCount').textContent = reports.length;
        
        // Combine all problems
        const allProblems = [];
        
        incidents.forEach(i => {
            allProblems.push({
                type: 'incident',
                typeLabel: 'Incidente',
                id: i.id,
                description: i.description || '',
                location: i.location || '-',
                date: i.dateTime || i.checkIn
            });
        });
        
        reports.forEach(r => {
            allProblems.push({
                type: 'report',
                typeLabel: 'Reporte',
                id: r.id,
                description: r.details || r.description || '',
                location: r.contactInfo || '-',
                date: r.dateTime
            });
        });
        
        // Sort by date (newest first)
        allProblems.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Store for filtering
        window.allProblemsData = allProblems;
        
        // Display all problems
        renderProblemsTable(allProblems);
        
    } catch (err) {
        console.error('Error loading problems tab:', err);
    }
}

// Render problems table
function renderProblemsTable(problems) {
    const tbody = document.getElementById('problemsTableBody');
    if (!tbody) return;
    
    if (problems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--security-text-muted);">No hay problemas registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = problems.map(p => `
        <tr class="${p.type}-row">
            <td><span class="problem-type-badge ${p.type}">${p.typeLabel}</span></td>
            <td>${escapeHtml(p.description).substring(0, 60)}${p.description.length > 60 ? '...' : ''}</td>
            <td>${escapeHtml(p.location)}</td>
            <td>${new Date(p.date).toLocaleString('es-ES')}</td>
            <td><span class="status-badge active">Pendiente</span></td>
            <td class="actions">
                ${p.type === 'report' ? `<button class="btn-view" onclick="viewEvidence('${p.id}')" title="Ver evidencia"><i class="fas fa-image"></i></button>` : ''}
                <button class="btn-edit" onclick="editEntry('${p.type}', '${p.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" onclick="deleteEntry('${p.type}', '${p.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// Filter problems
window.filterProblems = function(filterType) {
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filterType) {
            btn.classList.add('active');
        }
    });
    
    if (!window.allProblemsData) return;
    
    if (filterType === 'all') {
        renderProblemsTable(window.allProblemsData);
    } else {
        const filtered = window.allProblemsData.filter(p => p.type === filterType);
        renderProblemsTable(filtered);
    }
};

// Export problems report
window.exportProblemsReport = function() {
    if (!window.allProblemsData || window.allProblemsData.length === 0) {
        showAlert('No hay problemas para exportar', 'warning');
        return;
    }
    
    const problems = window.allProblemsData;
    let csv = 'Tipo,Descripcion,Lugar/Contacto,Fecha\n';
    
    problems.forEach(p => {
        const desc = (p.description || '').replace(/"/g, '""').replace(/,/g, ';');
        csv += `"${p.typeLabel}","${desc}","${p.location}","${new Date(p.date).toLocaleString('es-ES')}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_problemas_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showAlert('Reporte de problemas exportado correctamente', 'success');
};

// Print problems report
window.printProblemsReport = function() {
    if (!window.allProblemsData || window.allProblemsData.length === 0) {
        showAlert('No hay problemas para imprimir', 'warning');
        return;
    }
    
    const problems = window.allProblemsData;
    const printWindow = window.open('', '_blank');
    
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Reporte de Problemas - Seguridad PCB</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 10px; }
                .date { color: #666; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background: #1e3a5f; color: white; }
                .badge { padding: 3px 8px; border-radius: 4px; font-size: 12px; }
                .badge-incident { background: #fed7d7; color: #c53030; }
                .badge-report { background: #fefcbf; color: #b7791f; }
                .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <h1>Reporte de Problemas</h1>
            <p class="date">Fecha de generacion: ${new Date().toLocaleString('es-ES')}</p>
            <p>Total de problemas: ${problems.length}</p>
            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Descripcion</th>
                        <th>Lugar/Contacto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    problems.forEach(p => {
        html += `
            <tr>
                <td><span class="badge badge-${p.type}">${p.typeLabel}</span></td>
                <td>${escapeHtml(p.description)}</td>
                <td>${escapeHtml(p.location)}</td>
                <td>${new Date(p.date).toLocaleString('es-ES')}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
            <div class="footer">
                <p>Sistema de Seguridad PCB - Generated automatically</p>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
};
