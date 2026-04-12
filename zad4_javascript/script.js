document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeStylesheet = document.getElementById('themeStylesheet');

    const sectionToggleBtn = document.getElementById('sectionToggleBtn');
    const projectsSection = document.getElementById('projectsSection');

    themeToggleBtn.addEventListener('click', () => {
        if (themeStylesheet.getAttribute('href') === 'red.css') {
            themeStylesheet.setAttribute('href', 'green.css');
            console.log("Zmieniono motyw na: Green");
        } else {
            themeStylesheet.setAttribute('href', 'red.css');
            console.log("Zmieniono motyw na: Red");
        }
    });

    if (projectsSection.classList.contains('hidden')) {
        sectionToggleBtn.textContent = 'Pokaż sekcję Projekty';
    } else {
        sectionToggleBtn.textContent = 'Ukryj sekcję Projekty';
    }

    sectionToggleBtn.addEventListener('click', () => {
        projectsSection.classList.toggle('hidden');
        
        const isHidden = projectsSection.classList.contains('hidden');
        
        if (isHidden) {
            sectionToggleBtn.textContent = 'Pokaż sekcję Projekty';
            console.log("Sekcja Projekty została ukryta");
        } else {
            sectionToggleBtn.textContent = 'Ukryj sekcję Projekty';
            console.log("Sekcja Projekty jest teraz widoczna");
        }
    });
});