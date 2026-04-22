// --- PROTEZIONE REFERRER ---
if (window.self === window.top && !document.referrer.includes("sites.google.com")) {
    window.location.href = "https://sites.google.com/view/generatore-dungeontales/generatore";
}

// --- LOGICA DADI (Sostituisce dtg-subs) ---
const roll = (sides) => Math.floor(Math.random() * sides) + 1;
const getTirid = (n, sides, mod = "") => `<span class="tirid">D${sides} = ${n}${mod}</span>`;

// --- MOTORE DI GENERAZIONE ---
function genera(stanza) {
    // Sostituisce i placeholder [variabile] con dati reali
    let html = stanza.template;
    
    // Esempio semplificato di sostituzione (da espandere in base alle variabili)
    html = html.replace("[descrizione]", stanza.descrizione[Math.floor(Math.random() * stanza.descrizione.length)]);
    html = html.replace("[illuminazione]", stanza.illuminazione);
    
    document.getElementById('output-area').innerHTML = html;
    setTimeout(salvaGenerazione, 1000);
}

// --- LOGICA SALVATAGGIO ---
function salvaGenerazione() {
    let cronologia = JSON.parse(localStorage.getItem('dungeon_history') || "[]");
    let nuovaEntrata = {
        id: Date.now(),
        tipo: document.title,
        testo: document.getElementById('div_main').innerHTML,
        orario: new Date().toLocaleString()
    };
    cronologia.unshift(nuovaEntrata);
    localStorage.setItem('dungeon_history', JSON.stringify(cronologia));
}