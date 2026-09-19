const DATI_STANZA = {
    titolo: "STANZA 1V",
    pagina: "p.144",
    immagini: {
        "1": "assets/11.png",
        "2": "assets/12.png",
        "3": "assets/13.png",
        "4": "assets/14.png",
        "5": "assets/15.png",
        "6": "assets/16.png"
    },
	descrizioni: [
		["Odore di carne bruciata e sangue fresco", "Sentite un intenso profumo di incensi e spezie", "Filtra acqua dal soffitto"], // Gruppo 1
		["Sottili ragnatele vi si appiccicano addosso", "Il pavimento brulica di insetti", "C'è un forte odore di bruciato"],       // Gruppo 2
		["Un rumore lontano di pietra che struscia su pietra", "Sentite un rumore di pietre che rotolano"],                      // Gruppo 3
		["Occhi fluorescenti e malevoli vi fissano dal buio per poi svanire nel nulla!"]                                         // Gruppo 4
	],

    // Illuminazione: 1-4 Nessuna, 5 Scarsa (3m), 6 Fievole (6m)
    illuminazione: ["Nessuna (1.5m)", "Nessuna (1.5m)", "Nessuna (1.5m)", "Nessuna (1.5m)", "Luce scarsa (3m)", "Luce fievole (6m)"],
    provenienzaLuce3m: ["da fenditure nelle pareti", "da riverbero di altri ambienti limitrofi"],
    provenienzaLuce6m: ["da candele quasi spente", "da riverbero di altri ambienti limitrofi"],

    // Obiettivo e Uscita: sempre NO (nessuna tabella = nessun tiro)

    // In questa stanza NON ci si può accampare
    note: "Non è possibile accamparsi in questo ambiente.",

    // Forziere: 1-5 NO / 6 SI
    sogliaForziere: 6,

	materialePorta: "legno",
    testoAperturaPorta: "Per Sfondare prova di VR, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +4",
    testoAperturaPortone: "Per Sfondare prova di VR con Svantaggio, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +4",

    // Collegamenti: 1 Nessuno, 2-3 Porta, 4-5 Arco, 6 Portone. Aperta/o con 3-6 (chiusa/o con 1-2)
    soglieCollegamenti: { nessuna: 1, porta: 3, arco: 5, portone: 6 },
    sogliaPortaChiusa: 2,
    
    tipoTrappola: ["<b>Tagliola</b> (Danno: Tagliente, 1D6+2 PF ogni 3 LE del PG)", "<b>Dardi dalle pareti</b> (Danno: Perforante, 1D4+3 PF ogni 3 LE del PG)"],
    statTrappola: "Per Disattivare o Riarmare trappola prova di PR:<br>LEM 1-3 Complicata 10+<br>LEM 4-6 Difficile 15+<br>LEM 7-10 Difficilissima 20+",

	tabellaForziere: [
        "Trovi... niente, il forziere è vuoto!", 
        "Trovi un <b>Tesoro Minore</b> (Vedi p.166)", 
        "Trovi un <b>Tesoro Comune</b> (Vedi p.166)", 
        "Trovi un <b>Indizio</b> (Vedi p.165)"
    ],

    // Incontro: 1 SI / 2-6 NESSUNO (nessun incontro speciale)
    soglieIncontro: { si: 1 },

    // Mobilio: 1 SI. Tipo con D6: 1-3 piccolo, 4-6 medio
	sogliaMobilio: 1,
	tabellaMobilio: ["ostacolo piccolo", "ostacolo piccolo", "ostacolo piccolo", "ostacolo medio", "ostacolo medio", "ostacolo medio"],

    // Scale: 1 SI / 2-6 NO. Direzione D4. Livelli: 1D2
    sogliaScale: 1,
    livelliScale: { dado: 2, bonus: 0 },
	
	incontri: {
        lem13: [
            "Creature umanoidi (p. 9)", 
            "Creature infestanti (p. 9)", 
            "Creature non-morte (p. 11)"
        ],
        lem46: [
            "Creature umanoidi (p. 9)", 
            "Creature mostruose (p. 10)", 
            "Creature magiche (p. 10)", 
            "Creature non-morte (p. 11)"
        ],
        lem710: [
            "Creature umanoidi (p. 9)", 
            "Creature mostruose (p. 10)", 
            "Creature magiche (p. 10)", 
            "Creature extraplanari (p. 10)", 
            "Creature non-morte (p. 11)"
        ]
    },
    
	tabellaRisorse: [
        "Trovate... niente", 
        "Trovate... niente", 
        "Trovate delle muffe iridescenti (un mezz'uomo può ricavare 1D2 razioni di cibo vedi p.26)", 
        "Trovate dei pezzi di legno che si possono usare come 1d2 torce (durata 1 ora)", 
        "Trovate dei detriti che si possono usare come proiettili per fionda", 
        "Trovate dei detriti che si possono usare come proiettili per fionda"
    ]
};

window.onload = () => avviaStanza(DATI_STANZA);
