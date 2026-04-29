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
const selectOne = (arr) => {
    if (!arr || arr.length === 0) return "<span style=''>ERRORE: Lista mancante</span>"; 
    return arr[Math.floor(Math.random() * arr.length)];
};

// --- 3. LOGICA DI GENERAZIONE ---
function avviaGenerazione(dati) {
    const outputDiv = document.getElementById('output-area');
    const imgElement = document.querySelector('.img-wrapper img');
    
    if(imgElement && dati.immagine) imgElement.src = dati.immagine;

    // --- 1. CALCOLO TRAPPOLA (Anticipato) ---
    let haTrappola = false;
    let sezioneTrappola = "";
    let tiroTrappola = 0;

    if (dati.datiTrappola) {
        tiroTrappola = roll(dati.datiTrappola.dado);
        const risultatoT = dati.datiTrappola.probabilita[tiroTrappola - 1];
        
        if (risultatoT === "PRESENTE") {
            haTrappola = true;
            sezioneTrappola = `<p class="basepg"><b>#6</b> <span class="titsez">TRAPPOLA:</span> PRESENTE ${getTirid(dati.datiTrappola.dado, tiroTrappola)}<br>${dati.datiTrappola.dettaglio}</p>`;
        } else {
            sezioneTrappola = `<p class="basepg"><b>#6</b> <span class="titsez">TRAPPOLA:</span> ASSENTE ${getTirid(dati.datiTrappola.dado, tiroTrappola)}</p>`;
        }
    }

    // --- 2. SCALE (#4) ---
    let testoScale = "";
    if (Array.isArray(dati.scale) && Array.isArray(dati.livelliScale)) {
        const sG = roll(dati.scale.length);
        const sL = roll(dati.livelliScale.length);
        testoScale = `${dati.scale[sG-1]} di ${dati.livelliScale[sL-1]} ${getTirid(dati.livelliScale.length == 2 ? 2 : 4, sL)}`;
    } else {
        testoScale = dati.scale || "Solo quelle di ingresso";
    }

    // --- 3. NOTE E ILLUMINAZIONE DINAMICHE ---
    // Se la trappola c'è, aggiungiamo i testi extra (se definiti nel file della stanza)
    let noteFinali = dati.note;
    if (haTrappola && dati.notaTrappola) {
        noteFinali += `<br><span style="color:#d9534f;"><b>ATTENZIONE:</b> ${dati.notaTrappola}</span>`;
    }

    let illuminazioneFinale = dati.illuminazione;
    if (haTrappola && dati.illuminazioneTrappola) {
        illuminazioneFinale += `<br><span style="color:#d9534f;"><b>EFFETTO TRAPPOLA:</b> ${dati.illuminazioneTrappola}</span>`;
    }

    // --- 4. EXTRA NOTE (Cancelli Ingresso 1) ---
    let extraNote = "";
    if (dati.risorsaSX && dati.risorsaDX) {
        const rSX = roll(6); const rDX = roll(6);
        const itemSX = rSX === 6 ? "c'è " + selectOne(dati.tabellaSpadaLanterna) : "non c'è niente";
        const itemDX = rDX === 6 ? "c'è " + selectOne(dati.tabellaScudoRazione) : "non c'è niente";
        extraNote = `<br>Oltre il Cancello a sinistra ${itemSX} ${getTirid(6, rSX)}<br>Oltre il Cancello a destra ${itemDX} ${getTirid(6, rDX)}`;
    }
   
    // --- 5. COLLEGAMENTI (#5) ---
    let sezione5 = "";
    if (dati.collegamenti && Array.isArray(dati.collegamenti)) {
        dati.collegamenti.forEach(porta => {
            if (porta.statoFisso) {
                sezione5 += `<br>${porta.nome} è <b>${porta.statoFisso}</b><br>`;
            } else {
                const tiro = roll(porta.dado);
                const risultato = porta.probabilita[tiro - 1];
                sezione5 += `<br>${porta.nome} è <b>${risultato}</b> ${getTirid(porta.dado, tiro)}<br>`;
                if (risultato == 'CHIUSA') { sezione5 += `<span class="rigas"><br></span>${dati.testoApertura}<br>`; }
            }
        });
    } else if (dati.tabellaPorta) {
        const tP = roll(6);
        sezione5 = `<br>Davanti a voi c'è una porta di legno <b>${dati.tabellaPorta[tP-1].stato}</b> ${getTirid(6, tP)}`;
        if (dati.tabellaPorta[tP-1].conApertura) sezione5 += `<br><br>${dati.testoApertura}`;
    }

    // Costruzione HTML
    let html = `
        <p class="basep"><b>#1</b> <span class="titsez">DESCRIZIONE:</span><br><span class="descp">"${selectOne(dati.descrizioni)}"</span></p>
        <p class="basepg"><b>#2</b> <span class="titsez">ILLUMINAZIONE:</span><br>${illuminazioneFinale}</p>
        <p class="basep"><b>#3</b> <span class="titsez">NOTE:</span><br>${noteFinali}${extraNote}</p>
        <p class="basepg"><b>#4</b> <span class="titsez">SCALE:</span><br>${testoScale}</p>
        <p class="basep"><b>#5</b> <span class="titsez">COLLEGAMENTI:</span>${sezione5}</p>
        ${sezioneTrappola}
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
