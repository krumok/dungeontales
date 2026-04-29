const DATI_STANZA = {
    titolo: "STANZA 1V",
    immagini: {
        "1": "assets/stanza-1-1v.jpg",
        "2": "assets/stanza-2-1v.jpg",
        "3": "assets/stanza-3-1v.jpg",
        "4": "assets/stanza-4-1v.jpg",
        "5": "assets/stanza-5-1v.jpg",
        "6": "assets/stanza-6-1v.jpg"
    },
	descrizioni: [
		["Odore di carne bruciata e sangue fresco", "Sentite un intenso profumo di incensi e spezie", "Filtra acqua dal soffitto"], // Gruppo 1
		["Sottili ragnatele vi si appiccicano addosso", "Il pavimento brulica di insetti", "C'è un forte odore di bruciato"],       // Gruppo 2
		["Un rumore lontano di pietra che struscia su pietra", "Sentite un rumore di pietre che rotolano"],                      // Gruppo 3
		["Occhi fluorescenti e malevoli vi fissano dal buio per poi svanire nel nulla!"]                                         // Gruppo 4
	],
    illuminazione: ["Nessuna (1.5m)", "Nessuna (1.5m)", "Nessuna (1.5m)", "Nessuna (1.5m)", "Luce scarsa (3m)", "Luce fievole (6m)"],
    provenienzaLuce: ["da fenditure", "da ambienti limitrofi", "da candele quasi spente"],
    
    testoAperturaPorta: "Per Sfondare prova di VR, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +4",
    testoAperturaPortone: "Per Sfondare prova di VR con Svantaggio, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +4",
    
    tipoTrappola: ["<b>Tagliola</b> (Danno: Tagliente, 1D6+2 PF ogni 3 LE del PG)", "<b>Dardi dalle pareti</b> (Danno: Perforante, 1D4+3 PF ogni 3 LE del PG)"],
    statTrappola: "Per Disattivare trappola prova di PR:<br>1-3 Complicata 10+<br>4-6 Difficile 15+<br>7-10 Difficilissima 20+",

	tabellaForziere: [
        "Trovi... niente, il forziere è vuoto!", 
        "Trovi un <b>Tesoro Minore</b> (Vedi p.166)", 
        "Trovi un <b>Tesoro Comune</b> (Vedi p.166)", 
        "Trovi un <b>Indizio</b> (Vedi p.165)"
    ],
	
	regolaIncontroSpeciale: false, 
	sogliaMobilio: 1,             
	tabellaMobilio: ["ostacolo piccolo", "ostacolo medio"],
    
	testiScale: { su: "che salgono", giu: "che scendono" },
	
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