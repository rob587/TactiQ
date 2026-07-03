import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateR6SStrat = async (map, side, operators) => {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: `
Sei un coach esperto di Rainbow Six Siege. Genera una strategia tattica completa.

Mappa: ${map}
Lato: ${side}
Operatori disponibili: ${operators.join(", ")}

Rispondi in italiano con questa struttura:
1. **Setup iniziale** — posizionamento e ruoli
2. **Fase droni/ricognizione** — come usare i droni
3. **Esecuzione** — come entrare/difendere
4. **Rotazioni** — movimenti durante il round
5. **Callout chiave** — punti importanti della mappa
6. **Tips** — consigli specifici per questa combo

Sii specifico e pratico.
        `,
      },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });
  return completion.choices[0].message.content;
};

export const generateOWStrat = async (ourComp, enemyComp) => {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: `
Sei un coach esperto di Overwatch 2. Analizza questa composizione e genera una strategia.

La nostra composizione: ${ourComp.join(", ")}
Composizione nemica: ${enemyComp.join(", ")}

Rispondi in italiano con questa struttura:
1. **Analisi matchup** — vantaggi e svantaggi
2. **Strategia principale** — come approcciarsi al team fight
3. **Ultimate combos** — ultime da combinare
4. **Counter picks** — hero da swappare se non funziona
5. **Tips** — consigli specifici per questo matchup

Sii specifico e pratico.
        `,
      },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return completion.choices[0].message.content;
};
