const DATI_STANZA = {
    titolo: "#1 INGRESSO: 7 (p.142)",
    immagine: "assets/ingresso7.png",
    
    descrizioni: [
        "Sei colonne di marmo e onice sorreggono un soffitto a volta coperto di affreschi.",
        "Una mezza dozzina di colonne di pietra finemente scolpite da un popolo nanico.",
        "Le sei statue di valorosi avventurieri sono rivolte verso l'ingresso.",
        "Sei bracieri di ferro arrugginito sono posti sui plinti cilindrici di granito."
    ],
    
    illuminazione: "Luce normale (visibilità 9m) proveniente dalle scale o dai bracieri.",
    
    // Inseriamo i dettagli della porta magica nelle Note come richiesto
    note: `E' possibile accamparsi qui per recuperare PA, PP e Stress.<br><br>
           <b>PORTA MAGICA:</b> Per aprire la porta di pietra occorre superare una Prova di Intelletto. 
           PCN - LEM +2. Quando si supera la prova si ottengono 1D10 PE.`,
    
    scale: "Solo quelle di ingresso",
    
    collegamenti: [
        {
            nome: "La porta di pietra a sinistra",
            statoFisso: "<b>CHIUSA</b> magicamente (vedi NOTE)"
        },
        {
            nome: "La porta di legno a destra",
            statoFisso: "aperta"
        }
    ],

    tabellaRisorse: [
        "Trovate... niente",
        "Trovate... niente",
        "Trovate delle pietre che si possono usare come proiettili per fionda", 
        "Trovate delle pietre che si possono usare come proiettili per fionda", 
        "Trovate degli stracci polverosi si posso usare per fare un sacco a tracolla",
        "Trovate degli stracci polverosi si posso usare per fare un sacco a tracolla"
    ]
};

window.onload = () => avviaGenerazione(DATI_STANZA);