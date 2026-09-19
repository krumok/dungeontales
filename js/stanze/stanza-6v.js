const DATI_STANZA = {
    titolo: "STANZA 6V",
    pagina: "p.149",
    immagini: {
        "1": "assets/61.png",
        "2": "assets/62.png",
        "3": "assets/63.png",
        "4": "assets/64.png",
        "5": "assets/65.png",
        "6": "assets/66.png"
    },
    descrizioni: [
        ["Udite rumore di una porta sbattuta nelle vicinanze", "Ci sono tracce di una sostanza viscida sul pavimento"],
        ["Pipistrelli svolazzano irrequieti", "Il pavimento ha ceduto a metà stanza"],
        ["C'è una grande fontana al centro della stanza", "Enormi librerie saccheggiate appoggiate alle pareti"],
        ["Antichi libri strappati sparsi ovunque", "Un accampamento appena allestito (Vedi Note)"]
    ],

    getNoteSpeciali: function(imgID, descrizioneScelta) {
        let note = ""; // Inizialmente vuoto perché l'accampamento è condizionale
        
        if (descrizioneScelta === "Un accampamento appena allestito (Vedi Note)") {
            note = "<b>ACCAMPAMENTO:</b> È possibile sfruttare gratuitamente questo accampamento. Per renderlo sicuro, basterà bonificare le aree limitrofe. L’ultimo ambiente (corridoio) ignora questa possibilità.";
        } else {
            note = "E' possibile accamparsi in questo ambiente.";
        }
        return note;
    },

    // Illuminazione: 1-2 Nessuna, 3-6 Luce fievole
    illuminazione: [
        "Nessuna (visibilità 1.5m)", "Nessuna (visibilità 1.5m)", 
        "Luce fievole (visibilità 6m)", "Luce fievole (visibilità 6m)", 
        "Luce fievole (visibilità 6m)", "Luce fievole (visibilità 6m)"
    ],
    provenienzaLuce: ["da candele quasi spente", "da riverbero di altri ambienti limitrofi"],

    obiettivi: ["SI", "NO", "NO", "NO", "NO", "NO"],
    uscite: ["SI", "NO", "NO", "NO", "NO", "NO"],

    // Forziere: 1-3 NO / 4-6 SI (Stanza 6 è più generosa)
    sogliaForziere: 4,
    tabellaForziere: [
        "Trovi... niente, il forziere è vuoto!",
        "Trovi un <b>Tesoro Comune</b> (Vedi p.166)",
        "Trovi un <b>Tesoro Maggiore</b> (Vedi p.166)",
        "Trovi un <b>Indizio</b> (Vedi p.165)"
    ],

    // Trappola: 1-4 Nube paralizzante / 5-6 Pavimento illusorio
    sogliaTipoTrappola: 4,
    tipoTrappola: [
        "<b>Nube paralizzante</b> (Danno: Tossico. Il PG resta paralizzato per un DC D6, prova FI Difficile 15+ ignora gli effetti)",
        "<b>Pavimento illusorio</b> (Danno: Impatto, 1D6 quadretti intorno al PG, 1D6+2 PF ogni 3 LE. Fossa 3mt, 2PA per uscire / corda e rampino 1PA)"
    ],
    statTrappola: "Per Disattivare o Riarmare prova di PR:<br>LEM 1-3 Difficile 15+,<br>LEM 4-6 Difficilissima 20+<br>LEM 7-10 Assurda 30+",

    // Incontro: 1-2 SI / 3-5 NESSUNO / 6 SPECIALE
    soglieIncontro: { si: 2, speciale: 6 },
    incontri: {
        lem13: ["Creature umanoidi (p. 9)", "Creature mostruose (p. 10)", "Creature magiche (p. 10)", "Creature infestanti (p. 9)", "Creature non-morte (p. 11)"],
        lem46: ["Creature mostruose (p. 10)", "Creature magiche (p. 10)", "Creature non-morte (p. 11)"],
        lem710: ["Creature mostruose (p. 10)", "Creature magiche (p. 10)", "Creature non-morte (p. 11)", "Creature extraplanari (p. 10)"]
    },

    // Collegamenti: 1 Nessuno, 2-4 Porta, 5 Arco, 6 Portone. Aperta/o con 4-6 (chiusa/o con 1-3)
    materialePorta: "legno",
    soglieCollegamenti: { nessuna: 1, porta: 4, arco: 5, portone: 6 },
    sogliaPortaChiusa: 3,
    testoAperturaPorta: "Per Sfondare prova di VR PCN LEM +1.<br>Per Scassinare prova di PR:<br>LEM 1-3 PCN LEM +2<br>LEM 4-6 PCN LEM +3<br>LEM 7-10 PCN LEM +4",
    testoAperturaPortone: "Per Sfondare prova di VR PCN LEM +D4.<br>Per Scassinare prova di PR<br>LEM 1-3 PCN LEM +2<br>LEM 4-6 PCN LEM +3<br>LEM 7-10 PCN LEM +4",

    // Scale: 1 SI / 2-6 NO. Direzione D4. Livelli: 1D3
    sogliaScale: 1,
    livelliScale: { dado: 3, bonus: 0 },

    // Mobilio: 1-5 SI. Tipo con D6: 1-3 piccolo, 4-5 medio, 6 grande
    sogliaMobilio: 5,
    tabellaMobilio: ["ostacolo piccolo", "ostacolo piccolo", "ostacolo piccolo", "ostacolo medio", "ostacolo medio", "ostacolo grande"],

    // Risorse: 1-2 Niente, 3 Funghi, 4-5 Legno, 6 Vetri rotti
    tabellaRisorse: [
        "Trovate... niente",
        "Trovate... niente",
        "Trovate dei funghi (se c'è un mezz'uomo: 1D4+1 razioni)",
        "Trovate dei pezzi di legno (1D4 torce, durata 1 ora)",
        "Trovate dei pezzi di legno (1D4 torce, durata 1 ora)",
        "Trovate dei vetri rotti (ricavabile specchietto portatile)"
    ]
};

window.onload = () => avviaStanza(DATI_STANZA);
