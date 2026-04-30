const DATI_STANZA = {
    titolo: "INGRESSO: 5 (p.141)",
    immagine: "assets/ingresso5.png",
    
    descrizioni: [
        "Antichi arazzi strappati pendono dalle pareti dietro alle scale.",
        "Il pavimento a scacchiera vi mette a disagio.",
        "Gli intonaci di malta si stanno staccando, rivelando blasfemi affreschi sui muri.",
        "Il corpo straziato di un goblin giace in una pozza di sangue vicino alle scale."
    ],
    
    illuminazione: "Luce nessuna (visibilità 1,5m).",
    note: "E' possibile accamparsi qui per recuperare PA, PP e Stress.",
    
    // Scale dinamiche
    scale: ["scale che salgono", "scale che scendono"],
    livelliScale: ["1 livello (LVP 0)", "2 livelli (LVP 2)", "3 livelli (LVP 3)", "4 livelli (LVP 4)"],
    
    // Collegamenti (Porte)
    collegamenti: [
        {
            nome: "La porta di legno a sinistra",
            statoFisso: "aperta"
        },
        {
            nome: "La porta di ferro a destra",
            probabilita: ["CHIUSA", "CHIUSA", "APERTA", "APERTA", "APERTA", "APERTA"],
            dado: 6
        }
    ],
    
    // Testo apertura specifico per questa stanza (con i modificatori -2)
    testoApertura: "Per Sfondare prova di VR -2, per Scassinare prova di PR -2:<br>LEM 1-3 PCN LEM +0<br>LEM 4-6 PCN LEM +1<br>LEM 7-10 PCN LEM +2",

    tabellaRisorse: [
        "Trovate... niente",
        "Trovate degli stracci polverosi si posso usare per fare un sacco a tracolla",
        "Trovate degli stracci polverosi si posso usare per fare un sacco a tracolla",
        "Trovate degli stracci polverosi si posso usare per fare un sacco a tracolla",
        "Trovate dei funghi e piante commestibili (1d2 di razioni, x2 se c'è un mezz'uomo)",
        "Trovate dei funghi e piante commestibili (1d2 di razioni, x2 se c'è un mezz'uomo)"
    ]
};

window.onload = () => avviaGenerazione(DATI_STANZA);