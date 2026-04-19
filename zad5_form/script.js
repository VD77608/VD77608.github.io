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

    const vForm = document.getElementById('valeriiForm');
    
    vForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;

        document.querySelectorAll('.err').forEach(e => e.textContent = '');
        document.getElementById('statusMsg').textContent = '';

        const fields = {
            fn: document.getElementById('fname').value.trim(),
            ln: document.getElementById('lname').value.trim(),
            em: document.getElementById('uemail').value.trim(),
            ms: document.getElementById('umsg').value.trim()
        };

        if (!fields.fn) { document.getElementById('fnameErr').textContent = 'Imię jest wymagane'; isValid = false; }
        if (!fields.ln) { document.getElementById('lnameErr').textContent = 'Nazwisko jest wymagane'; isValid = false; }
        if (!fields.em) { document.getElementById('uemailErr').textContent = 'Email jest wymagany'; isValid = false; }
        if (!fields.ms) { document.getElementById('umsgErr').textContent = 'Wiadomość nie może być pusta'; isValid = false; }

        if (fields.em && !fields.em.includes('@')) {
            document.getElementById('uemailErr').textContent = 'Email musi zawierać znak @';
            isValid = false;
        }

        const hasDigits = (str) => /[0-9]/.test(str);
        if (hasDigits(fields.fn)) {
            document.getElementById('fnameErr').textContent = 'Imię nie może zawierać cyfr';
            isValid = false;
        }
        if (hasDigits(fields.ln)) {
            document.getElementById('lnameErr').textContent = 'Nazwisko nie może zawierać cyfr';
            isValid = false;
        }

        if (isValid) {
            document.getElementById('statusMsg').textContent = 'Formularz zweryfikowany poprawnie!';
            vForm.reset();
        }
    });