const DATI_STANZA = {
    titolo: "INGRESSO: 1",
    pagina: "p.139",
    immagine: "assets/ingresso1.png", 
    
    // Cambiato da 'descrizione' a 'descrizioni'
    descrizioni: [
        "L'ambiente è scarno e sporco. Qualcuno si è accampato qui prima di voi.",
        "Un forte odore di muffa e stoffa bagnata impregna l'aria.",
        "Un tintinnio di catene eccheggia in lontananza. Brividi gelidi vi assalgono.",
        "Macchie di sangue e fango, sono sparse sul pavimento e sulle pareti."
    ],
    
    illuminazione: "Luce fievole (visibilità 6m), proveniente dalle scale",
    note: "E' possibile accamparsi qui per recuperare PA, PP e Stress.",
    
    // Dati per i cancelli (Sezione #5)
    statoCancello: ["CHIUSO", "CHIUSO", "APERTO", "APERTO", "APERTO", "APERTO"],
    risorsaSX: true, 
    risorsaDX: true,
    tabellaSpadaLanterna: ["una Spada corta", "una Lanterna"],
    tabellaScudoRazione: ["uno Scudo di legno", "una Razione di cibo conservato"],
    
    // Dati per le scale (Sezione #4) - Assicurati che siano array
    scale: ["Scale che salgono", "Scale che scendono"],
    livelliScale: ["1 livello (LVP 0)", "2 livelli (LVP 2)", "3 livelli (LVP 3)", "4 livelli (LVP 4)"],
	
    collegamenti: [
        {
            nome: "La porta di legno davanti a voi",
            statoFisso: "aperta"
        },
        {
            nome: "Il cancello a sinistra",
            probabilita: ["CHIUSO", "CHIUSO", "APERTO", "APERTO", "APERTO", "APERTO"],
            dado: 6
        },
        {
            nome: "Il cancello a sinistra",
            probabilita: ["CHIUSO", "CHIUSO", "APERTO", "APERTO", "APERTO", "APERTO"],
            dado: 6
        }
    ],

    testoApertura: "Per Sfondare prova di VR, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +3",

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
