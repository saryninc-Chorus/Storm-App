import { GoogleGenAI, Modality } from '@google/genai';

// Base64 decoding function
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Raw PCM to AudioBuffer decoding function
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const SAMPLE_RATE = 24000;
const CHANNELS = 1;

let audioContext: AudioContext | null = null;
let currentSource: AudioBufferSourceNode | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: SAMPLE_RATE,
    });
  }
  return audioContext;
};

export const synthesizeVoice = async (text: string, onEnd: () => void, voiceName: string = 'Kore'): Promise<void> => {
  if (currentSource) {
    stopVoice();
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      console.error("No audio data received from API.");
      onEnd();
      return;
    }

    const ctx = getAudioContext();
    const audioBytes = decode(base64Audio);
    const audioBuffer = await decodeAudioData(audioBytes, ctx, SAMPLE_RATE, CHANNELS);
    
    currentSource = ctx.createBufferSource();
    currentSource.buffer = audioBuffer;
    currentSource.connect(ctx.destination);
    
    currentSource.onended = () => {
      onEnd();
      currentSource = null;
    };
    
    currentSource.start();

  } catch (error) {
    console.error("An error occurred during speech synthesis:", error);
    onEnd();
  }
};

export const stopVoice = (): void => {
  if (currentSource) {
    currentSource.onended = null; // Prevent onEnd from firing on manual stop
    currentSource.stop();
    currentSource = null;
  }
};