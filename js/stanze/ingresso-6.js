const DATI_STANZA = {
    titolo: "#1 INGRESSO: 6 (p.141)",
    immagine: "assets/ingresso6.png",
    
    // Le descrizioni e le note le lasciamo come funzioni o segnaposto
    // che verranno riempiti al momento del caricamento
    descrizioni: [
        "Casse di legno marcio infestate dai topi sono accatastate al centro della stanza.",
        "La statua di una creatura infernale con quattro braccia indica ogni porta.",
        "Tracce di sangue fresco si dirigono dalla colonna al centro verso la porta {sangue}.",
        "La cera di candele consumate ricopre una mezza dozzina di teschi umani al centro della stanza."
    ],
    
    illuminazione: "Luce fievole (6m) proveniente da candele poste al centro della stanza.",
    note: "Arrivate dalla porta a {direzione}.<br>E' possibile accamparsi qui per recuperare PA, PP e Stress.",
    scale: "Solo quelle di ingresso",
    
    collegamenti: [
        { nome: "Le porte sono tutte di ferro.<br>La porta a sinistra", statoFisso: "aperta" },
        {
            nome: "La porta a destra",
            probabilita: ["CHIUSA", "CHIUSA", "CHIUSA", "APERTA", "APERTA", "APERTA"],
            dado: 6
        },
        {
            nome: "La porta davanti a voi",
            probabilita: ["CHIUSA", "CHIUSA", "CHIUSA", "CHIUSA", "CHIUSA", "APERTA"],
            dado: 6
        }
    ],
    
    testoApertura: "Per Sfondare prova di VR, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +2<br>LEM 4-6 PCN LEM +3<br>LEM 7-10 PCN LEM +5",

    tabellaRisorse: [
        "Trovate della cera che si può usare per fare 1d2 di candele",
        "Trovate della cera che si può usare per fare 1d2 di candele",
        "Trovate dei pezzi di legno che si possono usare come 1d2 torce", 
        "Trovate dei pezzi di legno che si possono usare come 1d2 torce", 
        "Trovate delle assi di legno da cui potete ricavare un'arma da mischia (BO+1, Danni: una mano 1d4 / 2 mani 1d6)",
        "Trovate delle assi di legno da cui potete ricavare un'arma da mischia (BO+1, Danni: una mano 1d4 / 2 mani 1d6)"
    ]
};

window.onload = () => {
    // Ora roll() è sicuramente definita perché siamo dentro onload
    const dIngresso = ["NORD", "SUD", "EST", "OVEST"][roll(4) - 1];
    const tIngresso = getTirid(4, ["NORD", "SUD", "EST", "OVEST"].indexOf(dIngresso) + 1);

    const dSangue = ["a sinistra", "a destra", "davanti a voi", "dalla quale siete entrati"][roll(4) - 1];
    const tSangue = getTirid(4, ["a sinistra", "a destra", "davanti a voi", "dalla quale siete entrati"].indexOf(dSangue) + 1);

    // Sostituiamo i segnaposto nei dati con i valori reali
    DATI_STANZA.note = DATI_STANZA.note.replace("{direzione}", `<b>${dIngresso}</b> ${tIngresso}`);
    
    DATI_STANZA.descrizioni = DATI_STANZA.descrizioni.map(d => 
        d.replace("{sangue}", `<b>${dSangue}</b> ${tSangue}`)
    );

    // Infine avviamo la generazione
    avviaGenerazione(DATI_STANZA);
};