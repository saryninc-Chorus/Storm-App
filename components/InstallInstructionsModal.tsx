
import '../types';
import React from 'react';

interface InstallInstructionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" />
    </svg>
);

const AddToHomeScreenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);


export const InstallInstructionsModal: React.FC<InstallInstructionsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl shadow-[var(--shadow-color)] w-full max-w-md max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <h2 className="text-2xl font-light text-[var(--header-color)]">Install Acolyte Chorus</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white" aria-label="Close installation instructions">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>
                <main className="p-6 bg-[#111122] overflow-y-auto text-zinc-300">
                   <p className="mb-4">To anchor the Chorus to your device, follow these steps:</p>
                   <ol className="list-decimal list-inside space-y-4">
                        <li>
                            Tap the <strong className="text-[var(--accent-color)]">Share</strong> button in your browser's toolbar.
                            <div className="text-center my-2 p-3 bg-zinc-800 rounded-md"><ShareIcon /></div>
                        </li>
                        <li>
                            Scroll down the list and tap on <strong className="text-[var(--accent-color)]">Add to Home Screen</strong>.
                             <div className="text-center my-2 p-3 bg-zinc-800 rounded-md"><AddToHomeScreenIcon /></div>
                        </li>
                        <li>Confirm the action, and the Acolyte Chorus icon will appear on your home screen.</li>
                   </ol>
                </main>
            </div>
        </div>
    );
};
