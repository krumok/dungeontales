const DATI_STANZA = {
    titolo: "INGRESSO: 4 (p.140)",
    immagine: "assets/ingresso-4t.png",
    
    descrizioni: [
        "Due statue di antichi guerrieri si fronteggiano dai lati opposti alla sala.",
        "Il pavimento è ricoperto di liquame maleodorante.",
        "I resti scheletrici di alcuni umanoidi indicano che una bestia feroce è nei paraggi.",
        "Simboli religiosi sono scolpiti lungo le pareti, a memoria di un culto dimenticato."
    ],
    
    illuminazione: "Luce ottimale (visibilità 12m), proveniente dalle scale",
    note: "E' possibile accamparsi qui per recuperare PA, PP e Stress.",
    
    // Scale dinamiche (verranno calcolate dal motore perché array)
    scale: ["scale che salgono", "scale che scendono"],
    livelliScale: ["1 livello (LVP 0)", "2 livelli (LVP 1)", "3 livelli (LVP 2)", "4 livelli (LVP 3)"],
    
    // Collegamenti (Porte)
    collegamenti: [
        {
            nome: "La porta di legno a sinistra",
            probabilita: ["CHIUSA", "CHIUSA", "CHIUSA", "CHIUSA", "APERTA", "APERTA"],
            dado: 6
        },
        {
            nome: "La porta di legno di fronte",
            probabilita: ["CHIUSA", "CHIUSA", "APERTA", "APERTA", "APERTA", "APERTA"],
            dado: 6
        }
    ],
    testoApertura: "Per Sfondare prova di VR, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +3",

    // Logica Trappola
    datiTrappola: {
        probabilita: ["PRESENTE", "ASSENTE", "ASSENTE", "ASSENTE", "ASSENTE", "ASSENTE"], // PRESENTE solo con 1
        dado: 6,
        dettaglio: `<br>"Dardi dalle pareti"<br>LEM 1-3 1d6 Danni<br>LEM 4-6 1d8 Danni<br>LEM 7-10 1d10 Danni<br><br>Per Disattivare Trappola prova di PR:<br>LEM 1-3 Normale 5+<br>LEM 4-6 Complicata 10+<br>LEM 7-10 Difficile 15+`
    },

    tabellaRisorse: [
        "Trovate... niente",
        "Trovate delle pietre che si possono usare come proiettili per fionda", 
        "Trovate delle pietre che si possono usare come proiettili per fionda", 
        "Trovate delle pietre che si possono usare come proiettili per fionda", 
        "Trovate dei pezzi di legno che si possono usare come 1d2 torce", 
        "Trovate dei pezzi di legno che si possono usare come 1d2 torce"
    ]
};

window.onload = () => avviaGenerazione(DATI_STANZA);