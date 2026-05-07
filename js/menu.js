fetch('menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;

        const mobileMenu = document.getElementById('mobile-menu');
        const navList = document.querySelector('.nav-list');

        // Toggle del menu principale (Hamburger)
        if (mobileMenu) {
            mobileMenu.onclick = function(e) {
                e.stopPropagation();
                navList.classList.toggle('active');
            };
        }

        // Gestione Sottomenu per Mobile
        const dropdowns = document.querySelectorAll('.has-dropdown > a');
        
        dropdowns.forEach(link => {
            link.addEventListener('click', function(e) {
                // Esegui solo se siamo in modalità mobile (larghezza < 768px)
                if (window.innerWidth <= 768) {
                    const parentLi = this.parentElement;
                    
                    // Se il sottomenu è chiuso, impedisci la navigazione e apri
                    if (!parentLi.classList.contains('open')) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Chiudi altri sottomenu aperti allo stesso livello
                        parentLi.parentElement.querySelectorAll('.has-dropdown').forEach(li => {
                            if (li !== parentLi) li.classList.remove('open');
                        });
                        
                        parentLi.classList.add('open');
                    } 
                    // Se è già aperto, il secondo tocco seguirà il link (es. verso generatore.html)
                }
            });
        });

        // Chiudi tutto se clicchi fuori dal menu
        document.addEventListener('click', (e) => {
            if (!navList.contains(e.target) && !mobileMenu.contains(e.target)) {
                navList.classList.remove('active');
                document.querySelectorAll('.has-dropdown').forEach(li => li.classList.remove('open'));
            }
        });
    });