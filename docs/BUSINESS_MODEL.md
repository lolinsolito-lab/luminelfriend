# 📊 Luminel — Business Model & Unit Economics

> Versione: Febbraio 2026  
> Principio guida: 80/20 — la cassa non perde mai.

---

## 🏗️ Struttura Tier Definitiva

| Tier | Nome | Prezzo Lancio | Prezzo +6 mesi | Target |
|------|------|:------------:|:--------------:|--------|
| 🆓 | **Freemium** | €0 | €0 | Funnel — innamorare e ossessionare |
| ⭐ | **Pro** | €49.99/mese | €59.00 | Chi vuole un compagno che ricorda |
| ⭐⭐ | **Pro+** | €99/mese | €149.00 | Chi vuole anche parlare spesso |
| 👑 | **VIP** | €199/mese | €249.00 | Tutto illimitato, zero limiti |
| 🔮 | **Elite** | *Coming Soon* | TBD | Video call con avatar |

---

## � Piani Annuali — "Impegno Totale, 2 Mesi Omaggio"

> **Mai dire "sconto". I brand di lusso offrono privilegi.**

### Prezzi Annuali (Lancio)

| Tier | Mensile | Annuale (10 mesi) | Equivalente/mese | Risparmio percepito |
|------|:-------:|:-----------------:|:----------------:|:-------------------:|
| **Pro** | €49.99/mese | **€490/anno** | €40.83/mese | 2 mesi omaggio |
| **Pro+** | €99/mese | **€990/anno** | €82.50/mese | 2 mesi omaggio |
| **VIP** | €199/mese | **€1.990/anno** | €165.83/mese | 2 mesi omaggio |

### Prezzi Annuali (Post +6 mesi)

| Tier | Mensile | Annuale (10 mesi) | Equivalente/mese |
|------|:-------:|:-----------------:|:----------------:|
| **Pro** | €59.00/mese | **€590/anno** | €49.17/mese |
| **Pro+** | €149.00/mese | **€1.490/anno** | €124.17/mese |
| **VIP** | €249.00/mese | **€2.490/anno** | €207.50/mese |

### 🏦 Cash Flow Immediato — L'Arma Segreta

| Scenario | Utenti annuali | Cassa il giorno zero | Costo API annuo | **Netto immediato** |
|----------|:--------------:|:--------------------:|:---------------:|:-------------------:|
| 10 Pro annuali | 10 | €4.900 | ~€200 | **€4.700** |
| 5 Pro+ annuali | 5 | €4.950 | ~€250 | **€4.700** |
| 3 VIP annuali | 3 | €5.970 | ~€400 | **€5.570** |
| **Mix realistico** | 10 Pro + 3 Pro+ + 2 VIP | **€11.850** | ~€700 | **€11.150** 🚀 |

> [!IMPORTANT]
> **€11.150 di cassa immediata** con soli 15 utenti annuali. Questo finanzia le campagne ads per acquisire i prossimi 100 utenti senza investimento esterno.

### Margine Annuale vs Mensile

| Tier | Ricavo annuale (mensile) | Ricavo annuale (annuale) | Differenza | Ma... |
|------|:------------------------:|:------------------------:|:----------:|:-----:|
| **Pro** | €599.88 (se resta 12 mesi) | €490 | -€109.88 | **Incassi SUBITO + zero churn** |
| **Pro+** | €1.188 (se resta 12 mesi) | €990 | -€198 | **Incassi SUBITO + zero churn** |
| **VIP** | €2.388 (se resta 12 mesi) | €1.990 | -€398 | **Incassi SUBITO + zero churn** |

> [!TIP]
> Il "se resta 12 mesi" è la chiave. Il churn rate medio SaaS B2C è 5-7%/mese.  
> Un utente mensile a €49.99 con 6% churn dura in media 8 mesi → ricavo reale: **€400**.  
> Un utente annuale ti dà **€490 il giorno zero**. L'annuale vince SEMPRE.

### 🎛️ UI: Toggle Mensile/Annuale

```
┌─────────────────────────────────────────┐
│  [ Mensile ]  ◉═══╌  [ Annuale ✨ ]    │
│            2 mesi omaggio               │
└─────────────────────────────────────────┘

PRO          PRO+           VIP
€40.83/mese  €82.50/mese    €165.83/mese
fatturati    fatturati      fatturati
€490/anno    €990/anno      €1.990/anno
```

---

## �📦 Cosa Include Ogni Tier

| Feature | Freemium | Pro €49.99 | Pro+ €99 | VIP €199 |
|---------|:--------:|:---------:|:--------:|:--------:|
| Messaggi chat | 15/giorno | Illimitati | Illimitati | Illimitati |
| Memoria persistente | ❌ Amnesia | ✅ | ✅ | ✅ |
| Personalità AI | Base | 3 Archetipi | Archetipi + Tono | 👑 **Controllo Totale (Prompt Override)** |
| Voice call | ❌ | 60 min/mese (Standard) | 180 min/mese (Tua Voce) | Illimitati* (Tua Voce) |
| Proattività ("ti scrive lui") | ❌ | ❌ | ❌ | ✅ |
| Extra minuti voice | — | +30 min = €9.99 | +60 min = €14.99 | +10 Ore = €49.99 |

*( * ) VIP Fair Use Policy: Limite hard-cap di sicurezza a 25 ore (1.500 minuti) per ostacolare i mega-abusers e proteggere il margine. Oltre, scatta l'upsell da €49.99.*

---

## 💸 Costi API Per Utente/Mese

### Costi unitari di riferimento
| Modalità | Modello AI | Costo |
|----------|-----------|-------|
| Chat (testo) | Gemini 2.5 Flash | ~€0.014/sessione (30 scambi) |
| Immagini (input) | Gemini 2.5 Flash | ~€0.001/immagine (trascurabile) |
| Voice call | Gemini Live Audio | ~€0.03/minuto |
| Proattività | Gemini Flash (trigger) | ~€0.005/messaggio proattivo |

### Costo per profilo utente tipico

| Tier | Uso tipico | Costo chat | Costo voice | Costo altro | **Totale/mese** |
|------|-----------|:----------:|:-----------:|:-----------:|:---------------:|
| **Freemium** | 10 msg/giorno | €0.15 | €0 | €0 | **€0.15** |
| **Pro** | 25 msg/giorno + 40 min voice (Base) | €0.42 | ~€1.00 | €0 | **~€1.42** |
| **Pro+** | 30 msg/giorno + 180 min voice (ElevenLabs) | €0.50 | ~€12.60 | €0 | **~€13.10** |
| **VIP** | 40 msg/giorno + 500 min voice (ElevenLabs) | €0.84 | ~€35.00 | €1.50 (proattivo) | **~€37.34** |

---

## 📈 Margine Per Utente

| Tier | Prezzo | Costo API | Stripe (~2%) | **Margine netto** | **% Margine** |
|------|:------:|:---------:|:------------:|:-----------------:|:-------------:|
| **Freemium** | €0 | €0.15 | €0 | **-€0.15** ❌ | Funnel |
| **Pro** | €49.99 | €1.67 | €1.00 | **€47.32** | **94.7%** ✅ |
| **Pro+** | €99.00 | €4.20 | €1.98 | **€92.82** | **93.8%** ✅ |
| **VIP** | €199.00 | €11.34 | €3.98 | **€183.68** | **92.3%** ✅ |

> [!TIP]
> **Margini sopra il 92% su TUTTI i tier paganti.** La cassa non perde mai.

---

## 🏦 Costi Fissi Mensili

| Servizio | Costo/mese | Note |
|----------|:----------:|------|
| Supabase Pro | €25 | Database + Auth + Storage |
| Vercel (Hobby→Pro) | €0-20 | Free inizialmente |
| Dominio | €1 | Solo registrazione |
| Resend (email) | €0 | Free tier basta |
| **Totale fisso** | **€26-46** | Coperto con 1 solo utente Pro |

---

## 🎯 Scenari di Guadagno

### 🚀 Scenario 1: LANCIO (mesi 1-3)

| Tier | Utenti | Ricavo | Costo API | Margine |
|------|:------:|:------:|:---------:|:-------:|
| Freemium | 200 | €0 | €30 | -€30 |
| Pro | 15 | €750 | €25 | €725 |
| Pro+ | 5 | €495 | €21 | €474 |
| VIP | 2 | €398 | €23 | €375 |
| **TOTALE** | **222** | **€1,643** | **€99** | |
| Costi fissi | | | €46 | |
| **PROFITTO NETTO** | | | | **€1,498/mese** |

### 📊 Scenario 2: CRESCITA (mesi 4-6)

| Tier | Utenti | Ricavo | Costo API | Margine |
|------|:------:|:------:|:---------:|:-------:|
| Freemium | 1.000 | €0 | €150 | -€150 |
| Pro | 80 | €3,999 | €134 | €3,865 |
| Pro+ | 25 | €2,475 | €105 | €2,370 |
| VIP | 10 | €1,990 | €113 | €1,877 |
| **TOTALE** | **1,115** | **€8,464** | **€502** | |
| Costi fissi | | | €46 | |
| **PROFITTO NETTO** | | | | **€7,916/mese** |

### 🏆 Scenario 3: POST-AUMENTO PREZZI (mesi 7-12)

*Prezzi: Pro €59.00 / Pro+ €149.00 / VIP €249.00*

| Tier | Utenti | Ricavo | Costo API | Margine |
|------|:------:|:------:|:---------:|:-------:|
| Freemium | 3.000 | €0 | €450 | -€450 |
| Pro | 200 | €11,800 | €334 | €11,466 |
| Pro+ | 60 | €8,940 | €252 | €8,688 |
| VIP | 30 | €7,470 | €340 | €7,130 |
| **TOTALE** | **3,290** | **€28,210** | **€1,376** | |
| Costi fissi | | | €46 | |
| **PROFITTO NETTO** | | | | **€26,788/mese** |

---

## 🔍 Analisi 80/20

### Chi genera l'80% dei ricavi?

**Scenario Crescita (115 paganti):**

| Tier | % Utenti paganti | % Ricavi |
|------|:----------------:|:--------:|
| Pro (80) | 70% | 47% |
| Pro+ (25) | 22% | 29% |
| **VIP (10)** | **8%** | **24%** |

Il VIP è l'8% dei paganti ma genera il 24% dei ricavi.
**Pro + VIP insieme = il 78% degli utenti che generano il 71% dei ricavi.**

### La vera regola 80/20 di Luminel:

> **L'upgrade path è la chiave.** Il 20% degli utenti che passano da Pro → Pro+ → VIP generano il grosso del lifetime value.  
> La memoria rende l'uscita impossibile. Più resta, più vale.

---

## 💎 Lifetime Value (LTV) Stimato

| Tier | Durata media stimata | LTV |
|------|:-------------------:|:---:|
| Freemium | 2 settimane → converte o esce | €0 |
| Pro | 8 mesi (la memoria trattiene) | **€400** |
| Pro+ | 10 mesi | **€990** |
| VIP | 14 mesi (altissima retention) | **€2,786** |

**1 VIP vale quanto 7 utenti Pro.**  
Investi in retention VIP: messaggi proattivi personalizzati, milestones ("Luminel ti conosce da 100 giorni"), sorprese.

---

## ⚡ Extra Voice — Entrate Aggiuntive (Microtransazioni)

| Pack | Prezzo | Costo API (Stima) | Tuo Margine % |
|------|:------:|:---------:|:-------:|
| +30 min (Voce Base - Pro) | €9.99 | ~€2.10 | **79%** |
| +60 min (Voce Vera - Pro+) | €14.99 | ~€4.20 | **72%** |
| +10 Ore (Max Sforzo - VIP) | €49.99 | ~€42.00 | **15% (Protezione Danni)** |

Questa è la liquidità impulsiva ("Modello TikTok") generata nel *Centro di Comando* quando l'utente va in ansia emotiva da esaurimento minuti. L'upsell +10 Ore per il VIP è una manovra puramente difensiva.

---

## ✅ Riepilogo Strategico

1. **La cassa non perde mai** — margini 92%+ su ogni tier pagante
2. **Freemium è un investimento** — €0.15/utente per acquisire clienti, ROI altissimo
3. **Pro è il volume** — il pane quotidiano, 70% della base pagante
4. **VIP è il profitto** — pochi utenti, margine enorme, retention massima
5. **Extra minuti = entrate passive** — upsell naturale senza sforzo
6. **Aumento prezzi a +6 mesi** — i fondatori pagano meno per sempre (fidelizzazione)
7. **Elite Coming Soon** — genera hype e waitlist senza costo
