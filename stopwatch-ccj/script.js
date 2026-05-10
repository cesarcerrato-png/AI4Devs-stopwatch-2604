let timer = null;
let startTime = 0;
let elapsedTime = 0; // en milisegundos
let isRunning = false;

const display = document.getElementById('time-input');
const msDisplay = document.getElementById('ms-display');
const startBtn = document.getElementById('startBtn');
const clearBtn = document.getElementById('clearBtn');

// --- LÓGICA DEL CRONÓMETRO ---

function updateDisplay() {
    let totalMs = elapsedTime;
    
    let hours = Math.floor(totalMs / 3600000);
    let mins = Math.floor((totalMs % 3600000) / 60000);
    let secs = Math.floor((totalMs % 60000) / 1000);
    let ms = totalMs % 1000;

    display.value = 
        `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    msDisplay.textContent = String(ms).padStart(3, '0');
}

function startStop() {
    if (!isRunning) {
        // Al empezar, convertimos el input actual a milisegundos (por si el usuario lo editó)
        const parts = display.value.split(':');
        elapsedTime = (parseInt(parts[0]) * 3600000) + (parseInt(parts[1]) * 60000) + (parseInt(parts[2]) * 1000);
        
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        
        startBtn.textContent = 'Stop';
        startBtn.style.backgroundColor = '#ffbb33'; // Color naranja para Stop
        isRunning = true;
    } else {
        clearInterval(timer);
        startBtn.textContent = 'Start';
        startBtn.style.backgroundColor = '#66ff66';
        isRunning = false;
    }
}

function clearTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    display.value = "00:00:00";
    msDisplay.textContent = "000";
    startBtn.textContent = 'Start';
    startBtn.style.backgroundColor = '#66ff66';
}

// --- MÁSCARA DEL INPUT ---

display.addEventListener('input', (e) => {
    // Elimina cualquier cosa que no sea número
    let value = e.target.value.replace(/\D/g, '');
    
    // Limita a 6 dígitos (HHMMSS)
    if (value.length > 6) value = value.slice(0, 6);
    
    // Formatea como HH:MM:SS
    let formatted = "";
    if (value.length > 0) {
        formatted = value.substring(0, 2);
        if (value.length > 2) formatted += ":" + value.substring(2, 4);
        if (value.length > 4) formatted += ":" + value.substring(4, 6);
    }
    
    // Relleno preventivo si borra
    e.target.value = formatted;
});

display.addEventListener('blur', (e) => {
    // Al salir del input, asegurar que el formato sea completo 00:00:00
    const parts = e.target.value.split(':');
    const h = (parts[0] || "00").padStart(2, '0');
    const m = (parts[1] || "00").padStart(2, '0');
    const s = (parts[2] || "00").padStart(2, '0');
    e.target.value = `${h}:${m}:${s}`;
});

// Eventos
startBtn.addEventListener('click', startStop);
clearBtn.addEventListener('click', clearTimer);