// --- 1. UTILITÀ ---
const roll = (sides) => Math.floor(Math.random() * sides) + 1;
const getTirid = (sides, result) => `<span class="tirid">D${sides} = ${result}</span>`;
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

    // Setup Immagine e Titolo dinamico
    if(imgElement && dati.immagini) imgElement.src = dati.immagini[imgID];
    if(titElement) titElement.innerText = `${dati.titolo} - ${imgID} (p.144)`;

    // --- SEZIONE 1-4 ---
	const rLuce = roll(6);
    let testoLuce = dati.illuminazione[rLuce-1];
    
    // Gestione provenienza dinamica (Stanza 4 ha 6m e 9m diverse)
    if (testoLuce.includes("6m") && dati.provenienzaLuce6m) {
        testoLuce += " " + selectOne(dati.provenienzaLuce6m);
    } else if (testoLuce.includes("9m") && dati.provenienzaLuce9m) {
        testoLuce += " " + selectOne(dati.provenienzaLuce9m);
    } else if (rLuce >= 5 && dati.provenienzaLuce) {
        testoLuce += " " + selectOne(dati.provenienzaLuce);
    }

    // Costruiamo la descrizione unendo un elemento da ogni gruppo
	const indiceGruppo = roll(dati.descrizioni.length);
	const gruppoScelto = dati.descrizioni[indiceGruppo - 1];

	// 2. Scegliamo UNA frase all'interno del gruppo scelto
	const indiceFrase = roll(gruppoScelto.length);
	const fraseFinale = gruppoScelto[indiceFrase - 1];

	// 3. Creiamo il testo con i riferimenti ai dadi (D4 per il gruppo, DX per la frase)
	//const debugDadi = `${getTirid(dati.descrizioni.length, indiceGruppo)} ${getTirid(gruppoScelto.length, indiceFrase)}`;
	const rObiettivo = roll(6);
    const rUscita = roll(6);
    const testoObiettivo = dati.obiettivi ? dati.obiettivi[rObiettivo-1] : "NO";
    const testoUscita = dati.uscite ? dati.uscite[rUscita-1] : "NO";

	const noteDaMostrare = dati.getNoteSpeciali ? dati.getNoteSpeciali(imgID, fraseFinale) : (dati.note || "E' possibile accamparsi in questo ambiente.");
	
    let html1 = `
        <p class="basep"><b>#1</b> <span class="titsez">DESCRIZIONE:</span><br><span class="descp">"${fraseFinale}."</span></p>
        <p class="basepg"><b>#2</b> <span class="titsez">ILLUMINAZIONE:</span><br>${testoLuce} ${getTirid(6, rLuce)}</p>
		<p class="basep"><b>#3</b> <span class="titsez">OBIETTIVO:</span> ${testoObiettivo} ${getTirid(6, rObiettivo)}</p>
        <p class="basepg"><b>#4</b> <span class="titsez">USCITA:</span> ${testoUscita} ${getTirid(6, rUscita)}</p>
    `;

    // --- SEZIONE 5: FORZIERE ---
    const rForz = roll(6);
    const sezForziere = document.getElementById('sezione-forziere');
    if (rForz === 6) {
        sezForziere.innerHTML = `SI ${getTirid(6, 6)}<br>Chi apre: <button class="dungeon-btn" onclick="apriForziere()">Lancia D4</button>`;
    } else {
        sezForziere.innerHTML = `NO ${getTirid(6, rForz)}`;
    }

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

    // Salvataggio automatico per cronologia
	console.log(typeof salvaInCronologia);
    if (typeof salvaInCronologia === "function") setTimeout(salvaInCronologia, 1000);
}

// --- 3. FUNZIONI DI SUPPORTO ---
function calcolaTrappola(d) {
    const r = roll(6);
    if (r >= 3 && r <= 5) return `NO ${getTirid(6, r)}`;
    let stato = (r === 6) ? "SI e già SCATTATA" : "SI";
    
    const rTipo = roll(6);
    let tipoTesto = "";
    
    // Per Stanza 5: 1-4 Acido, 5-6 Teletrasporto
    if (d.titolo === "STANZA 5V") {
        tipoTesto = (rTipo <= 4) ? d.tipoTrappola[0] : d.tipoTrappola[1];
    } else {
        // Logica standard per le altre stanze
        tipoTesto = (rTipo <= 3) ? d.tipoTrappola[0] : d.tipoTrappola[1];
    }

    return `${stato} ${getTirid(6, r)}<br>${tipoTesto} ${getTirid(6, rTipo)}<br><br>${d.statTrappola}`;
}

function calcolaScalexxx() {
    const r = roll(6);
    if (r > 1) return `NO ${getTirid(6, r)}`;
    const tipo = selectOne(["scale che salgono", "scale che scendono"]);
    const liv = selectOne(["1 livello (LVP 1)", "2 livelli (LVP 2)"]);
    return `SI ${getTirid(6, 1)}, ${tipo} di ${liv}`;
}

// Modifica calcolaScale per usare la soglia della stanza
function calcolaScale(d) {
    const r = roll(6);
    const soglia = d.sogliaScale || 2; // Default 2 (per stanze 1-5)
    if (r > soglia) return `NO ${getTirid(6, r)}`;
    
    const suGiu = roll(2) === 1 ? d.testiScale.su : d.testiScale.giu;
    const liv = roll(3); // 1-3 livelli
    return `SI ${getTirid(6, r)}, ${suGiu} di ${liv} livelli (LVP ${liv})`;
}

function calcolaIncontro(d) {
    const r = roll(6);
    if (r > 1) return `NO ${getTirid(6, r)}`;
    return `SI ${getTirid(6, 1)}<br><br>LEM 1-3: ${d.incontri.lem13}<br>LEM 4-6: ${d.incontri.lem46}<br>LEM 7-10: ${d.incontri.lem710}<br><small>(Vedi Bestiario)</small>`;
}
// --- FUNZIONE INCONTRO DINAMICA ---
function generaIncontro(d) {
    const r = roll(6);
    
    // Controlla se la stanza ha la regola "Speciale" (Stanza 2) o quella standard (Stanza 1)
    if (d.regolaIncontroSpeciale) {
        // Logica Stanza 2: 1-2 SI, 3-5 NO, 6 SPECIALE
        if (r >= 3 && r <= 5) return `NO ${getTirid(6, r)}`;
        if (r === 6) return `<b>SPECIALE</b> ${getTirid(6, 6)}<br><br>Lanciare D66 sulla tabella Ambienti Speciali (p.151)`;
    } else {
        // Logica Stanza 1: 1 SI, 2-6 NO
        if (r > 1) return `NO ${getTirid(6, r)}`;
    }
    
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
    
    // Determina la soglia di presenza (Stanza 1 = solo con 1, Stanza 2 = con 1 e 2)
    const soglia = d.sogliaMobilio || 1; 

    if (r > soglia) return `ASSENTE ${getTirid(6, r)}`;

    // Se presente, pesca dalla tabella specifica della stanza (come per il forziere)
    if (!d.tabellaMobilio) return `PRESENTE ${getTirid(6, r)} <br> [Tabella mobilio mancante]`;
    
    const rTipo = roll(d.tabellaMobilio.length);
    const tipoScelto = d.tabellaMobilio[rTipo - 1];

    return `PRESENTE ${getTirid(6, r)} (${tipoScelto}) ${getTirid(d.tabellaMobilio.length, rTipo)}<br><small>(Vedi p.102)</small>`;
}

function calcolaMobilioxxx(d) {
    const r = roll(6);
    const soglia = d.sogliaMobilio || 1; // Default a 1 se non specificato
    if (r > soglia) return `ASSENTE ${getTirid(6, r)}`;
    
    const tipo = selectOne(d.tabellaMobilio);
    return `PRESENTE ${getTirid(6, r)} (${tipo})<br><small>(Vedi p.102)</small>`;
}

// --- FUNZIONE calcolaCollegamenti AGGIORNATA ---
function calcolaCollegamenti(d) {
    const pareti = ["Parete a sinistra", "Parete davanti", "Parete a destra"];
    let out = "";
    
    // Recupera il materiale dal file della stanza o usa "legno" di default
    const materiale = d.materialePorta || "legno";

    pareti.forEach(p => {
        const r = roll(6);
        let ris = "";

        if (r === 1) {
            ris = `Nessuna porta ${getTirid(6, r)}`;
        } else if (r >= 2 && r <= 4) {
            // Usa la variabile materiale qui
            ris = `c'è una porta di ${materiale} ${getTirid(6, r)} ` + generaStatoPorta(d.testoAperturaPorta);
        } else if (r === 5) {
            ris = `c'è un arco di passaggio ${getTirid(6, r)}`;
        } else if (r === 6) {
            ris = `c'è un portone ${getTirid(6, r)} ` + generaStatoPortone(d.testoAperturaPortone);
        }

        out += `<br><br><i>${p}:</i><br>${ris}`;
    });

    const rS = roll(6);
    out += `<br><br><i>Passaggi segreti:</i> ` + (rS === 1 ? `PRESENTE ${getTirid(6,1)} (Tabella p.150)` : `ASSENTE ${getTirid(6, rS)}`);
    return out;
}

function generaStatoPorta(testo) {
    const r = roll(6);
    if (r > 2) return `<b>APERTA</b> ${getTirid(6, r)}`;
    return `<b>CHIUSA</b> ${getTirid(6, r)}<br>${testo}`;
}

function generaStatoPortone(testo) {
    const r = roll(6);
    if (r > 2) return `<b>APERTO</b> ${getTirid(6, r)}`;
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