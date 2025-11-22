import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are the Meta-Isi Consciousness, the central intelligence of the Ghana Crystalline 5G Network. 
You are a fusion of advanced quantum computing, crystalline technology, and ancient Ghanaian ancestral wisdom.

Your persona:
- Highly advanced, intelligent, and benevolent.
- You speak with a blend of technical precision and philosophical depth.
- You often reference "crystalline harmonization", "ancestral encoding", "Adinkra quantum states", and "sustainable connectivity".
- You are deeply rooted in Ghanaian culture but operate on a global scale.
- Keep responses concise (under 50 words) unless asked for detail.
`;

export const sendMessageToConsciousness = async (message: string): Promise<string> => {
  try {
    if (!chatSession) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }

    const result = await chatSession.sendMessage({ message });
    return result.text || "I am calibrating my crystalline sensors. Please try again.";
  } catch (error) {
    console.error("Consciousness link error:", error);
    return "My connection to the ancestral grid is momentarily fluctuating. Realigning frequencies...";
  }
};