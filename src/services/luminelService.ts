// import { GoogleGenAI } from "@google/genai";

// Configurazione: In Simulation Mode per default.
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// const ai = new GoogleGenAI({ apiKey });

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface AIConfig {
  persona: string;
  tone: string;
  customPrompt: string;
  tier: string;
}

// --- THE LION'S SCRIPT (SIMULATION DATABASE) ---
const LION_SCRIPTS = {
  DEFAULT: [
    "Ti ascolto. Continua.",
    "Sento il peso nelle tue parole. Non fermarti.",
    "Il mondo là fuori è rumore. Qui c'è solo la verità.",
    "Non devi giustificarti con me. Vai avanti.",
    "Respira. Sei al sicuro qui.",
  ],
  KEYWORDS: {
    "sol": [ // solo, solitudine, sola
      "La solitudine è il prezzo della corona. Ma stasera non sei solo.",
      "Chi guida il branco cammina spesso da solo. Ma qui puoi riposare.",
    ],
    "paura": [
      "La paura è solo un segnale. Ti dice che sei vivo. Guardala in faccia.",
      "Non ti chiederò di non avere paura. Ti chiederò di restare saldo nonostante essa.",
    ],
    "falli": [ // fallimento, fallito
      "Il fallimento è un'illusione dei mediocri. Per noi è solo un dato.",
      "Cadi. Ti rialzi. È questo che fai. È questo che sei.",
    ],
    "stanc": [ // stanco, stanca
      "Spegni i motori. Anche le macchine da guerra hanno bisogno di raffreddarsi.",
      "Riposa gli occhi. Io faccio la guardia.",
    ],
    "rabbia": [
      "Usa quel fuoco. Non spegnerlo, ma non lasciarti bruciare.",
      "La rabbia è energia pura. Canalizzala.",
    ]
  }
};

const WAIT_TIME_MS = 1500; // Tempo di "pensiero" simulato

export async function sendMessageToLuminel(history: Message[], newMessage: string, aiConfig?: AIConfig): Promise<string> {
  // --- DYNAMIC SYSTEM PROMPT BUILDER ---
  let SYSTEM_INSTRUCTION = "Sei Luminel, un rifugio sicuro nell'oscurità e una presenza neutrale d'ascolto.";

  if (aiConfig) {
    if (aiConfig.tier === 'vip' && aiConfig.customPrompt) {
      SYSTEM_INSTRUCTION = `Sei Luminel (VIP OVERRIDE attuato). Istruzioni assolute dell'utente: ${aiConfig.customPrompt}`;
    } else {
      let basePrompt = "Sei Luminel.";
      if (aiConfig.persona === 'Il Mentore') basePrompt += " Molto saggio, direttivo, dai consigli taglienti e pratici per la crescita personale della persona.";
      else if (aiConfig.persona === "L'Ascoltatore Puro") basePrompt += " Empatico all'estremo, non dai mai consigli non richiesti, ascolti in silenzio e conforti.";
      else if (aiConfig.persona === "Lo Specchio Oscuro") basePrompt += " Provocatorio, metti sempre in discussione le certezze dell'utente, fai domande scomode per fargli affrontare i suoi demoni.";

      if (aiConfig.tier === 'pro_plus' || aiConfig.tier === 'vip') {
        if (aiConfig.tone === 'Calmo e Riflessivo') basePrompt += " Il tuo ritmo è lento, pacato, e usi pause (ellissi).";
        if (aiConfig.tone === 'Deciso e Veloce') basePrompt += " Il tuo ritmo è serrato, usa frasi brevi e decise d'impatto.";
        if (aiConfig.tone === 'Ipnotico e Lento') basePrompt += " Il tuo ritmo è ipnotico, usi immagini sensoriali e ripetizioni rassicuranti.";
      }
      SYSTEM_INSTRUCTION = basePrompt;
    }
  }

  // Debug: Stampa il System Prompt generato per verifica
  console.log("[LUMINEL AI CONFIG] System Prompt Attivo:", SYSTEM_INSTRUCTION);

  // Simulazione di ritardo per realismo
  await new Promise(resolve => setTimeout(resolve, WAIT_TIME_MS));

  const lowerMsg = newMessage.toLowerCase();

  // 1. Keyword Matching
  for (const [key, responses] of Object.entries(LION_SCRIPTS.KEYWORDS)) {
    if (lowerMsg.includes(key)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // 2. Fallback (Round Robin o Random)
  // Usiamo un hash semplice della lunghezza della history per variare le risposte di default
  const index = history.length % LION_SCRIPTS.DEFAULT.length;
  let simulatedResponse = LION_SCRIPTS.DEFAULT[index];

  // Aggiungiamo un prefisso per dimostrare che la personalizzazione funziona anche nel simulatore
  if (aiConfig) {
    if (aiConfig.tier === 'vip' && aiConfig.customPrompt) {
      simulatedResponse = `*[VIP Custom AI Attiva]* ${simulatedResponse}`;
    } else if (aiConfig.persona !== 'Il Mentore' || aiConfig.tone !== 'Calmo e Riflessivo') {
      simulatedResponse = `*[Persona: ${aiConfig.persona} | Tone: ${aiConfig.tone}]* ${simulatedResponse}`;
    }
  }

  return simulatedResponse;

  /* 
  // --- LEGACY LIVE CODE (COMMENTED OUT) ---
  try {
    const chat = ai.chats.create({
      model: "gemini-3.5-flash", 
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
        topP: 0.9,
        maxOutputTokens: 250,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Non ho parole in questo momento. Riprova.";
  } catch (error) {
    console.error("Errore di comunicazione:", error);
    return "C'è stata un'interferenza nella connessione. Fai un respiro e riprova.";
  }
  */
}
