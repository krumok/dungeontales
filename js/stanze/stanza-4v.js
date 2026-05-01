const DATI_STANZA = {
    titolo: "STANZA 4V",
    immagini: {
        "1": "assets/41.png",
        "2": "assets/42.png",
        "3": "assets/43.png",
        "4": "assets/44.png",
        "5": "assets/45.png",
        "6": "assets/46.png"
    },
    // Struttura speciale per gestire l'allagamento
	descrizioni: [
        ["Le pareti sono scalfite da grandi artigliate", "Sul pavimento ci sono pozze di liquame, ovunque"],
        ["Sciami di mosche ronzano intorno ad una carcassa", "Ci sono vistose bruciature sulle pareti"],
        ["Le pareti trasudano efflussi maleodoranti", "Mobili di legno fatti a pezzi"],
        // Gruppo 4: qui la logica è 50% segni cedimento, 50% allagato
        ["Le pareti mostrano evidenti segni di cedimento", "Il pavimento è allagato (vedi Note)"]
    ],

    getNoteSpeciali: function(imgID, descrizioneScelta) {
        let note = "E' possibile accamparsi in questo ambiente.";
        
        // Nota fissa per Stanza 4
        note += "<br><br>TRAPPOLE: Se una trappola viene attivata in uno di questi Ambienti, le creature del prossimo Incontro saranno in allerta. Ottengono +2 Iniziativa.";
        
        // Controllo dinamico allagamento (se la descrizione scelta è esattamente quella)
        if (descrizioneScelta === "Il pavimento è allagato (vedi Note)") {
            note += "<br><br><b>PAVIMENTO ALLAGATO:</b> Muoversi in questo ambiente costa il doppio dei 2PA";
        }
        
        return note;
    },

    illuminazione: [
        "nessuna (visibilità 1.5m)",
        "Luce fievole (visibilità 6m)",
        "Luce fievole (visibilità 6m)",
        "Luce fievole (visibilità 6m)",
        "Luce normale (visibilità 9m)",
        "Luce normale (visibilità 9m)"
    ],
    provenienzaLuce6m: ["da candele quasi spente", "da riverbero di altri ambienti limitrofi"],
    provenienzaLuce9m: [
        "da due torce appese alle pareti", 
        "da cristalli luminescenti che sbucano dalle pareti irradiando l'ambiente con colori surreali"
    ],

    obiettivi: ["SI", "NO", "NO", "NO", "NO", "NO"],
    uscite: ["SI", "NO", "NO", "NO", "NO", "NO"],

    soglieCollegamenti: { nessuna: 1, porta: 3, arco: 5, portone: 6 },
	materialePorta: "legno",
    testoAperturaPorta: "Per Sfondare prova di VR PCN LEM +1<br>Per Scassinare prova di PR: LEM 1-3 +1, 4-6 +2, 7-10 +4",
    testoAperturaPortone: "Per Sfondare prova di VR PCN LEM +D4<br>Per Scassinare prova di PR: LEM 1-3 +1, 4-6 +2, 7-10 +4",

	statTrappola: "Per Disattivare o Riarmare Trappola prova di PR:<br>LEM 1-3 Complicata 10+<br>LEM 4-6 Difficile 15+<br>LEM 7-10 Difficilissima 20+",
    
    tabellaForziere: [
        "Trovi... niente, il forziere è vuoto!",
        "Trovi un <b>Tesoro Minore</b> (Vedi p.166)",
        "Trovi un <b>Tesoro Comune</b> (Vedi p.166)",
        "Trovi un <b>Indizio</b> (Vedi p.165)"
    ],

	testiScale: { su: "che salgono", giu: "che scendono" },

    regolaIncontroSpeciale: true,
    incontri: {
        lem13: ["Creature umanoidi (p. 9) (LVP+1)", "Creature infestanti (p. 9) (LVP+1)", "Creature non-morte (p. 11) (LVP+1)"],
        lem46: ["Creature umanoidi (p. 9) (LVP+1)", "Creature mostruose (p. 10) (LVP+1)", "Creature magiche (p. 10) (LVP+1)", "Creature non-morte (p. 11) (LVP+1)"],
        lem710: ["Creature umanoidi (p. 9) (LVP+1)", "Creature mostruose (p. 10) (LVP+1)", "Creature magiche (p. 10) (LVP+1)", "Creature extraplanari (p. 10) (LVP+1)", "Creature non-morte (p. 11) (LVP+1)"]
    },

    sogliaMobilio: 4,
    tabellaMobilio: ["ostacolo piccolo", "ostacolo piccolo", "ostacolo piccolo", "ostacolo medio", "ostacolo medio", "ostacolo medio"],

    tabellaRisorse: [
        "Trovate... niente",
        "Trovate... niente",
        "Trovate dei funghi (Mezz'uomo ricava 1D4 razioni)",
        "Trovate dei funghi (Mezz'uomo ricava 1D4 razioni)",
        "Trovate dei funghi (Mezz'uomo ricava 1D4 razioni)",
        "Trovate dei funghi (Mezz'uomo ricava 1D4 razioni)"
    ]
};

window.onload = () => avviaStanza(DATI_STANZA);