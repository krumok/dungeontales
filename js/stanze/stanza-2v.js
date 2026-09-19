const DATI_STANZA = {
    titolo: "STANZA 2V",
    pagina: "p.145",
    immagini: {
        "1": "assets/21.png",
        "2": "assets/22.png",
        "3": "assets/23.png",
        "4": "assets/24.png",
        "5": "assets/25.png",
        "6": "assets/26.png"
    },
    descrizioni: [
        ["Un sussurro spettrale vi avvolge all’improvviso", "Sentite clangori di battaglia!"],
        ["I topi scappano nella direzione opposta", "Tracce fresche di umanoidi"],
        ["Un antico affresco raffigurante scene di battaglia", "Ossa rosicchiate sparse sul pavimento"],
        ["Udite una sorta di nenia in lontananza", "Notate delle frecce conficcate nel muro"]
    ],

    // Illuminazione: 1-4 Nessuna, 5-6 Fievole
    illuminazione: [
        "Nessuna (visibilità 1.5m)", 
        "Nessuna (visibilità 1.5m)", 
        "Nessuna (visibilità 1.5m)", 
        "Nessuna (visibilità 1.5m)", 
        "Luce fievole (visibilità 6m)", 
        "Luce fievole (visibilità 6m)"
    ],
    provenienzaLuce: ["da candele quasi spente", "da riverbero di altri ambienti limitrofi"],
    
    obiettivi: ["SI", "NO", "NO", "NO", "NO", "NO"], // SI solo con 1
    uscite: ["SI", "NO", "NO", "NO", "NO", "NO"],    // SI solo con 1
    note: "E' possibile accamparsi in questo ambiente.",

    // Forziere: 1-5 NO / 6 SI
    sogliaForziere: 6,

	materialePorta: "legno",
    testoAperturaPorta: "Per Sfondare prova di VR PCN LEM +1<br>Per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +4",
    testoAperturaPortone: "Per Sfondare prova di VR PCN LEM +D4<br>Per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +4",

    // Collegamenti: 1 Nessuno, 2-4 Porta, 5 Arco, 6 Portone. Aperta/o con 4-6 (chiusa/o con 1-3)
    soglieCollegamenti: { nessuna: 1, porta: 4, arco: 5, portone: 6 },
    sogliaPortaChiusa: 3,
    
    tipoTrappola: [
        "<b>Lingua di fuoco</b> (Danno: Fuoco, 1D8+2 PF ogni 3 LE del PG, prova PR Difficile 15+ per dimezzare)", 
        "<b>Botola nel pavimento</b> (Danno: Impatto, 1D4 quadretti intorno, profonda 3mt, 2PA per uscire / corda e rampino 1PA, 1D6+2 PF ogni 3 LE del PG)"
    ],
    statTrappola: "Per Disattivare o Riarmare Trappola prova di PR:<br>LEM 1-3 Complicata 10+<br>LEM 4-6 Difficile 15+<br>LEM 7-10 Difficilissima 20+",

    tabellaForziere: [
        "Trovi... niente, il forziere è vuoto!", 
        "Trovi un <b>Tesoro Minore</b> (Vedi p.166)", 
        "Trovi un <b>Tesoro Comune</b> (Vedi p.166)", 
        "Trovi un <b>Indizio</b> (Vedi p.165)"
    ],
	
    // Incontro: 1-2 SI / 3-5 NESSUNO / 6 SPECIALE
    soglieIncontro: { si: 2, speciale: 6 },

    // Mobilio: 1-2 SI. Tipo con D6: 1-3 piccolo, 4-6 medio
	sogliaMobilio: 2,              
	tabellaMobilio: [
		"ostacolo piccolo", "ostacolo piccolo", "ostacolo piccolo", 
		"ostacolo medio", "ostacolo medio", "ostacolo medio"
	],	

    // Scale: 1 SI / 2-6 NO. Direzione D4. Livelli: 1D3
    sogliaScale: 1,
    livelliScale: { dado: 3, bonus: 0 },
		
    incontri: {
        lem13: ["Creature umanoidi (p. 9)", "Creature infestanti (p. 9)", "Creature non-morte (p. 11)"],
        lem46: ["Creature umanoidi (p. 9)", "Creature mostruose (p. 10)", "Creature magiche (p. 10)", "Creature non-morte (p. 11)"],
        lem710: ["Creature umanoidi (p. 9)", "Creature mostruose (p. 10)", "Creature magiche (p. 10)", "Creature extraplanari (p. 10)", "Creature non-morte (p. 11)"]
    },
    
    // Risorse: 1-2 Niente, 3 Funghi, 4-5 Legno (1D4 torce), 6 Vetri rotti
	tabellaRisorse: [
		"Trovate... niente", 
		"Trovate... niente", 
		"Trovate dei funghi commestibili (un mezz'uomo può ricavare 1D4+1 razioni di cibo p.26)", 
		"Trovate dei pezzi di legno che si possono usare come 1d4 di torce (durata 1 ora)", 
		"Trovate dei pezzi di legno che si possono usare come 1d4 di torce (durata 1 ora)", 
		"Trovate dei vetri rotti che si possono usare come specchietto"
	]
};

window.onload = () => avviaStanza(DATI_STANZA);
