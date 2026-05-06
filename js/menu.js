	//document.getElementById('mobile-menu').onclick = function() {
	//	document.querySelector('.nav-list').classList.toggle('active');
	//};	
	
	fetch('menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;

        // Re-inizializza il tasto mobile dopo il caricamento
        const mobileMenu = document.getElementById('mobile-menu');
        if(mobileMenu) {
            mobileMenu.onclick = function() {
                document.querySelector('.nav-list').classList.toggle('active');
            };
        }
    });