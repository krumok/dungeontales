const DATI_STANZA = {
    titolo: "#1 INGRESSO: 8 (p.142)",
    immagine: "assets/ingresso8.png",
    
    descrizioni: [
        "Il ruggito in lontananza di una bestia feroce vi coglie di sorpresa.",
        "Un fetore di escrementi aleggia nell'aria. Qualche creatura vive da queste parti.",
        "Alcuni gradini delle scale di legno hanno ceduto.",
        "Le pareti sono imbrattate con impronte di mani umanoidi e disegni rupestri."
    ],
	
	illuminazione: "Luce scarsa (visibilità 3m) proveniente dalle scale.",
    illuminazioneTrappola: "L'illuminazione si riduce a nessuna (visibilità 1,5m).", // Appare solo se la trappola è PRESENTE
    
    note: "E' possibile accamparsi qui per recuperare PA, PP e Stress.",
    notaTrappola: "Il passaggio usato per entrare nel dungeon è inutilizzabile.", // Appare solo se la trappola è PRESENTE
    
    // Scale personalizzate per Ingresso 8
    scale: ["scale che scendono", "scale che scendono", "scale che scendono", "scale che salgono"], // 1-3 scendono, 4 sale
    livelliScale: ["1 livello (LVP 1)", "2 livelli (LVP 3)"], // Userà roll(2)
    
    // Collegamenti (Porte di pietra)
    collegamenti: [
        {
            nome: "La porta di pietra a sinistra",
            probabilita: ["CHIUSA", "CHIUSA", "CHIUSA", "CHIUSA", "APERTA", "APERTA"],
            dado: 6
        },
        {
            nome: "La porta di pietra a destra",
            probabilita: ["CHIUSA", "CHIUSA", "CHIUSA", "CHIUSA", "APERTA", "APERTA"],
            dado: 6
        }
    ],
    
    testoApertura: "Per Sollevare prova di VR, per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +1<br>LEM 4-6 PCN LEM +3<br>LEM 7-10 PCN LEM +5",

    // Logica Trappola: PRESENTE con 1, 2 o 3
    datiTrappola: {
        probabilita: ["PRESENTE", "PRESENTE", "PRESENTE", "ASSENTE", "ASSENTE", "ASSENTE"],
        dado: 6,
        dettaglio: `<b>"L'uscita si blocca"</b><br><br>Per Disattivare Trappola prova di PR:<br>LEM 1-3 Normale 5+<br>LEM 4-6 Complicata 10+<br>LEM 7-10 Difficile 15+`
    },

    tabellaRisorse: [
        "Trovate... niente",
        "Trovate un pugnale arrugginito (Vedi Pugnale -2 ai danni)",
		"Trovate dei pezzi di legno che si possono usare come 1d2 torce", 
		"Trovate dei pezzi di legno che si possono usare come 1d2 torce", 
		"Trovate dei pezzi di legno che si possono usare come 1d2 torce", 
		"Trovate dei pezzi di legno che si possono usare come 1d2 torce"
    ]
};

window.onload = () => avviaGenerazione(DATI_STANZA);