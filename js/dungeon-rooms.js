// =====================================================================
// MOTORE DELLE STANZE (stanza-1v ... stanza-6v)
//
// Le regole che cambiano da stanza a stanza si leggono dai dati della
// stanza (js/stanze/stanza-NV.js). Se un parametro manca, vale il
// comportamento "standard" indicato tra parentesi:
//
//   pagina              testo mostrato nel titolo, es. "p.147"
//   sogliaForziere      il forziere c'è se il D6 è >= soglia        (6)
//   soglieCollegamenti  ultimo valore D6 per ogni tipo, es.
//                       { nessuna: 1, porta: 4, arco: 5, portone: 6 }
//   sogliaPortaChiusa   porta/portone CHIUSO se il D6 è <= soglia   (2)
//   sogliaScale         le scale ci sono se il D6 è <= soglia       (2)
//   livelliScale        { dado: N, bonus: B }  = 1DN+B livelli      (1D3)
//   tipiScale           lista indicizzata dal D4 (opzionale)
//   soglieIncontro      { si: N, speciale: 6 }  (speciale opzionale)
//   sogliaTipoTrappola  il primo tipo di trappola esce se D6 <= soglia (3)
//   sogliaMobilio       mobilio presente se il D6 è <= soglia       (1)
//   provenienzaLuceNm   provenienze per la luce con visibilità N m
//   provenienzaLuce     provenienze generiche (se manca quella per N m)
//   obiettivi / uscite  se mancano: OBIETTIVO e USCITA sono sempre NO
//
// tipoTrappola[i] può essere un testo oppure una funzione(rTipo) che
// restituisce il testo completo (usata dalla "Parete scorrevole" 4V).
// =====================================================================

// --- 1. UTILITÀ ---
const roll = (sides) => Math.floor(Math.random() * sides) + 1;
const getTirid = (sides, result, mod = "") => `<span class="tirid">D${sides} = ${result}${mod}</span>`;
const selectOne = (arr) => arr[Math.floor(Math.random() * arr.length)];

// --- 2. LOGICA DI GENERAZIONE ---
function avviaStanza(dati) {
    const urlParams = new URLSearchParams(window.location.search);
    const imgID = urlParams.get('img') || "1";
    
    // Riferimenti DOM
    const output1 = document.getElementById('output-area-1');
    const output2 = document.getElementById('output-area-2');
    const imgElement = document.querySelector('.img-wrapper img');
    const titElement = document.querySelector('.tithead');

    // Setup Immagine e Titolo dinamico (la pagina del manuale è nei dati della stanza)
    if(imgElement && dati.immagini) imgElement.src = dati.immagini[imgID];
    if(titElement) titElement.innerText = `${dati.titolo} - ${imgID}${dati.pagina ? " (" + dati.pagina + ")" : ""}`;

    // --- SEZIONE 1-4 ---
    const luce = calcolaIlluminazione(dati);

    // Costruiamo la descrizione: prima scegliamo il gruppo (D4)...
	const indiceGruppo = roll(dati.descrizioni.length);
	const gruppoScelto = dati.descrizioni[indiceGruppo - 1];

	// ...poi UNA frase all'interno del gruppo scelto
	const indiceFrase = roll(gruppoScelto.length);
	const fraseFinale = gruppoScelto[indiceFrase - 1];

	// Obiettivo e uscita: se la stanza non ha le tabelle sono sempre NO (nessun tiro)
	const rObiettivo = roll(6);
    const rUscita = roll(6);
    const testoObiettivo = dati.obiettivi ? `${dati.obiettivi[rObiettivo-1]} ${getTirid(6, rObiettivo)}` : "NO";
    const testoUscita = dati.uscite ? `${dati.uscite[rUscita-1]} ${getTirid(6, rUscita)}` : "NO";

	const noteDaMostrare = dati.getNoteSpeciali ? dati.getNoteSpeciali(imgID, fraseFinale) : (dati.note || "E' possibile accamparsi in questo ambiente.");
	
    let html1 = `
        <p class="basep"><b>#1</b> <span class="titsez">DESCRIZIONE:</span><br><span class="descp">"${fraseFinale}."</span></p>
        <p class="basepg"><b>#2</b> <span class="titsez">ILLUMINAZIONE:</span><br>${luce.testo} ${getTirid(6, luce.tiro)}</p>
		<p class="basep"><b>#3</b> <span class="titsez">OBIETTIVO:</span> ${testoObiettivo}</p>
        <p class="basepg"><b>#4</b> <span class="titsez">USCITA:</span> ${testoUscita}</p>
    `;

    // --- SEZIONE 5: FORZIERE ---
    document.getElementById('sezione-forziere').innerHTML = calcolaForziere(dati);

    // --- SEZIONE 6-11 ---
	let html2 = `
        <p class="basepg"><b>#6</b> <span class="titsez">NOTE:</span><br>${noteDaMostrare}</p>
        <p class="basep"><b>#7</b> <span class="titsez">TRAPPOLA:</span> ${calcolaTrappola(dati)}</p>
        <p class="basepg"><b>#8</b> <span class="titsez">SCALE:</span> ${calcolaScale(dati)}</p>
        <p class="basep"><b>#9</b> <span class="titsez">INCONTRO:</span> ${generaIncontro(dati)}</p>
        <p class="basepg"><b>#10</b> <span class="titsez">COLLEGAMENTI e PASSAGGI SEGRETI:</span> ${calcolaCollegamenti(dati)}</p>
        <p class="basep"><b>#11</b> <span class="titsez">MOBILIO:</span> ${calcolaMobilio(dati)}</p>
    `;

    output1.innerHTML = html1;
    output2.innerHTML = html2;

	const nuovoAmbiente = {
        tipo: document.title, // Es: "Stanza 1V"
        testo: document.getElementById('div_main').innerHTML,
        orario: new Date().toLocaleString()
    };
    setTimeout(function () {
		salvaInArchivio(nuovoAmbiente);
	}, 1000);
}

// --- 3. FUNZIONI DI SUPPORTO ---

// Illuminazione: tira un D6, sceglie il testo e, se c'è luce, aggiunge la provenienza.
// La provenienza si cerca prima in "provenienzaLuce<N>m" (N = visibilità in metri,
// es. provenienzaLuce6m) e poi nella lista generica "provenienzaLuce".
function calcolaIlluminazione(dati) {
    const rLuce = roll(6);
    let testo = dati.illuminazione[rLuce - 1];

    if (!/^\s*nessuna/i.test(testo)) {
        const m = testo.match(/([\d.,]+)m\)/);
        const listaSpecifica = m ? dati["provenienzaLuce" + m[1] + "m"] : null;
        const lista = listaSpecifica || dati.provenienzaLuce;
        if (lista) testo += " " + selectOne(lista);
    }
    return { testo: testo, tiro: rLuce };
}

// Forziere: presente se il D6 è >= sogliaForziere (standard: solo con 6)
function calcolaForziere(d) {
    const rForz = roll(6);
    const soglia = d.sogliaForziere || 6;
    if (rForz >= soglia) {
        return `SI ${getTirid(6, rForz)}<br>Chi apre: <button class="dungeon-btn" onclick="apriForziere()">Lancia D4</button>`;
    }
    return `NO ${getTirid(6, rForz)}`;
}

function calcolaTrappola(d) {
    const r = roll(6);
    if (r >= 3 && r <= 5) return `NO ${getTirid(6, r)}`;
    let stato = (r === 6) ? "SI e già SCATTATA" : "SI";
    
    const rTipo = roll(6);
    // Il primo tipo esce con D6 <= sogliaTipoTrappola (standard 3: 1-3 primo tipo, 4-6 secondo)
    const soglia = d.sogliaTipoTrappola || 3;
    const voce = (rTipo <= soglia) ? d.tipoTrappola[0] : d.tipoTrappola[1];

    // La voce può essere un testo oppure una funzione che restituisce il testo completo
    const tipoTesto = (typeof voce === "function") ? voce(rTipo) : `${voce} ${getTirid(6, rTipo)}`;

    return `${stato} ${getTirid(6, r)}<br>${tipoTesto}<br><br>${d.statTrappola}`;
}

// Scale: presenti se D6 <= sogliaScale. Poi: tipo (D4, opzionale), direzione (D4), livelli (1DN+B)
function calcolaScale(d) {
    const r = roll(6);
    const soglia = d.sogliaScale || 2; // Standard: 1-2
    if (r > soglia) return `NO ${getTirid(6, r)}`;

    let out = `SI ${getTirid(6, r)}`;

    // Tipo di scale (solo per le stanze che lo prevedono)
    if (d.tipiScale) {
        const rTipo = roll(d.tipiScale.length);
        out += `<br>Tipo: ${d.tipiScale[rTipo - 1]} ${getTirid(d.tipiScale.length, rTipo)}`;
    }

    // Direzione: D4, 1-2 scendono / 3-4 salgono
    const rDir = roll(4);
    out += `<br>Direzione: ${rDir <= 2 ? "Scendono" : "Salgono"} ${getTirid(4, rDir)}`;

    // Livelli: 1DN+B (standard 1D3); LVP = numero di livelli
    const cfg = d.livelliScale || { dado: 3, bonus: 0 };
    const rLiv = roll(cfg.dado);
    const liv = rLiv + (cfg.bonus || 0);
    const mod = cfg.bonus ? ` +${cfg.bonus}` : "";
    out += `<br>Livelli: ${liv} (LVP ${liv}) ${getTirid(cfg.dado, rLiv, mod)}`;

    return out;
}

// (codice non usato: da rimuovere nella pulizia)
function calcolaScalexxx() {
    const r = roll(6);
    if (r > 1) return `NO ${getTirid(6, r)}`;
    const tipo = selectOne(["scale che salgono", "scale che scendono"]);
    const liv = selectOne(["1 livello (LVP 1)", "2 livelli (LVP 2)"]);
    return `SI ${getTirid(6, 1)}, ${tipo} di ${liv}`;
}

// (codice non usato: da rimuovere nella pulizia)
function calcolaIncontro(d) {
    const r = roll(6);
    if (r > 1) return `NO ${getTirid(6, r)}`;
    return `SI ${getTirid(6, 1)}<br><br>LEM 1-3: ${d.incontri.lem13}<br>LEM 4-6: ${d.incontri.lem46}<br>LEM 7-10: ${d.incontri.lem710}<br><small>(Vedi Bestiario)</small>`;
}

// --- FUNZIONE INCONTRO ---
// Soglie da "soglieIncontro": { si: N, speciale: 6 }  ->  D6 <= si = SI, D6 = speciale = SPECIALE, altrimenti NO.
// Compatibilità: senza "soglieIncontro", regolaIncontroSpeciale = true vale { si: 2, speciale: 6 }, altrimenti { si: 1 }.
function generaIncontro(d) {
    const r = roll(6);

    let si, speciale;
    if (d.soglieIncontro) {
        si = d.soglieIncontro.si;
        speciale = d.soglieIncontro.speciale;
    } else if (d.regolaIncontroSpeciale) {
        si = 2; speciale = 6;
    } else {
        si = 1; speciale = 0;
    }

    if (speciale && r === speciale) {
        return `<b>SPECIALE</b> ${getTirid(6, r)}<br><br>Lanciare D66 sulla tabella Ambienti Speciali (p.151)`;
    }
    if (r > si) return `NO ${getTirid(6, r)}`;
    
    // Se siamo qui, il risultato è un incontro standard (SI)
    if (!d.incontri) return `SI ${getTirid(6, r)} <br> [Dati incontri mancanti]`;

    const pesca = (lista) => {
        const t = roll(lista.length);
        return `${lista[t-1]} ${getTirid(lista.length, t)}`;
    };

    return `SI ${getTirid(6, r)}<br><br>
            <b>LEM 1-3:</b> ${pesca(d.incontri.lem13)}<br>
            <b>LEM 4-6:</b> ${pesca(d.incontri.lem46)}<br>
            <b>LEM 7-10:</b> ${pesca(d.incontri.lem710)}<br>
            <small>(Le pagine si riferiscono al Bestiario)</small>`;
}

// --- FUNZIONE MOBILIO DINAMICA ---
function calcolaMobilio(d) {
    const r = roll(6);
    
    // Soglia di presenza: presente se il D6 è <= soglia (Stanza 1 = solo con 1, Stanza 2 = con 1 e 2, ...)
    const soglia = d.sogliaMobilio || 1; 

    if (r > soglia) return `ASSENTE ${getTirid(6, r)}`;

    // Se presente, pesca dalla tabella specifica della stanza (come per il forziere)
    if (!d.tabellaMobilio) return `PRESENTE ${getTirid(6, r)} <br> [Tabella mobilio mancante]`;
    
    const rTipo = roll(d.tabellaMobilio.length);
    const tipoScelto = d.tabellaMobilio[rTipo - 1];

    return `PRESENTE ${getTirid(6, r)} (${tipoScelto}) ${getTirid(d.tabellaMobilio.length, rTipo)}<br><small>(Vedi p.102)</small>`;
}

// (codice non usato: da rimuovere nella pulizia)
function calcolaMobilioxxx(d) {
    const r = roll(6);
    const soglia = d.sogliaMobilio || 1; // Default a 1 se non specificato
    if (r > soglia) return `ASSENTE ${getTirid(6, r)}`;
    
    const tipo = selectOne(d.tabellaMobilio);
    return `PRESENTE ${getTirid(6, r)} (${tipo})<br><small>(Vedi p.102)</small>`;
}

// --- FUNZIONE COLLEGAMENTI ---
// "soglieCollegamenti" contiene l'ULTIMO valore del D6 di ogni tipo:
//   { nessuna: 1, porta: 4, arco: 5, portone: 6 }  =  1 nessuna, 2-4 porta, 5 arco, 6 portone
// "sogliaPortaChiusa": porta/portone CHIUSO se D6 <= soglia (standard 2), altrimenti APERTO.
function calcolaCollegamenti(d) {
    const pareti = ["Parete a sinistra", "Parete davanti", "Parete a destra"];
    let out = "";
    
    // Recupera il materiale dal file della stanza o usa "legno" di default
    const materiale = d.materialePorta || "legno";
    const sg = d.soglieCollegamenti || { nessuna: 1, porta: 4, arco: 5, portone: 6 };
    const chiusaFinoA = (d.sogliaPortaChiusa !== undefined) ? d.sogliaPortaChiusa : 2;

    pareti.forEach(p => {
        const r = roll(6);
        let ris = "";

        if (r <= sg.nessuna) {
            ris = `Nessuna porta ${getTirid(6, r)}`;
        } else if (r <= sg.porta) {
            ris = `c'è una porta di ${materiale} ${getTirid(6, r)} ` + generaStatoPorta(d.testoAperturaPorta, chiusaFinoA);
        } else if (r <= sg.arco) {
            ris = `c'è un arco di passaggio ${getTirid(6, r)}`;
        } else {
            ris = `c'è un portone ${getTirid(6, r)} ` + generaStatoPortone(d.testoAperturaPortone, chiusaFinoA);
        }

        out += `<br><br><i>${p}:</i><br>${ris}`;
    });

    const rS = roll(6);
    out += `<br><br><i>Passaggi segreti:</i> ` + (rS === 1 ? `PRESENTE ${getTirid(6,1)} (Tabella p.150)` : `ASSENTE ${getTirid(6, rS)}`);
    return out;
}

function generaStatoPorta(testo, chiusaFinoA = 2) {
    const r = roll(6);
    if (r > chiusaFinoA) return `<b>APERTA</b> ${getTirid(6, r)}`;
    return `<b>CHIUSA</b> ${getTirid(6, r)}<br>${testo}`;
}

function generaStatoPortone(testo, chiusaFinoA = 2) {
    const r = roll(6);
    if (r > chiusaFinoA) return `<b>APERTO</b> ${getTirid(6, r)}`;
    return `<b>CHIUSO</b> ${getTirid(6, r)}<br>${testo}`;
}

function apriForziere() {
    // Controlliamo se la tabella esiste nel file della stanza
    if (!DATI_STANZA.tabellaForziere) {
        document.getElementById('el_risorsaf').innerHTML = "<br>Errore: Tabella forziere non trovata.";
        return;
    }

    const tab = DATI_STANZA.tabellaForziere;
    const r = roll(tab.length);
    
    document.getElementById('el_risorsaf').innerHTML = `
        <br><span class="spantab"></span>
        ${tab[r-1]} ${getTirid(tab.length, r)}
    `;
}

let countRicerca = 0;
function lanciaRisorsa(tabella) {
    countRicerca++;
    const r = roll(6);
    const el = document.getElementById('el_risorsa');
    
    // Pesca la frase dalla tabella
    let frase = tabella[r - 1];
    
    // Aggiunge il chip del dado in fondo
    const rigaCompleta = `${frase} ${getTirid(6, r)}`;
    
    // Crea il nuovo elemento nella lista delle ricerche
    const nuovo = `<br><b>Ricerca n.${countRicerca}</b>: ${rigaCompleta}`;
    
    // Visualizza (l'ultima ricerca appare in alto)
    el.innerHTML = nuovo + el.innerHTML;
}

// (codice non usato: da rimuovere nella pulizia)
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
