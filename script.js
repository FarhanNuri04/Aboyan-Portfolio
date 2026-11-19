// ==========================================
// 1. LIVE CLOCK & GREETING (Waktu Malaysia)
// ==========================================
function updateTime() {
    const now = new Date();
    
    // Format Jam & Tarikh (Timezone Kuala Lumpur)
    const timeString = new Intl.DateTimeFormat('en-MY', {
        timeZone: 'Asia/Kuala_Lumpur',
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    }).format(now);

    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = timeString;

    // Logic Ucapan (Greeting)
    const hourMYT = parseInt(new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kuala_Lumpur', hour: 'numeric', hour12: false
    }).format(now));

    let greetingText = "Good Night!";
    if (hourMYT >= 5 && hourMYT < 12) greetingText = "Good Morning!";
    else if (hourMYT >= 12 && hourMYT < 17) greetingText = "Good Afternoon!";
    else if (hourMYT >= 17 && hourMYT < 21) greetingText = "Good Evening!";

    const greetingEl = document.getElementById('greeting');
    if (greetingEl) greetingEl.textContent = greetingText;
}
setInterval(updateTime, 1000); // Update setiap 1 saat
updateTime();

// ==========================================
// Check kalau user pernah pilih Dark Mode sebelum ni
// ==========================================
// 2. DARK / LIGHT MODE TOGGLE
// ==========================================
const themeToggleBtn = document.getElementById('themeToggleBtn');
const currentTheme = localStorage.getItem('theme');

// Check kalau user pernah pilih Dark Mode sebelum ni
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '☀️ Bright Mode'; 
} else {
    if (themeToggleBtn) themeToggleBtn.innerHTML = '🌙 Dark Mode'; 
}

// Event click untuk butang
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            themeToggleBtn.innerHTML = '☀️ Bright Mode'; // Tukar icon & teks
        } else {
            themeToggleBtn.innerHTML = '🌙 Dark Mode'; // Tukar icon & teks
        }
        localStorage.setItem('theme', theme); // Simpan pilihan dalam browser
    });
}

// ==========================================
// 3. SCROLL TO TOP BUTTON
// ==========================================
// Cipta butang secara automatik dalam JS
const topBtn = document.createElement('button');
topBtn.innerHTML = '↑';
topBtn.id = 'scrollTopBtn';
document.body.appendChild(topBtn);

// Tunjuk/sorok butang bila scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        topBtn.style.display = 'block';
    } else {
        topBtn.style.display = 'none';
    }
});

// Scroll ke atas dengan smooth bila klik
topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// 4. DYNAMIC FOOTER YEAR
// ==========================================
document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
});