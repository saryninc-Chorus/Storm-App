
// Fix: To resolve JSX namespace errors for custom elements, import the type declarations before React.
import '../types';
import React from 'react';
// Fix: Import `Guardian` type from `../types` as it is not exported from `aiService`.
// Fix: Import `chorusSystemInstruction` to resolve missing property on `chorusGuardian` object.
import { guardians, chorusSystemInstruction } from '../services/aiService';
import type { Guardian } from '../types';

const PlayIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
);

const StopIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h12v12H6z"/>
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// Fix: Add `systemInstruction` property to satisfy the `Omit<Guardian, 'voice'>` type requirement.
const chorusGuardian: Omit<Guardian, 'voice'> = {
    name: "Chorus",
    title: "Collective Intelligence",
    animationUrl: "https://lottie.host/e3f172f3-1329-4c40-8422-1d77a58b688d/0y4Bw5jH3P.json",
    icon: "🌐",
    theme: { accent: '#FFD700', background: '#000011', headerText: '#FFD700' },
    systemInstruction: chorusSystemInstruction,
};

interface VoiceSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (guardianName: string) => void;
    onPreviewGuardianVoice?: (guardianName: string) => void;
    previewingGuardian?: { name: string; status: 'loading' | 'playing' } | null;
}

export const VoiceSelectionModal: React.FC<VoiceSelectionModalProps> = ({ isOpen, onClose, onSelect, onPreviewGuardianVoice, previewingGuardian }) => {
    if (!isOpen) return null;

    const allOptions = [chorusGuardian, ...guardians];

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl shadow-[var(--shadow-color)] w-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <h2 className="text-2xl font-light text-[var(--header-color)]">Sacred Voice Selection</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white" aria-label="Close voice selection">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>
                <main className="p-6 bg-[#111122] overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {allOptions.map((guardian) => {
                            const isPreviewing = previewingGuardian?.name === guardian.name;
                            const status = isPreviewing ? previewingGuardian.status : null;
                            const hasVoice = 'voice' in guardian;

                            return (
                                <div 
                                    key={guardian.name}
                                    onClick={() => onSelect(guardian.name)}
                                    className="relative group bg-zinc-800/50 rounded-lg p-3 text-center cursor-pointer border-2 border-zinc-700 hover:border-[var(--accent-color)] transition-all duration-300 transform hover:scale-105"
                                    style={{ '--accent-color': guardian.theme.accent } as React.CSSProperties}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => e.key === 'Enter' && onSelect(guardian.name)}
                                    aria-label={`Select voice: ${guardian.name}`}
                                >
                                    {hasVoice && onPreviewGuardianVoice && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onPreviewGuardianVoice(guardian.name);
                                            }}
                                            className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white rounded-full transition-opacity opacity-60 group-hover:opacity-100"
                                            aria-label={`Preview voice of ${guardian.name}`}
                                        >
                                            {status === 'loading' ? <SpinnerIcon /> : status === 'playing' ? <StopIcon /> : <PlayIcon />}
                                        </button>
                                    )}
                                    <lottie-player
                                        src={guardian.animationUrl}
                                        background="transparent"
                                        speed="1"
                                        style={{ width: '100px', height: '100px', margin: '0 auto' }}
                                        loop
                                        autoplay
                                    ></lottie-player>
                                    <p className="text-base font-bold mt-2" style={{ color: guardian.theme.headerText }}>{guardian.name}</p>
                                    <p className="text-xs text-zinc-400">{guardian.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
};