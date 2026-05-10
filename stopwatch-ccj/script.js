function startStop() {
    if (!isRunning) {
        // Validación y normalización segura del input
        const parts = display.value.split(':').map(part => part.trim());
        
        // Aseguramos que siempre tengamos 3 partes (H, M, S) y usamos fallback a 0
        const hrs = parseInt(parts[0] || 0, 10) || 0;
        const min = parseInt(parts[1] || 0, 10) || 0;
        const sec = parseInt(parts[2] || 0, 10) || 0;

        elapsedTime = (hrs * 3600000) + (min * 60000) + (sec * 1000);
        
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        
        startBtn.textContent = 'Stop';
        startBtn.style.backgroundColor = '#ffbb33';
        isRunning = true;
    } else {
        // ... resto de la lógica de Stop