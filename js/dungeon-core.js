// --- 1. PROTEZIONE E SICUREZZA ---
if (window.self === window.top && !document.referrer.includes("sites.google.com")) {
   // window.location.href = "https://sites.google.com/view/generatore-dungeontales/generatore";
}

// --- 2. MOTORE LANCI DADI (Sostituisce dtg-subs) ---
const roll = (sides) => Math.floor(Math.random() * sides) + 1;

const getTirid = (sides, result, mod = "") => {
    return `<span class="tirid">D${sides} = ${result}${mod}</span>`;
};

// Funzione per selezionare un elemento casuale da un array
const selectOne = (arr) => arr[Math.floor(Math.random() * arr.length)];

// --- 3. LOGICA DI GENERAZIONE ---
function avviaGenerazione(dati) {
    const outputDiv = document.getElementById('output-area');
    const imgElement = document.querySelector('.img-wrapper img');
    
    // Imposta l'immagine se presente
    if(imgElement && dati.immagine) imgElement.src = dati.immagine;

    // Lanci di dadi per i cancelli e scale
    const rSX = roll(6);
    const rDX = roll(6);
    const cSX = roll(6);
    const cDX = roll(6);
    const sG = roll(2); // scale su o giù
    const sL = roll(4); // livelli scale

    let html = `
        <p class="basep"><b>#1</b> <span class="titsez">DESCRIZIONE:</span><br><span class="descp">"${selectOne(dati.descrizione)}"</span></p>
        
        <p class="basepg"><b>#2</b> <span class="titsez">ILLUMINAZIONE:</span><br>${dati.illuminazione}</p>
        
        <p class="basep"><b>#3</b> <span class="titsez">NOTE:</span><br>
        ${dati.note}<br>
        Oltre il Cancello a sinistra: ${dati.risorsaSX[rSX-1]} ${getTirid(6, rSX)}<br>
        Oltre il Cancello a destra: ${dati.risorsaDX[rDX-1]} ${getTirid(6, rDX)}</p>
        
        <p class="basepg"><b>#4</b> <span class="titsez">SCALE:</span><br>
        ${dati.scale[sG-1]} di ${dati.livelliScale[sL-1]} ${getTirid(4, sL)}</p>

        <p class="basep"><b>#5</b> <span class="titsez">COLLEGAMENTI:</span><br>
        Davanti a voi c'è una porta di legno aperta<br>
        Il cancello a sinistra è ${dati.statoCancello[cSX-1]} ${getTirid(6, cSX)}<br>
        Il cancello a destra è ${dati.statoCancello[cDX-1]} ${getTirid(6, cDX)}<br><br>
        ${dati.aprirePorta}
        </p>
    `;

    outputDiv.innerHTML = html;
    setTimeout(salvaInCronologia, 1000);
}

// --- 4. GESTIONE RISORSE (Il tasto Lancia D6) ---
let countRicerca = 0;
function lanciaRisorsa(tabella) {
    if (!tabella) return;
    countRicerca++;
    const r = roll(6);
    const el = document.getElementById('el_risorsa');
    const nuovoRisultato = `<br><b>Ricerca n.${countRicerca}</b>: ${tabella[r-1]} ${getTirid(6, r)}`;
    el.innerHTML = nuovoRisultato + el.innerHTML;
}

// --- 5. SALVATAGGIO CRONOLOGIA ---
function salvaInCronologia() {
    let cronologia = JSON.parse(localStorage.getItem('dungeon_history') || "[]");
    let nuovaEntrata = {
        id: Date.now(),
        tipo: document.title,
        testo: document.getElementById('div_main').innerHTML,
        orario: new Date().toLocaleString()
    };
    cronologia.unshift(nuovaEntrata);
    localStorage.setItem('dungeon_history', JSON.stringify(cronologia.slice(0, 50))); // Teniamo le ultime 50
    localStorage.setItem('dungeon_history', JSON.stringify(cronologia));
}
