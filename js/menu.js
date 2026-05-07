<script>
fetch('menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;

        // 1. Gestione apertura/chiusura menu principale (hamburger)
        const mobileMenu = document.getElementById('mobile-menu');
        const navList = document.querySelector('.nav-list');
        if (mobileMenu) {
            mobileMenu.onclick = function(e) {
                e.stopPropagation();
                navList.classList.toggle('active');
            };
        }

        // 2. Gestione sottomenu su Mobile
        const dropdowns = document.querySelectorAll('.has-dropdown > a');
        
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                // Eseguiamo questa logica solo se siamo su uno schermo piccolo
                if (window.innerWidth <= 768) {
                    const parentLi = this.parentElement;
                    const isOpen = parentLi.classList.contains('open');

                    // Se il sottomenu è chiuso, impedisci al link di cambiare pagina e aprilo
                    if (!isOpen) {
                        e.preventDefault();
                        // Chiudi eventuali altri sottomenu aperti allo stesso livello
                        parentLi.parentElement.querySelectorAll('.has-dropdown').forEach(li => {
                            li.classList.remove('open');
                        });
                        parentLi.classList.add('open');
                    }
                    // Se è già aperto (secondo tocco), seguirà il link normalmente
                }
            });
        });

        // Chiudi il menu se si clicca fuori
        document.addEventListener('click', () => {
            if (navList) navList.classList.remove('active');
            document.querySelectorAll('.has-dropdown').forEach(li => li.classList.remove('open'));
        });
    });
</script>
