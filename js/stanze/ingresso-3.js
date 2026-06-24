const DATI_STANZA = {
    titolo: "INGRESSO: 3 (p.140)",
    immagine: "assets/ingresso-3t.png",
    
    descrizioni: [
        "Drappi di un regno caduto, sono appesi ai lati delle porta.",
        "L'umidità ha macchiato la base delle pareti.",
        "Buona parte del pavimento è saltato. Sotto le lastre di pietra si vede terra umida.",
        "Una dozzina di teschi umanoidi sono posizionati all'interno di apposite nicchie."
    ],
    
    illuminazione: "Luce scarsa (visibilità 3m), proveniente dalle scale",
    note: "E' possibile accamparsi qui per recuperare PA, PP e Stress.",
    scale: "Solo quelle di ingresso",
    
    // Nuova struttura universale per le porte
    collegamenti: [
        {
            nome: "La porta di legno a sinistra",
            probabilita: ["CHIUSA", "CHIUSA", "CHIUSA", "APERTA", "APERTA", "APERTA"],
            dado: 6
        },
        {
            nome: "La porta di legno di fronte",
            probabilita: ["CHIUSA", "CHIUSA", "CHIUSA", "CHIUSA", "APERTA", "APERTA"],
            dado: 6
        },
        {
            nome: "Porta di ferro a destra",
            statoFisso: "aperta"
        }
    ],

    testoApertura: "Per Sfondare prova di VR, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +3",

    tabellaRisorse: [
        "Trovate... niente",
        "Trovate... niente",
        "Trovate delle pietre che si possono usare come proiettili per fionda", 
        "Trovate delle pietre che si possono usare come proiettili per fionda", 
        "Trovate dei pezzi di legno che si possono usare come 1d2 torce", 
        "Trovate dei funghi e piante commestibili (1d2 di razioni, x2 se c'è un mezz'uomo)"
    ]
};

window.onload = () => avviaGenerazione(DATI_STANZA);
