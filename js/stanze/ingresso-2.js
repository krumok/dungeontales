const DATI_STANZA = {
    titolo: "INGRESSO: 2",
    pagina: "p.139",
    immagine: "assets/ingresso-2.png", // Assicurati di caricarla nella cartella assets
    
    descrizioni: [
        "Illuminata da piccoli bracieri, la scalinata termina davanti ad una porta di legno.",
        "La pietra è antica e levigata. In molti prima di voi hanno usato queste scale.",
        "Da dietro la porta, si sentono tamburi tribali echeggiare in lontananza.",
        "Qualcuno ha inciso una frase sulla roccia: FUGGITE, SCIOCCHI!"
    ],
    
    illuminazione: "Luce normale (visibilità 9m), proveniente dalle scale",
    
    note: "E' possibile accamparsi qui per recuperare PA, PP e Stress.",
    
    scale: "Solo quelle di ingresso",
    
    // Logica della porta
    tabellaPorta: [
        { stato: "CHIUSA", conApertura: true }, // D6 = 1
        { stato: "CHIUSA", conApertura: true }, // D6 = 2
        { stato: "APERTA", conApertura: false }, // D6 = 3
        { stato: "APERTA", conApertura: false }, // D6 = 4
        { stato: "APERTA", conApertura: false }, // D6 = 5
        { stato: "APERTA", conApertura: false }  // D6 = 6
    ],
    
    testoApertura: "Per Sfondare prova di VR, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +2<br>LEM 7-10 PCN LEM +3",
    
    tabellaRisorse: [
        "Trovate della cera (1d2 candele)",
        "Pietre per fionda",
        "Pietre per fionda",
        "Pietre per fionda",
        "Pezzi di legno (1d2 torce)",
        "Pezzi di legno (1d2 torce)"
    ]
};

// Avvio automatico
window.onload = () => avviaGenerazione(DATI_STANZA);
