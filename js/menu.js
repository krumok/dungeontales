fetch('menu.html')
    .then(response => response.text())
    .then(data => {
        // 1. Inserisce l'HTML del menu nel contenitore
        document.getElementById('menu-container').innerHTML = data;

        // 2. ORA che il menu esiste nel DOM, cerchiamo il pulsante
        const mobileMenu = document.getElementById('mobile-menu');
        const navList = document.querySelector('.nav-list');

        // 3. Verifichiamo per sicurezza che esistano prima di assegnare il click
        if (mobileMenu && navList) {
            mobileMenu.onclick = function() {
                navList.classList.toggle('active');
            };
        }
    })
    .catch(error => console.error('Errore nel caricamento del menu:', error));
