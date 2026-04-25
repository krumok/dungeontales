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

    let testoScale = "";
    if (Array.isArray(dati.scale) && Array.isArray(dati.livelliScale)) {
        // Caso Ingresso 1: Tira i dadi
        const sG = roll(dati.scale.length); // 1 o 2 (salgono o scendono)
        const sL = roll(dati.livelliScale.length); // da 1 a 4
        testoScale = `${dati.scale[sG-1]} di ${dati.livelliScale[sL-1]} ${getTirid(4, sL)}`;
    } else {
        // Caso Ingresso 2: Testo fisso
        testoScale = dati.scale;
    }

    let extraNote = "";
    if (dati.risorsaSX && dati.risorsaDX) {
        const rSX = roll(6);
        const rDX = roll(6);
        // Se esce 6 pesca dalle tabelle specifiche, altrimenti "non c'è niente"
        const itemSX = rSX === 6 ? "c'è " + selectOne(dati.tabellaSpadaLanterna) : "non c'è niente";
        const itemDX = rDX === 6 ? "c'è" + selectOne(dati.tabellaScudoRazione) : "non c'è niente";
        
        extraNote = `<br>Oltre il Cancello a sinistra ${itemSX} ${getTirid(6, rSX)}
                     <br>Oltre il Cancello a destra ${itemDX} ${getTirid(6, rDX)}`;
    }
   
    let sezione5 = "";

    if (dati.collegamenti && Array.isArray(dati.collegamenti)) {
        // Logica Universale: cicla su ogni porta definita
        dati.collegamenti.forEach(porta => {
            if (porta.statoFisso) {
                sezione5 += `${porta.nome} è <b>${porta.statoFisso}</b><br>`;
            } else {
                const tiro = roll(porta.dado);
                const risultato = porta.probabilita[tiro - 1];
                sezione5 += `${porta.nome} è <b>${risultato}</b> ${getTirid(porta.dado, tiro)}<br>`;
                if (risultato=='CHIUSA') { sezione5 += `<br><br>${dato.testoApertura}`; }
            }
        });
    }
    else if (dati.tabellaPorta) {
        const tP = roll(6);
        sezione5 = `Davanti a voi c'è una porta di legno <b>${dati.tabellaPorta[tP-1].stato}</b> ${getTirid(6, tP)}`;
        if (dati.tabellaPorta[tP-1].conApertura) sezione5 += `<br><br>${dati.testoApertura}`;
    } else if (dati.statoCancello) {
        const cSX = roll(6); const cDX = roll(6);
        sezione5 = `Davanti a voi c'è una porta di legno aperta<br>
                    Il cancello a sinistra è ${dati.statoCancello[cSX-1]} ${getTirid(6, cSX)}<br>
                    Il cancello a destra è ${dati.statoCancello[cDX-1]} ${getTirid(6, cDX)}<br><br>
                    ${dati.aprirePorta}`;
    }

    // Costruzione HTML dinamica
    let html = `
        <p class="basep"><b>#1</b> <span class="titsez">DESCRIZIONE:</span><br><span class="descp">"${selectOne(dati.descrizioni)}"</span></p>
        <p class="basepg"><b>#2</b> <span class="titsez">ILLUMINAZIONE:</span><br>${dati.illuminazione}</p>
        <p class="basep"><b>#3</b> <span class="titsez">NOTE:</span><br>${dati.note}${extraNote}</p>
        <p class="basepg"><b>#4</b> <span class="titsez">SCALE:</span><br>${testoScale}</p>
        <p class="basep"><b>#5</b> <span class="titsez">COLLEGAMENTI:</span><br>${sezione5}</p>
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
