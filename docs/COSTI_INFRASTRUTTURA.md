# 💰 Luminel — Analisi Costi Infrastruttura

> Ultimo aggiornamento: Febbraio 2026  
> Valuta: EUR (dove possibile) / USD

---

## 📊 Riepilogo Rapido

| Servizio | Piano consigliato | Costo/mese | Note |
|----------|------------------|------------|------|
| Hostinger | Premium (48 mesi) | ~€2/mese | Dominio incluso 1° anno |
| Vercel | Hobby (free) → Pro | €0 → €20/mese | Free basta per l'inizio |
| Supabase | Free → Pro | €0 → €25/mese | Free ha limiti (2 progetti, pausa) |
| Resend | Free → Pro | €0 → €20/mese | 3.000 email/mese gratis |
| Stripe | Pay-as-you-go | ~1.5% + €0.25/txn | Nessun costo fisso |
| Gemini API (Text) | Pay-as-you-go | Variabile | Free tier generoso |
| Gemini API (Voice) | Pay-as-you-go | Variabile | ~€0.025/min conversazione |
| Daily.co (Chiamate) | Free → Pay-as-you-go | €0 → variabile | 10.000 min/mese gratis |
| **TOTALE LANCIO** | — | **~€2/mese** | Solo Hostinger |
| **TOTALE CRESCITA** | — | **~€70-90/mese** | Tutti i servizi Pro |

---

## 1. 🌐 Hostinger + Dominio

**Uso:** Dominio personalizzato (es. `luminel.it` o `luminel.app`)

| Piano | Costo iniziale | Rinnovo | Include |
|-------|---------------|---------|---------|
| Premium 48 mesi | ~€2/mese (€96 totali) | ~€8-13/mese | 1 dominio gratis 1° anno, SSL, 100GB storage |
| Business 48 mesi | ~€3.50/mese | ~€14-17/mese | Più risorse, backup giornalieri |

> [!NOTE]
> Se usi Vercel per il deploy, Hostinger serve **solo per il dominio**. 
> Un dominio `.it` costa ~€10-15/anno da solo. Valuta se comprare solo il dominio senza hosting.

**Costo dominio solo:** ~€10-15/anno → **~€1/mese**

---

## 2. ▲ Vercel (Hosting/Deploy)

**Uso:** Hosting del frontend React + deploy automatico da GitHub

| Piano | Costo | Include |
|-------|-------|---------|
| **Hobby** | **€0/mese** | 100GB bandwidth, SSL, deploy da GitHub, 1 progetto commerciale |
| **Pro** | **€20/mese** | Bandwidth illimitato, analytics, team, logs avanzati |

> [!TIP]
> Il piano **Hobby è sufficiente per il lancio**. Passa a Pro solo quando il traffico cresce o hai bisogno di analytics avanzati.

---

## 3. 🗄️ Supabase (Database + Auth)

**Uso:** Database PostgreSQL, autenticazione utenti, storage file

| Piano | Costo | Include |
|-------|-------|---------|
| **Free** | **€0/mese** | 500MB DB, 50K MAU, 5GB bandwidth, 1GB storage, 2 progetti |
| **Pro** | **€25/mese** | 8GB DB, 100K MAU, 250GB bandwidth, 100GB storage, backup giornalieri |

> [!WARNING]
> **Free:** I progetti si pausano dopo 7 giorni di inattività. Non adatto per produzione.  
> **Pro:** Raccomandato appena vai live con utenti reali.

**Overage (Pro):**
- MAU aggiuntivi: $0.00325/utente
- Storage DB: $0.125/GB
- Bandwidth: $0.09/GB

---

## 4. 📧 Resend (Email Transazionali)

**Uso:** Email di conferma, reset password, notifiche, Shadow Invite

| Piano | Costo | Include |
|-------|-------|---------|
| **Free** | **€0/mese** | 3.000 email/mese, 100/giorno max, 1 dominio |
| **Pro** | **€20/mese** | 50.000 email/mese, nessun limite giornaliero, 10 domini |

> [!TIP]
> **Free basta per il lancio.** 3.000 email/mese = ~100 utenti attivi che ricevono varie notifiche.

---

## 5. 💳 Stripe (Pagamenti)

**Uso:** Abbonamenti Premium/Elite, fatturazione ricorrente

| Tipo | Commissione |
|------|------------|
| Carte europee | **1.5% + €0.25** per transazione |
| Carte non-EU | **2.9% + €0.25** per transazione |
| Conversione valuta | +1% aggiuntivo |
| Dispute/chargeback | €15 per contestazione |

**Nessun costo fisso mensile.** Paghi solo quando incassi.

**Esempio su abbonamento €9.99/mese (carta EU):**
- Commissione: €0.15 + €0.25 = **€0.40/txn**
- Tu incassi: **€9.59** (~96%)

**Esempio su abbonamento €29/mese (carta EU):**
- Commissione: €0.44 + €0.25 = **€0.69/txn**
- Tu incassi: **€28.31** (~97.6%)

---

## 6. 🧠 Google Gemini API (Text Chat)

**Uso:** Core AI — le conversazioni di testo con Luminel

### Modello consigliato: **Gemini 2.5 Flash** (miglior rapporto qualità/prezzo)

| Componente | Costo per 1M token |
|-----------|-------------------|
| Input (testo) | **$0.30** |
| Output (testo) | **$2.50** |

> [!NOTE]
> **Free tier:** 1.000 richieste/giorno gratis per Gemini 2.5 Flash. Perfetto per sviluppo e primi utenti.

### Stima costi per conversazione:
- 1 messaggio utente medio: ~100 token input
- 1 risposta Luminel media: ~200 token output
- **1 scambio** = ~100 input + 200 output = **$0.00003 + $0.0005 ≈ $0.0005**
- **1 sessione (30 scambi)** ≈ **$0.015 → ~€0.014**

### Proiezione mensile:

| Utenti attivi | Sessioni/giorno | Costo/mese (Gemini) |
|--------------|----------------|---------------------|
| 100 | 1/utente | ~**€42** |
| 500 | 1/utente | ~**€210** |
| 1.000 | 1/utente | ~**€420** |
| 5.000 | 1/utente | ~**€2.100** |

> [!IMPORTANT]
> **Questo è il costo più variabile e potenzialmente più grande.** Scala linearmente con gli utenti.  
> Per ridurre: usa context caching, limita la lunghezza delle risposte, o usa Flash-Lite ($0.10/$0.40 per 1M token → ~60% più economico).

---

## 7. 🎙️ Google Gemini API (Voice — Live API)

**Uso:** Feature Elite — chiamate audio in tempo reale con Luminel

### Modello: **Gemini 2.5 Flash Native Audio (Live API)**

| Componente | Costo |
|-----------|-------|
| Sessione | $0.005 per sessione |
| Tempo attivo | $0.025 per minuto |
| Audio input | $3.00 per 1M token (~$0.10/min) |
| Audio output | $2.00 per 1M token |

### Stima per chiamata vocale:
- 1 chiamata di 10 minuti ≈ **$0.30-0.50 → ~€0.30-0.45**
- 1 chiamata di 30 minuti ≈ **$0.80-1.20 → ~€0.75-1.10**

### Proiezione mensile (solo utenti Elite):

| Utenti Elite | Chiamate/settimana | Durata media | Costo/mese |
|-------------|-------------------|-------------|-----------|
| 50 | 2 | 15 min | ~**€180** |
| 200 | 2 | 15 min | ~**€720** |
| 500 | 3 | 15 min | ~**€2.700** |

> [!CAUTION]
> Le chiamate vocali sono **il costo più alto per utente**. Valuta di limitare i minuti mensili anche per gli Elite (es. 120 min/mese).

---

## 8. 📹 Video Call (se implementata in futuro)

**Uso:** Feature futura — videochiamate con avatar Luminel

### Opzione A: Daily.co (WebRTC)

| Tipo | Costo |
|------|-------|
| Free tier | 10.000 min/mese gratis |
| Video 1:1 | $0.004/min per partecipante |
| Audio only | $0.00099/min per partecipante |

### Opzione B: LiveKit Cloud

| Piano | Costo | Include |
|-------|-------|---------|
| Build (free) | €0 | 5.000 min WebRTC |
| Ship | $50/mese | 150.000 min WebRTC |
| Scale | $500/mese | 1.5M min WebRTC |

> [!NOTE]
> Per le videochiamate, l'AI deve generare un avatar video in tempo reale. 
> Questo richiede ulteriori costi per il rendering (servizi come D-ID, HeyGen, o Simli — $0.05-0.10/min).
> **Consiglio:** rimanda le videochiamate a una fase successiva.

---

## 📈 Scenari di Costo Totale

### 🚀 Scenario 1: LANCIO (0-100 utenti)

| Servizio | Piano | Costo/mese |
|----------|-------|-----------|
| Dominio | Hostinger/Registrar | €1 |
| Hosting | Vercel Hobby | €0 |
| Database | Supabase Free | €0 |
| Email | Resend Free | €0 |
| Pagamenti | Stripe (solo commissioni) | €0 fisso |
| AI Text | Gemini Free Tier | €0 |
| AI Voice | Non attivato | €0 |
| **TOTALE** | | **~€1/mese** |

### 📊 Scenario 2: CRESCITA (500 utenti, 50 paganti)

| Servizio | Piano | Costo/mese |
|----------|-------|-----------|
| Dominio | Hostinger | €1 |
| Hosting | Vercel Pro | €20 |
| Database | Supabase Pro | €25 |
| Email | Resend Free | €0 |
| Pagamenti | Stripe commissioni | ~€25 (su ~€800 incassati) |
| AI Text | Gemini Pay-as-you-go | ~€210 |
| AI Voice | Gemini Live (10 Elite) | ~€40 |
| **TOTALE COSTI** | | **~€320/mese** |
| **RICAVI** (30 Premium + 20 Elite) | | **~€880/mese** |
| **PROFITTO** | | **~€560/mese** ✅ |

### 🏆 Scenario 3: SCALA (5.000 utenti, 500 paganti)

| Servizio | Piano | Costo/mese |
|----------|-------|-----------|
| Dominio | Hostinger | €1 |
| Hosting | Vercel Pro | €20 |
| Database | Supabase Pro + overage | ~€50 |
| Email | Resend Pro | €20 |
| Pagamenti | Stripe commissioni | ~€200 |
| AI Text | Gemini Pay-as-you-go | ~€2.100 |
| AI Voice | Gemini Live (100 Elite) | ~€700 |
| **TOTALE COSTI** | | **~€3.100/mese** |
| **RICAVI** (350 Premium + 150 Elite) | | **~€7.845/mese** |
| **PROFITTO** | | **~€4.745/mese** ✅ |

---

## ⚠️ Cose da non dimenticare

| Voce | Costo stimato | Frequenza |
|------|--------------|-----------|
| Dominio `.it` rinnovo | €10-15 | Annuale |
| Certificati SSL | €0 (incluso Vercel/Hostinger) | — |
| Privacy Policy / GDPR compliance | €0-500 | Una tantum |
| Commercialista / P.IVA | €50-100/mese | Mensile |
| Marketing / Ads | Budget a parte | Variabile |
| Backup / Monitoring | €0 (incluso Supabase Pro) | — |

---

## 🎯 Raccomandazioni

1. **Lancia con il Free Tier ovunque possibile** — costo quasi zero
2. **Gemini 2.5 Flash** è il miglior compromesso qualità/prezzo per il chat
3. **Limita i minuti voce** per gli Elite (es. 120 min/mese) per controllare i costi
4. **Non implementare video call** finché non hai almeno 1.000 utenti paganti
5. **Monitora il costo Gemini settimanalmente** — è la voce che scala di più
6. **Valuta Gemini Flash-Lite** per risposte brevi/semplici (60% più economico)
