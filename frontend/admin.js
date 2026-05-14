// Check if admin is logged in
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadStats();
        loadStudents();
        loadSettings();
    }
}

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        
        if (result.success) {
            localStorage.setItem('adminToken', result.token);
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            loadStats();
            loadStudents();
            loadSettings();
        } else {
            alert(result.error || 'Login gagal');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Terjadi kesalahan saat login');
    }
});

// Logout
function logout() {
    localStorage.removeItem('adminToken');
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('loginForm').reset();
}

// Load Statistics
async function loadStats() {
    try {
        const response = await fetch('/api/admin/stats');
        const stats = await response.json();
        
        document.getElementById('totalStudents').textContent = 
            (stats.pending || 0) + (stats.lulus || 0) + (stats.cadangan || 0) + (stats.belum_lulus || 0);
        document.getElementById('pendingStudents').textContent = stats.pending || 0;
        document.getElementById('lulusStudents').textContent = stats.lulus || 0;
        document.getElementById('cadanganStudents').textContent = stats.cadangan || 0;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load Students
let allStudents = [];

async function loadStudents() {
    try {
        const response = await fetch('/api/admin/students');
        allStudents = await response.json();
        renderStudents(allStudents);
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Render Students Table
function renderStudents(students) {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';
    
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.registration_number}</td>
            <td>${student.full_name}</td>
            <td>${student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
            <td>${student.whatsapp}</td>
            <td><span class="status-badge status-${student.status}">${student.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn action-btn-lulus" onclick="updateStatus(${student.id}, 'lulus')">Lulus</button>
                    <button class="action-btn action-btn-cadangan" onclick="updateStatus(${student.id}, 'cadangan')">Cadangan</button>
                    <button class="action-btn action-btn-tolak" onclick="updateStatus(${student.id}, 'belum_lulus')">Tolak</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Search Students
function searchStudents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allStudents.filter(student => 
        student.full_name.toLowerCase().includes(searchTerm) ||
        student.registration_number.toLowerCase().includes(searchTerm)
    );
    renderStudents(filtered);
}

// Update Student Status
async function updateStatus(id, status) {
    if (!confirm(`Apakah Anda yakin ingin mengubah status menjadi ${status}?`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/admin/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        
        const result = await response.json();
        
        if (result.success) {
            loadStudents();
            loadStats();
            alert('Status berhasil diubah');
        } else {
            alert('Gagal mengubah status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Terjadi kesalahan');
    }
}

// Export to Excel
function exportToExcel() {
    window.location.href = '/api/admin/export';
}

// Load Settings
async function loadSettings() {
    try {
        const response = await fetch('/api/ppdb-info');
        const settings = await response.json();
        
        if (settings.academic_year) {
            document.getElementById('academicYear').value = settings.academic_year;
        }
        if (settings.quota) {
            document.getElementById('quota').value = settings.quota;
        }
        if (settings.registration_start) {
            document.getElementById('registrationStart').value = settings.registration_start;
        }
        if (settings.registration_end) {
            document.getElementById('registrationEnd').value = settings.registration_end;
        }
        if (settings.requirements) {
            document.getElementById('requirements').value = settings.requirements;
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Save Settings
document.getElementById('settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const settings = {
        academicYear: document.getElementById('academicYear').value,
        quota: document.getElementById('quota').value,
        registrationStart: document.getElementById('registrationStart').value,
        registrationEnd: document.getElementById('registrationEnd').value,
        requirements: document.getElementById('requirements').value
    };
    
    try {
        const response = await fetch('/api/admin/ppdb-settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Pengaturan berhasil disimpan');
        } else {
            alert('Gagal menyimpan pengaturan');
        }
    } catch (error) {
        console.error('Error saving settings:', error);
        alert('Terjadi kesalahan');
    }
});

// Tab Navigation
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

// Initialize
checkAuth();
