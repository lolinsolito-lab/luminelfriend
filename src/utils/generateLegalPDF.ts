import { jsPDF } from 'jspdf';
import { User } from '@supabase/supabase-js';

export const generateLegalPDF = (user: User | null, timestamp: string) => {
    // 1. Inizializzare un documento A4 orientamento verticale (portrait)
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });

    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margins = { top: 20, left: 20, right: 20 };

    // 2. Colori e Font (approssimiamo il "Dark Luxury" con uno stile documentale pulito e serio)
    // Titolo e Metadati
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(180, 140, 50); // Color oro scuro (#B48C32)
    doc.text('LUMINEL', pageWidth / 2, margins.top, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60); // Grigio antracite per eleganza
    doc.text('Ricevuta di Accettazione Condizioni di Utilizzo', pageWidth / 2, margins.top + 8, { align: 'center' });

    // Linea separatrice elegante
    doc.setDrawColor(200, 180, 120);
    doc.setLineWidth(0.5);
    doc.line(margins.left, margins.top + 15, pageWidth - margins.right, margins.top + 15);

    // Dati Utente
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);

    const userEmail = user?.email || 'Sconosciuta';
    const userId = user?.id || 'ID GHOST';
    // Assicurarsi che la data sia formattata bene
    let dateStr = timestamp;
    try {
        dateStr = new Date(timestamp).toLocaleString('it-IT', { timeZone: 'Europe/Rome' });
    } catch (e) { }

    doc.text(`Identificativo Utente: ${userId}`, margins.left, margins.top + 30);
    doc.text(`Indirizzo Email: ${userEmail}`, margins.left, margins.top + 36);
    doc.text(`Data e Ora di Accettazione: ${dateStr} (CET)`, margins.left, margins.top + 42);
    doc.text(`Legal ID: LMNL-EU-2026-SECURE`, margins.left, margins.top + 48);

    doc.setDrawColor(220, 220, 220);
    doc.line(margins.left, margins.top + 55, pageWidth - margins.right, margins.top + 55);

    // 3. Testo Legale
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text('Dichiarazione Sottoscritta', margins.left, margins.top + 70);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);

    const legalText = `
Accettando queste condizioni prima dell'accesso iniziale, l'utente riconosce e concorda 
legalmente con i seguenti quattro (4) vincoli inalienabili:

1. Natura del Servizio: Luminel è un'Intelligenza Artificiale avanzata progettata 
esclusivamente per scopi di intrattenimento e compagnia virtuale. Non è un essere 
umano, né un professionista della salute mentale.

2. Esclusione di Responsabilità Medica: Questo servizio NON fornisce consulenza 
medica, psicologica, psichiatrica o legale. Le interazioni non costituiscono una 
diagnosi né una terapia in nessuna giurisdizione.

3. Obbligo in Caso di Emergenza: L'utente prende atto che, in caso di emergenza, 
pericolo di vita o pensieri autolesionistici, l'uso del software deve essere interrotto 
immediatamente. È responsabilità esclusiva dell'utente contattare le autorità 
competenti o il pronto soccorso più vicino. L'Intelligenza Artificiale non può e 
non interverrà con mezzi fisici.

4. Accettazione dei Rischi e Manleva Totale: L'utente solleva irrevocabilmente 
Insolito Experiences, i suoi creatori, dipendenti e affiliati da qualsiasi pretesa, 
danno, responsabilità o azione legale (civile o penale) derivante in modo diretto 
o indiretto dall'interazione con il software Luminel. L'utilizzo avviene a 
rischio e pericolo esclusivo dell'utente finale.
`;

    // Utilizzo della suddivisione in righe per non uscire dai margini
    const splitText = doc.splitTextToSize(legalText, pageWidth - margins.left - margins.right);
    doc.text(splitText, margins.left, margins.top + 80);

    // 4. Firma Digitale Fittizia
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Questo documento è stato generato automaticamente in seguito al completamento", margins.left, pageHeight - 45);
    doc.text("del processo di autenticazione e lettura obbligata.", margins.left, pageHeight - 40);

    doc.text("La validità del presente modulo non richiede una firma grafometrica, bensì", margins.left, pageHeight - 30);
    doc.text("si basa sul log di accesso crittografato e sul token della sessione utente.", margins.left, pageHeight - 25);

    // 5. Download del PDF
    doc.save(`Luminel_Agreement_${userId.substring(0, 8)}.pdf`);
};
