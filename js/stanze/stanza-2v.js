const DATI_STANZA = {
    titolo: "STANZA 2V",
    immagini: {
        "1": "assets/2v1.png",
        "2": "assets/2v2.png",
        "3": "assets/2v3.png",
        "4": "assets/2v4.png",
        "5": "assets/2v5.png",
        "6": "assets/2v6.png"
    },
    descrizioni: [
        ["Un sussurro spettrale vi avvolge all’improvviso", "Sentite clangori di battaglia!"],
        ["I topi scappano nella direzione opposta", "Tracce fresche di umanoidi"],
        ["Un antico affresco raffigurante scene di battaglia", "Ossa rosicchiate sparse sul pavimento"],
        ["Udite una sorta di nenia in lontananza", "Notate delle frecce conficcate nel muro"]
    ],
    illuminazione: [
        "Nessuna (visibilità 1.5m)", 
        "Nessuna (visibilità 1.5m)", 
        "Nessuna (visibilità 1.5m)", 
        "Nessuna (visibilità 1.5m)", 
        "Luce fievole (visibilità 6m)", 
        "Luce fievole (visibilità 6m)"
    ],
    provenienzaLuce: ["da candele quasi spente", "da riverbero di altri ambienti limitrofi"],
    
    // Novità Stanza 2
    obiettivi: ["SI", "NO", "NO", "NO", "NO", "NO"], // SI solo con 1
    uscite: ["SI", "NO", "NO", "NO", "NO", "NO"],    // SI solo con 1
    note: "E' possibile accamparsi in questo ambiente.",

	materialePorta: "legno",
    testoAperturaPorta: "Per Sfondare prova di VR PCN LEM +1<br>Per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +4",
    testoAperturaPortone: "Per Sfondare prova di VR PCN LEM +D4<br>Per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +4",
    
    tipoTrappola: [
        "<b>Lingua di fuoco</b> (Danno: Fuoco, 1D8+2 PF ogni 3 LE del PG, prova PR Difficile 15+ per dimezzare)", 
        "<b>Botola nel pavimento</b> (Danno: Impatto, 1D4 quadretti intorno, profonda 3mt, 1D6+2 PF ogni 3 LE del PG)"
    ],
    statTrappola: "Per Disattivare Trappola prova di PR:<br>LEM 1-3 Complicata 10+<br>LEM 4-6 Difficile 15+<br>LEM 7-10 Difficilissima 20+",

    tabellaForziere: [
        "Trovi... niente, il forziere è vuoto!", 
        "Trovi un <b>Tesoro Minore</b> (Vedi p.166)", 
        "Trovi un <b>Tesoro Comune</b> (Vedi p.166)", 
        "Trovi un <b>Indizio</b> (Vedi p.165)"
    ],
	
	regolaIncontroSpeciale: true,  
	sogliaMobilio: 2,              
	tabellaMobilio: [
		"ostacolo piccolo", "ostacolo piccolo", "ostacolo piccolo", 
		"ostacolo medio", "ostacolo medio", "ostacolo medio"
	],	
	
	testiScale: { su: "che salgono", giu: "che scendono" },
		
    incontri: {
        lem13: ["Creature umanoidi (p. 9)", "Creature infestanti (p. 9)", "Creature non-morte (p. 11)"],
        lem46: ["Creature umanoidi (p. 9)", "Creature mostruose (p. 10)", "Creature magiche (p. 10)", "Creature non-morte (p. 11)"],
        lem710: ["Creature umanoidi (p. 9)", "Creature mostruose (p. 10)", "Creature magiche (p. 10)", "Creature extraplanari (p. 10)", "Creature non-morte (p. 11)"]
    },
    
	tabellaRisorse: [
		"Trovate... niente", 
		"Trovate... niente", 
		"Trovate dei funghi commestibili (un mezz'uomo può ricavare 1D4+1 razioni di cibo p.26)", 
		"Trovate dei pezzi di legno che si possono usare come 1d2 di torce (durata 1 ora)", 
		"Trovate dei pezzi di legno che si possono usare come 1d2 di torce (durata 1 ora)", 
		"Trovate dei vetri rotti che si possono usare come specchietto"
	]
};

window.onload = () => avviaStanza(DATI_STANZA);