const DATI_STANZA = {
    titolo: "STANZA 5V",
    immagini: {
        "1": "assets/51.png",
        "2": "assets/52.png",
        "3": "assets/53.png",
        "4": "assets/54.png",
        "5": "assets/55.png",
        "6": "assets/56.png"
    },
    descrizioni: [
        ["Pali e assi di legno sostengono le pareti", "Statue di Gargoyle appollaiati"],
        ["Il volto di un demone cornuto con la bocca aperta è scolpito nella roccia"],
        ["Teschi e candele disposte su un altarino", "Bizzarre lucciole violacee volano sparse"],
        ["Il suono crepitante di una magia appena scagliata", "Il canto di un Arpia in lontananza"]
    ],

    getNoteSpeciali: function(imgID) {
        let note = "E' possibile accamparsi in questo ambiente.";
        return note;
    },

    // Illuminazione: 1-2 Nessuna, 3-6 Luce fievole
    illuminazione: [
        "Nessuna (visibilità 1.5m)", 
        "Nessuna (visibilità 1.5m)", 
        "Luce fievole (visibilità 6m)", 
        "Luce fievole (visibilità 6m)", 
        "Luce fievole (visibilità 6m)", 
        "Luce fievole (visibilità 6m)"
    ],
    provenienzaLuce: ["da candele quasi spente", "da riverbero di altri ambienti limitrofi"],

    obiettivi: ["SI", "NO", "NO", "NO", "NO", "NO"],
    uscite: ["SI", "NO", "NO", "NO", "NO", "NO"],

    // Forziere: 5-6 SI
    sogliaForziere: 5,
    tabellaForziere: [
        "Trovi... niente, il forziere è vuoto!",
        "Trovi un <b>Tesoro Minore</b> (Vedi p.166)",
        "Trovi un <b>Tesoro Comune</b> (Vedi p.166)",
        "Trovi un <b>Indizio</b> (Vedi p.165)"
    ],
	
	testiScale: { su: "che salgono", giu: "che scendono" },

    // Trappole
    tipoTrappola: [
        "<b>Fiotto d'acido</b> (Danno: Acido, 1D8+3 PF ogni 3 LE del PG, prova PR Difficile 15+ per dimezzare i danni. Corazze di Pelle, Protezioni di Pelle e Scudi di Legno perdono 1D2 DA cad)",
        "<b>Teletrasporto</b> (Il PG e tutte le creature entro 6mt sono teletrasportate all’Ingresso del Dungeon)"
    ],
    statTrappola: "Per Disattivare prova di PR:<br>LEM 1-3 Complicata 10+<br>LEM 4-6 Difficile 15+<br>LEM 7-10 Difficilissima 20+.<br>Per Riarmare: stessa prova ma con Svantaggio.",

    // Incontri (Aumentati a 1-3 SI, 6 Speciale)
    soglieIncontro: { si: 3, speciale: 6 },
    incontri: {
        lem13: ["Creature umanoidi (p. 9)", "Creature magiche (p. 10)", "Creature mostruose (p. 10)", "Creature infestanti (p. 9)", "Creature non-morte (p. 11)"],
        lem46: ["Creature umanoidi (p. 9)", "Creature magiche (p. 10)", "Creature mostruose (p. 10)", "Creature infestanti (p. 9)", "Creature non-morte (p. 11)", "Draghi (p. 11)", "Creature extraplanari (p. 10)"],
        lem710: ["Creature umanoidi (p. 9)", "Creature mostruose (p. 10)", "Creature magiche (p. 10)", "Creature non-morte (p. 11)", "Draghi (p. 11)", "Creature extraplanari (p. 10)"]
    },

    // Collegamenti: Porta metallo invece di legno
    materialePorta: "metallo",
    testoAperturaPorta: "Per Sfondare prova di VR PCN LEM +1 con Svantaggio.<br>Per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>4-6 PCN LEM +2<br>7-10 PCN LEM +4",
    testoAperturaPortone: "Per Sfondare prova di VR PCN LEM +2.<br>Per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +4",

    // Mobilio
    tabellaMobilio: ["ostacolo piccolo", "ostacolo piccolo", "ostacolo piccolo", "ostacolo medio", "ostacolo medio", "ostacolo grande"],

    // Risorse
    tabellaRisorse: [
        "Trovate... niente",
        "Trovate... niente",
        "Trovate... niente",
        "Pezzo di metallo rugginoso. (Con Legno e 2PA in accampamento crei accetta rudimentale: +1 PE)",
        "Pezzo di metallo rugginoso. (Con Legno e 2PA in accampamento crei accetta rudimentale: +1 PE)",
        "Trovate dei pezzi di legno (usabili come 1D4 torce, durata 1 ora)"
    ]
};

window.onload = () => avviaStanza(DATI_STANZA);