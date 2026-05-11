document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeStylesheet = document.getElementById('themeStylesheet');
    const sectionToggleBtn = document.getElementById('sectionToggleBtn');
    const projectsSection = document.getElementById('projectsSection');

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = themeStylesheet.getAttribute('href');
        const newTheme = currentTheme === 'red.css' ? 'green.css' : 'red.css';
        themeStylesheet.setAttribute('href', newTheme);
    });

    sectionToggleBtn.addEventListener('click', () => {
        projectsSection.classList.toggle('hidden');
        sectionToggleBtn.textContent = projectsSection.classList.contains('hidden') 
            ? 'Pokaż sekcję Projekty' 
            : 'Ukryj sekcję Projekty';
    });

    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notesList');

    function renderNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('userNotes')) || [];
        notesList.innerHTML = '';
        savedNotes.forEach((note, index) => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.marginBottom = '10px';
            li.innerHTML = `
                <span>${note}</span>
                <button onclick="deleteNote(${index})" style="padding: 2px 8px; cursor: pointer;">Usuń</button>
            `;
            notesList.appendChild(li);
        });
    }

    addNoteBtn.addEventListener('click', () => {
        const text = noteInput.value.trim();
        if (text) {
            const notes = JSON.parse(localStorage.getItem('userNotes')) || [];
            notes.push(text);
            localStorage.setItem('userNotes', JSON.stringify(notes));
            noteInput.value = '';
            renderNotes();
        }
    });

    window.deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem('userNotes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('userNotes', JSON.stringify(notes));
        renderNotes();
    };

    renderNotes();

    async function loadData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Problem z plikiem JSON');
            const data = await response.json();

            const skillsList = document.getElementById('skills-list');
            data.umiejetnosci.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
            });

            const projectsList = document.getElementById('projects-list');
            data.projekty.forEach(proj => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${proj.tytul}</strong> – ${proj.opis}`;
                projectsList.appendChild(li);
            });
        } catch (error) {
            console.error("Błąd fetch:", error);
        }
    }
    loadData();

    const vForm = document.getElementById('valeriiForm');
    vForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        document.querySelectorAll('.err').forEach(e => e.textContent = '');
        const statusMsg = document.getElementById('statusMsg');
        statusMsg.textContent = '';

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
        if (hasDigits(fields.fn) || hasDigits(fields.ln)) {
            if (hasDigits(fields.fn)) document.getElementById('fnameErr').textContent = 'Imię nie może zawierać cyfr';
            if (hasDigits(fields.ln)) document.getElementById('lnameErr').textContent = 'Nazwisko nie może zawierać cyfr';
            isValid = false;
        }

        if (isValid) {
            const formData = {
                firstName: fields.fn,
                lastName: fields.ln,
                email: fields.em,
                message: fields.ms,
                date: new Date().toLocaleString()
            };

            const MOCK_API_URL = 'https://6a018cd936fb6ad04de120d3.mockapi.io/api/formforcv/:endpoint'; 

            statusMsg.textContent = 'Wysyłanie danych...';

            fetch(MOCK_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) throw new Error('Błąd serwera');
                return response.json();
            })
            .then(data => {
                statusMsg.textContent = 'Sukces! Dane zapisane na serwerze MockAPI.';
                vForm.reset();
            })
            .catch(error => {
                statusMsg.textContent = 'Błąd podczas komunikacji z serwerem.';
                statusMsg.style.color = '#ff4d4d';
            });
        }
    });
});