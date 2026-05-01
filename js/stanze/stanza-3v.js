const DATI_STANZA = {
    titolo: "STANZA 3V",
    immagini: {
        "1": "assets/31.png",
        "2": "assets/32.png",
        "3": "assets/33.png",
        "4": "assets/34.png",
        "5": "assets/35.png",
        "6": "assets/36.png"
   },
    descrizioni: [
        ["Sentite un'eco di passi in avvicinamento", "Il pavimento è crepato", "Sentite odore di fuoco"],
        ["Il pavimento è lastricato con strane pietre esagonali", "Ci sono ossa ovunque sul pavimento"],
        ["Una strana edera bluastra avvolge l’intero ambiente", "Sentite delle risate sguaiate"],
        ["Nella stanza c’è del fumo", "Il pavimento è scivoloso", "Ci sono infiltrazioni dal pavimento"]
    ],
    // Illuminazione Stanza 3: 1-2 Nessuna, 3-6 Luce fievole
    illuminazione: [
        "Nessuna (visibilità 1.5m)", 
        "Nessuna (visibilità 1.5m)", 
        "Luce fievole (visibilità 6m)", 
        "Luce fievole (visibilità 6m)", 
        "Luce fievole (visibilità 6m)", 
        "Luce fievole (visibilità 6m)"
    ],
    provenienzaLuce: [
        "da funghi bioluminescenti presenti sul soffitto",
        "da funghi bioluminescenti presenti sul pavimento",
        "da muffe bioluminescenti sparse sul soffitto",
        "da muffe bioluminescenti sparse sul pavimento"
    ],
    
    obiettivi: ["SI", "NO", "NO", "NO", "NO", "NO"],
    uscite: ["SI", "NO", "NO", "NO", "NO", "NO"],
    
	getNoteSpeciali: function(imgID) {
        let notaBase = "E' possibile accamparsi in questo ambiente.";
        
        // Se l'immagine è la numero 3 (Stanza Circolare)
        if (imgID === "3") {
            const r = roll(6);
            let effetto = "";
            
            if (r === 6) {
                effetto = "La stanza è un elevatore. Scende di 1 Livello LVP +2";
            } else if (r === 1 || r === 2) {
                effetto = "La stanza ruota in senso orario. Generare subito un nuovo ambiente";
            } else {
                effetto = "Niente di particolare";
            }
            
            notaBase += `<br><br><span class="spantab"></span><b>STANZA CIRCOLARE:</b><br><span class="spantab"></span>${effetto} ${getTirid(6, r)}`;
        }
        return notaBase;
    },

    // Collegamenti Stanza 3: 1-2 Nessuna, 3-4 Porta, 5 Arco, 6 Portone
    soglieCollegamenti: { nessuna: 2, porta: 4, arco: 5, portone: 6 },
    
	materialePorta: "legno",
    testoAperturaPorta: "Per Sfondare prova di VR PCN LEM +2<br>Per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>4-6 PCN LEM +2<br>7-10 PCN LEM +4",
    testoAperturaPortone: "Per Sfondare prova di VR PCN LEM +D4<br>Per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>4-6 PCN LEM +2<br>7-10 PCN LEM +4",
    
    tipoTrappola: [
        "<b>Scarica elettrica</b> (Danno: Elettrico, 1D6+4 PF ogni 3 LE, PR Difficile 15+ per dimezzare)", 
        "<b>Gas venefico</b> (Danno: Veleno Mag., 1D6 quadretti, FI Complicata 10+ nega, 1D6+4 PF/round)"
    ],
    statTrappola: "Per Disattivare prova di PR:<br>LEM 1-3 Complicata 10+<br>LEM 4-6 Diff 15+<br>LEM 7-10 Difficilissima 20+.<br>Per Riarmare: come sopra ma con Svantaggio.",

    tabellaForziere: [
        "Trovi... niente, il forziere è vuoto!", 
        "Trovi un <b>Tesoro Minore</b> (Vedi p.166)", 
        "Trovi un <b>Tesoro Comune</b> (Vedi p.166)", 
        "Trovi un <b>Indizio</b> (Vedi p.165)"
    ],
    
	testiScale: { su: "che salgono", giu: "che scendono" },
	
    regolaIncontroSpeciale: true,
    incontri: {
        lem13: ["Creature umanoidi (p. 9)", "Creature mostruose (p. 10)", "Creature infestanti (p. 9)", "Creature non-morte (p. 11)"],
        lem46: ["Creature umanoidi (p. 9)", "Creature mostruose (p. 10)", "Creature magiche (p. 10)", "Creature extraplanari (p. 10)", "Creature non-morte (p. 11)"],
        lem710: ["Creature umanoidi (p. 9)", "Creature magiche (p. 10)", "Creature extraplanari (p. 10)", "Creature non-morte (p. 11)"]
    },
    
    sogliaMobilio: 3, // Presente con 1, 2, 3
    tabellaMobilio: ["ostacolo piccolo", "ostacolo piccolo", "ostacolo piccolo", "ostacolo medio", "ostacolo medio", "ostacolo medio"],

    tabellaRisorse: [
        "Trovate... niente", 
        "Trovate... niente", 
        "Trovate dei lembi di stoffa (ricavate sacco a tracolla)", 
        "Trovate dei lembi di stoffa (ricavate sacco a tracolla)", 
        "Trovate dei lembi di stoffa (ricavate sacco a tracolla)", 
        "Trovate delle ossa rotte (ricavate pugnale 1D4-1)"
    ]
};

window.onload = () => avviaStanza(DATI_STANZA);