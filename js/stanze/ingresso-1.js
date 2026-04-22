const DATI_STANZA = {
    descrizione: [
        "L'ambiente è scarno e sporco. Qualcuno si è accampato qui prima di voi.",
        "Un forte odore di muffa e stoffa bagnata impregna l'aria.",
        "Macchie di sangue e fango sono sparse sulle pareti."
    ],
    illuminazione: "Luce fievole (visibilità 6m), proveniente dalle scale",
    note: "È possibile accamparsi qui per recuperare PA, PP e Stress.",
    risorseExtra: ["una Spada corta", "una Lanterna", "uno Scudo", "una Razione"],
    scale: ["Scale che salgono", "Scale che scendono"],
    livelliScale: ["1 livello (LVP 0)", "2 livelli (LVP 2)", "3 livelli (LVP 3)"],
    tabellaRisorse: [
        "Trovate... niente", 
        "Pietre per fionda", 
        "Pietre per fionda", 
        "Pietre per fionda", 
        "Pezzi di legno (1d2 torce)", 
        "Pezzi di legno (1d2 torce)"
    ]
};

// Avvia la generazione appena la pagina è pronta
window.onload = () => avviaGenerazione(DATI_STANZA);
