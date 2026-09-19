const DATI_STANZA = {
    titolo: "STANZA 4V",
    pagina: "p.147",
    immagini: {
        "1": "assets/41.png",
        "2": "assets/42.png",
        "3": "assets/43.png",
        "4": "assets/44.png",
        "5": "assets/45.png",
        "6": "assets/46.png"
    },
    // Struttura speciale per gestire l'allagamento
	descrizioni: [
        ["Le pareti sono scalfite da grandi artigliate", "Sul pavimento ci sono pozze di liquame, ovunque"],
        ["Sciami di mosche ronzano intorno ad una carcassa", "Ci sono vistose bruciature sulle pareti"],
        ["Le pareti trasudano efflussi maleodoranti", "Mobili di legno fatti a pezzi"],
        // Gruppo 4: qui la logica è 50% segni cedimento, 50% allagato
        ["Le pareti mostrano evidenti segni di cedimento", "Il pavimento è allagato (vedi Note)"]
    ],

    getNoteSpeciali: function(imgID, descrizioneScelta) {
        let note = "E' possibile accamparsi in questo ambiente.";
        
        // Nota fissa per Stanza 4
        note += "<br><br>TRAPPOLE: Se una trappola viene attivata in uno di questi Ambienti, le creature del prossimo Incontro saranno in allerta. Ottengono +2 Iniziativa.";
        
        // Controllo dinamico allagamento (se la descrizione scelta è esattamente quella)
        if (descrizioneScelta === "Il pavimento è allagato (vedi Note)") {
            note += "<br><br><b>PAVIMENTO ALLAGATO:</b> Muoversi in questo ambiente costa il doppio dei PA";
        }
        
        return note;
    },

    illuminazione: [
        "nessuna (visibilità 1.5m)",
        "Luce fievole (visibilità 6m)",
        "Luce fievole (visibilità 6m)",
        "Luce fievole (visibilità 6m)",
        "Luce normale (visibilità 9m)",
        "Luce normale (visibilità 9m)"
    ],
    provenienzaLuce6m: ["da candele quasi spente", "da riverbero di altri ambienti limitrofi"],
    provenienzaLuce9m: [
        "da due torce appese alle pareti", 
        "da cristalli luminescenti che sbucano dalle pareti irradiando l'ambiente con colori surreali"
    ],

    obiettivi: ["SI", "NO", "NO", "NO", "NO", "NO"],
    uscite: ["SI", "NO", "NO", "NO", "NO", "NO"],

    // Forziere: 1-4 NO / 5-6 SI
    sogliaForziere: 5,

    // Collegamenti: 1 Nessuno, 2-3 Porta, 4-5 Arco, 6 Portone. Aperta/o con 4-6 (chiusa/o con 1-3)
    soglieCollegamenti: { nessuna: 1, porta: 3, arco: 5, portone: 6 },
    sogliaPortaChiusa: 3,

	materialePorta: "legno",
    testoAperturaPorta: "Per Sfondare prova di VR PCN LEM +1<br>Per Scassinare prova di PR: LEM 1-3 +1, 4-6 +2, 7-10 +4",
    testoAperturaPortone: "Per Sfondare prova di VR PCN LEM +D4<br>Per Scassinare prova di PR: LEM 1-3 +1, 4-6 +2, 7-10 +4",

    // Trappola: 1-3 Lame dalle pareti / 4-6 Parete scorrevole
    tipoTrappola: [
        "<b>Lame dalle pareti</b> (Danno: Tagliente, 1D10+2 PF ogni 3 LE del PG, prova PR Complicata 10+ per dimezzare i danni)",

        // Parete scorrevole: 1D2 gruppi di creature; per ogni gruppo si tira un D4 per il tipo
        function (rTipo) {
            const tipiCreatura = [
                "Nidiata di Ratti Infestanti",
                "Nidiata di Ratti Infestanti",
                "Stormo di Pipistrelli",
                "Stormo di Pipistrelli"
            ];
            const nGruppi = roll(2);
            let righe = "";
            for (let i = 1; i <= nGruppi; i++) {
                const t = roll(4);
                righe += `<br>Gruppo ${i}: ${tipiCreatura[t - 1]} ${getTirid(4, t)}`;
            }
            return `<b>Parete scorrevole</b> ${getTirid(6, rTipo)}<br>` +
                   `Da dietro la parete fuoriescono ${nGruppi} ${nGruppi === 1 ? "gruppo" : "gruppi"} di creature ${getTirid(2, nGruppi)}` +
                   `${righe}<br><small>(Vedi Bestiario)</small>`;
        }
    ],
	statTrappola: "Per Disattivare o Riarmare Trappola prova di PR:<br>LEM 1-3 Complicata 10+<br>LEM 4-6 Difficile 15+<br>LEM 7-10 Difficilissima 20+",
    
    tabellaForziere: [
        "Trovi... niente, il forziere è vuoto!",
        "Trovi un <b>Tesoro Minore</b> (Vedi p.166)",
        "Trovi un <b>Tesoro Comune</b> (Vedi p.166)",
        "Trovi un <b>Indizio</b> (Vedi p.165)"
    ],

    // Scale: 1-2 SI / 3-6 NO. Tipo D4, direzione D4, livelli 1D2+1 (2 o 3)
    sogliaScale: 2,
    tipiScale: ["Scale a chiocciola", "Scale a chiocciola", "Rampa", "Elevatore"],
    livelliScale: { dado: 2, bonus: 1 },

    // Incontro: 1-2 SI / 3-5 NESSUNO / 6 SPECIALE
    soglieIncontro: { si: 2, speciale: 6 },
    incontri: {
        lem13: ["Creature umanoidi (p. 9) (LVP+1)", "Creature infestanti (p. 9) (LVP+1)", "Creature non-morte (p. 11) (LVP+1)"],
        lem46: ["Creature umanoidi (p. 9) (LVP+1)", "Creature mostruose (p. 10) (LVP+1)", "Creature magiche (p. 10) (LVP+1)", "Creature non-morte (p. 11) (LVP+1)"],
        lem710: ["Creature umanoidi (p. 9) (LVP+1)", "Creature mostruose (p. 10) (LVP+1)", "Creature magiche (p. 10) (LVP+1)", "Creature extraplanari (p. 10) (LVP+1)", "Creature non-morte (p. 11) (LVP+1)"]
    },

    sogliaMobilio: 4,
    tabellaMobilio: ["ostacolo piccolo", "ostacolo piccolo", "ostacolo piccolo", "ostacolo medio", "ostacolo medio", "ostacolo medio"],

    tabellaRisorse: [
        "Trovate... niente",
        "Trovate... niente",
        "Trovate dei funghi (Mezz'uomo ricava 1D4 razioni)",
        "Trovate dei funghi (Mezz'uomo ricava 1D4 razioni)",
        "Trovate dei funghi (Mezz'uomo ricava 1D4 razioni)",
        "Trovate dei funghi (Mezz'uomo ricava 1D4 razioni)"
    ]
};

window.onload = () => avviaStanza(DATI_STANZA);
