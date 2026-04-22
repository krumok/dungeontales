const DATI_STANZA = {
    titolo: "INGRESSO: 1",
    pagina: "p.139",
    immagine: "URL_DELLA_TUA_IMMAGINE_QUI", // Sostituisci con il link reale
    descrizione: [
        "L'ambiente è scarno e sporco. Qualcuno si è accampato qui prima di voi.",
        "Un forte odore di muffa e stoffa bagnata impregna l'aria.",
        "Un tintinnio di catene eccheggia in lontananza. Brividi gelidi vi assalgono.",
        "Macchie di sangue e fango sono sparse sul pavimento e sulle pareti."
    ],
    illuminazione: "Luce fievole (visibilità 6m), proveniente dalle scale",
    note: "E' possibile accamparsi qui per recuperare PA, PP e Stress.",
    
    // Tabelle per i collegamenti
    statoCancello: ["CHIUSO", "CHIUSO", "APERTO", "APERTO", "APERTO", "APERTO"],
    risorsaSX: ["non c'è niente", "non c'è niente", "non c'è niente", "non c'è niente", "non c'è niente", "una Spada corta o Lanterna"],
    risorsaDX: ["non c'è niente", "non c'è niente", "non c'è niente", "non c'è niente", "non c'è niente", "uno Scudo o Razione"],
    
    scale: ["Scale che salgono", "Scale che scendono"],
    livelliScale: ["1 livello (LVP 0)", "2 livelli (LVP 2)", "3 livelli (LVP 3)", "4 livelli (LVP 4)"],
    
    // Parte fissa dei collegamenti
    aprirePorta: "Per Sfondare prova di VR, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +3",
    
    tabellaRisorse: [
        "Trovate... niente", 
        "Pietre per fionda", 
        "Pietre per fionda", 
        "Pietre per fionda", 
        "Pezzi di legno (1d2 torce)", 
        "Pezzi di legno (1d2 torce)"
    ]
};

window.onload = () => avviaGenerazione(DATI_STANZA);
