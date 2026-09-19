// =====================================================================
// MOTORE DEGLI INGRESSI (ingresso-1 ... ingresso-8)
//
// Campi opzionali nei dati dell'ingresso (js/stanze/ingresso-N.js):
//   scale                     testo fisso ("Solo quelle di ingresso") oppure lista indicizzata
//                             dal dado: ["Scendono","Scendono","Salgono","Salgono"] (D4)
//   livelliScale              lista indicizzata dal dado, es. ["1 livello (LVP 0)", ...]
//   senzaScale: true          l'ingresso non ha la sezione SCALE: Collegamenti diventa #4
//   trappolaNessuna: true     mostra "#6 TRAPPOLA: Nessuna"
//   illuminazionePerDescrizione  lista parallela a "descrizioni": la luce dipende dalla
//                             descrizione uscita (se manca si usa "illuminazione")
//   risorsaSX / risorsaDX     cancelli con oggetto (D6 = 6), vedi calcolaCancelliIngresso
// =====================================================================

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

// --- 3. SEZIONI DELL'INGRESSO ---

// Trappola (#6). Restituisce { presente, html }
function calcolaTrappolaIngresso(dati) {
    if (dati.datiTrappola) {
        const tiro = roll(dati.datiTrappola.dado);
        const risultato = dati.datiTrappola.probabilita[tiro - 1];
        
        if (risultato === "PRESENTE") {
            return {
                presente: true,
                html: `<p class="basepg"><b>#6</b> <span class="titsez">TRAPPOLA:</span> PRESENTE ${getTirid(dati.datiTrappola.dado, tiro)}<br>${dati.datiTrappola.dettaglio}</p>`
            };
        }
        return {
            presente: false,
            html: `<p class="basepg"><b>#6</b> <span class="titsez">TRAPPOLA:</span> ASSENTE ${getTirid(dati.datiTrappola.dado, tiro)}</p>`
        };
    }
    if (dati.trappolaNessuna) {
        return {
            presente: false,
            html: `<p class="basepg"><b>#6</b> <span class="titsez">TRAPPOLA:</span> Nessuna</p>`
        };
    }
    return { presente: false, html: "" };
}

// Scale: direzione (dado = numero di voci della lista) e livelli (dado = numero di voci della lista)
function calcolaScaleIngresso(dati) {
    if (Array.isArray(dati.scale) && Array.isArray(dati.livelliScale)) {
        const sG = roll(dati.scale.length);
        const sL = roll(dati.livelliScale.length);
        return `Direzione: ${dati.scale[sG-1]} ${getTirid(dati.scale.length, sG)}` +
               `<br>Livelli: ${dati.livelliScale[sL-1]} ${getTirid(dati.livelliScale.length, sL)}`;
    }
    return dati.scale || "Solo quelle di ingresso";
}

// Cancelli con oggetto (Ingresso 1): D6 = 6 -> c'è un oggetto, scelto con un secondo dado
function calcolaCancelliIngresso(dati) {
    if (!(dati.risorsaSX && dati.risorsaDX)) return "";

    const oggetto = (r, tabella) => {
        if (r !== 6) return `non c'è niente ${getTirid(6, r)}`;
        const t = roll(tabella.length);
        return `c'è ${tabella[t-1]} ${getTirid(6, r)} ${getTirid(tabella.length, t)}`;
    };

    const rSX = roll(6);
    const rDX = roll(6);
    return `<br>Oltre il Cancello a sinistra ${oggetto(rSX, dati.tabellaSpadaLanterna)}` +
           `<br>Oltre il Cancello a destra ${oggetto(rDX, dati.tabellaScudoRazione)}`;
}

// Collegamenti (#5, oppure #4 se l'ingresso non ha le scale)
function calcolaCollegamentiIngresso(dati) {
    let sezione5 = "";
    if (dati.collegamenti && Array.isArray(dati.collegamenti)) {
        dati.collegamenti.forEach(porta => {
            if (porta.statoFisso) {
                sezione5 += `<br>${porta.nome} è <b>${porta.statoFisso}</b><br>`;
            } else {
                const tiro = roll(porta.dado);
                const risultato = porta.probabilita[tiro - 1];
                sezione5 += `<br>${porta.nome} è <b>${risultato}</b> ${getTirid(porta.dado, tiro)}<br>`;
                if (risultato == 'CHIUSA' || risultato == 'CHIUSO') { sezione5 += `<span class="rigas"><br></span>${dati.testoApertura}<br>`; }
            }
        });
    } else if (dati.tabellaPorta) {
        const tP = roll(6);
        sezione5 = `<br>Davanti a voi c'è una porta di legno <b>${dati.tabellaPorta[tP-1].stato}</b> ${getTirid(6, tP)}`;
        if (dati.tabellaPorta[tP-1].conApertura) sezione5 += `<br><br>${dati.testoApertura}`;
    }
    return sezione5;
}

// Descrizione: sceglie una voce a caso (D4) e ne restituisce anche la posizione
function scegliDescrizione(dati) {
    const indice = roll(dati.descrizioni.length) - 1;
    return { indice: indice, testo: dati.descrizioni[indice] };
}

// Illuminazione: se l'ingresso ha "illuminazionePerDescrizione" dipende dalla descrizione uscita
function calcolaIlluminazioneIngresso(dati, indiceDescrizione, haTrappola) {
    let testo = (dati.illuminazionePerDescrizione && dati.illuminazionePerDescrizione[indiceDescrizione]) || dati.illuminazione;
    if (haTrappola && dati.illuminazioneTrappola) {
        testo += `<br><span style="color:#d9534f;"><b>EFFETTO TRAPPOLA:</b> ${dati.illuminazioneTrappola}</span>`;
    }
    return testo;
}

// --- 4. LOGICA DI GENERAZIONE ---
function avviaGenerazione(dati) {
    const outputDiv = document.getElementById('output-area');
    const imgElement = document.querySelector('.img-wrapper img');
    
    if(imgElement && dati.immagine) imgElement.src = dati.immagine;

    // --- TRAPPOLA (calcolata prima: influenza note e illuminazione) ---
    const trappola = calcolaTrappolaIngresso(dati);
    const haTrappola = trappola.presente;

    // --- SCALE (#4) ---
    const testoScale = calcolaScaleIngresso(dati);

    // --- DESCRIZIONE E ILLUMINAZIONE ---
    const descrizione = scegliDescrizione(dati);
    const illuminazioneFinale = calcolaIlluminazioneIngresso(dati, descrizione.indice, haTrappola);

    // --- NOTE DINAMICHE ---
    let noteFinali = dati.note;
    if (haTrappola && dati.notaTrappola) {
        noteFinali += `<br><span style="color:#d9534f;"><b>EFFETTO TRAPPOLA:</b> ${dati.notaTrappola}</span>`;
    }

    // --- EXTRA NOTE (Cancelli Ingresso 1) ---
    const extraNote = calcolaCancelliIngresso(dati);
   
    // --- COLLEGAMENTI ---
    const sezione5 = calcolaCollegamentiIngresso(dati);

    // Numerazione: senza la sezione SCALE, Collegamenti è #4 (e le righe si alternano di colore)
    const numColl = dati.senzaScale ? 4 : 5;
    const classeColl = dati.senzaScale ? "basepg" : "basep";
    const htmlScale = dati.senzaScale ? "" : `<p class="basepg"><b>#4</b> <span class="titsez">SCALE:</span><br>${testoScale}</p>`;

    // Costruzione HTML
    let html = `
        <p class="basep"><b>#1</b> <span class="titsez">DESCRIZIONE:</span><br><span class="descp">"${descrizione.testo}"</span></p>
        <p class="basepg"><b>#2</b> <span class="titsez">ILLUMINAZIONE:</span><br>${illuminazioneFinale}</p>
        <p class="basep"><b>#3</b> <span class="titsez">NOTE:</span><br>${noteFinali}${extraNote}</p>
        ${htmlScale}
        <p class="${classeColl}"><b>#${numColl}</b> <span class="titsez">COLLEGAMENTI:</span>${sezione5}</p>
        ${trappola.html}
    `;

    outputDiv.innerHTML = html;
	
	const nuovoAmbiente = {
        tipo: document.title, // Es: "Ingresso 1"
        testo: document.getElementById('div_main').innerHTML,
        orario: new Date().toLocaleString()
    };
    setTimeout(function () {
		salvaInArchivio(nuovoAmbiente);
	}, 1000);
}

// --- 5. GESTIONE RISORSE (Il tasto Lancia D6) ---
let countRicerca = 0;
function lanciaRisorsa(tabella) {
    const el = document.getElementById('el_risorsa');
    if (countRicerca === 0) {
        el.innerHTML = "";
    }
    countRicerca++;
    const r = roll(6);
    let frase = tabella[r - 1];
    const rigaCompleta = `${frase} ${getTirid(6, r)}`;
    const nuovo = `<br><b>Ricerca n.${countRicerca}</b><br>${rigaCompleta}<br>`;
    el.innerHTML = nuovo + el.innerHTML;
}

// --- 6. SALVATAGGIO CRONOLOGIA (codice non usato: da rimuovere nella pulizia) ---
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

function salvaInArchivio(nuovoAmbiente) {
    const nomeDungeon = localStorage.getItem('current_dungeon_name');
    if (!nomeDungeon) return; // Non salva se non c'è una sessione attiva

    let sessioni = JSON.parse(localStorage.getItem('dungeon_sessions') || "{}");
    
    // Se il dungeon non esiste nell'archivio, lo inizializziamo
    if (!sessioni[nomeDungeon]) {
        sessioni[nomeDungeon] = [];
    }

    // Aggiungiamo la stanza alla sessione corrente
    sessioni[nomeDungeon].push(nuovoAmbiente);
    
    // Salviamo tutto l'oggetto sessioni
    localStorage.setItem('dungeon_sessions', JSON.stringify(sessioni));
}
