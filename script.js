// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.setAttribute('data-theme', 'dark');
    darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('darkMode', 'false');
        darkModeToggle.textContent = '🌙';
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkMode', 'true');
        darkModeToggle.textContent = '☀️';
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Sticky Header
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load PPDB Info
async function loadPPDBInfo() {
    try {
        const response = await fetch('/api/ppdb-info');
        const data = await response.json();
        
        if (data.academic_year) {
            document.getElementById('academicYear').textContent = data.academic_year;
        }
        if (data.quota) {
            document.getElementById('quota').textContent = data.quota + ' Siswa';
        }
        if (data.registration_start && data.registration_end) {
            const startDate = new Date(data.registration_start).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            const endDate = new Date(data.registration_end).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            document.getElementById('registrationPeriod').textContent = `${startDate} - ${endDate}`;
        }
        if (data.requirements) {
            const requirements = data.requirements.split(',').map(r => r.trim());
            const requirementsList = document.getElementById('requirementsList');
            requirementsList.innerHTML = requirements.map(req => `<li>${req}</li>`).join('');
        }
    } catch (error) {
        console.error('Error loading PPDB info:', error);
    }
}

// Registration Form
const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(registrationForm);
    
    // Validate required fields
    const requiredFields = ['fullName', 'gender', 'birthPlace', 'birthDate', 'address', 'fatherName', 'motherName', 'whatsapp'];
    for (const field of requiredFields) {
        if (!formData.get(field)) {
            alert('Mohon lengkapi semua field yang wajib diisi');
            return;
        }
    }
    
    // Validate WhatsApp format
    const whatsapp = formData.get('whatsapp');
    const whatsappRegex = /^08\d{8,11}$/;
    if (!whatsappRegex.test(whatsapp)) {
        alert('Nomor WhatsApp tidak valid. Gunakan format 08xxxxxxxxxx');
        return;
    }
    
    // Validate file uploads
    const kk = document.getElementById('kk').files[0];
    const birthCertificate = document.getElementById('birthCertificate').files[0];
    const photo = document.getElementById('photo').files[0];
    
    if (!kk || !birthCertificate || !photo) {
        alert('Mohon upload semua dokumen yang diperlukan');
        return;
    }
    
    // Validate file sizes (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (kk.size > maxSize || birthCertificate.size > maxSize || photo.size > maxSize) {
        alert('Ukuran file tidak boleh lebih dari 5MB');
        return;
    }
    
    // Submit form
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            document.getElementById('regNumber').textContent = result.registrationNumber;
            document.getElementById('successMessage').style.display = 'block';
            registrationForm.reset();
            registrationForm.style.display = 'none';
        } else {
            alert('Terjadi kesalahan: ' + result.error);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.');
    }
});

function closeSuccessMessage() {
    document.getElementById('successMessage').style.display = 'none';
    registrationForm.style.display = 'block';
}

// Check Announcement
async function checkAnnouncement() {
    const regNumber = document.getElementById('regNumberCheck').value.trim();
    const resultDiv = document.getElementById('announcementResult');
    
    if (!regNumber) {
        alert('Mohon masukkan nomor pendaftaran');
        return;
    }
    
    try {
        const response = await fetch(`/api/announcement/${regNumber}`);
        const result = await response.json();
        
        resultDiv.classList.remove('show', 'lulus', 'cadangan', 'belum-lulus');
        
        if (!result.found) {
            resultDiv.innerHTML = `<p>${result.message}</p>`;
            resultDiv.classList.add('show', 'belum-lulus');
        } else {
            let statusText = '';
            let statusClass = '';
            
            if (result.status === 'lulus') {
                statusText = 'LULUS';
                statusClass = 'lulus';
            } else if (result.status === 'cadangan') {
                statusText = 'CADANGAN';
                statusClass = 'cadangan';
            } else {
                statusText = 'BELUM LULUS';
                statusClass = 'belum-lulus';
            }
            
            resultDiv.innerHTML = `
                <p><strong>Nama:</strong> ${result.fullName}</p>
                <p><strong>Status:</strong> ${statusText}</p>
            `;
            resultDiv.classList.add('show', statusClass);
        }
    } catch (error) {
        console.error('Error checking announcement:', error);
        alert('Terjadi kesalahan saat mengecek pengumuman. Silakan coba lagi.');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPPDBInfo();
});
