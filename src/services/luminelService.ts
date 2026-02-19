// import { GoogleGenAI } from "@google/genai";

// Configurazione: In Simulation Mode per default.
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// const ai = new GoogleGenAI({ apiKey });

export interface Message {
  role: 'user' | 'model';
  content: string;
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

export async function sendMessageToLuminel(history: Message[], newMessage: string): Promise<string> {
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
  return LION_SCRIPTS.DEFAULT[index];

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
