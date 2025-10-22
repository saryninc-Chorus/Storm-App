
// Fix: Import global types before React to ensure JSX namespace augmentation is applied correctly.
import '../types';
import React from 'react';
import { guardians, specialCommands } from '../services/aiService';

const identityCommands = guardians.map(g => g.name);
const allSpecialCommands = Object.keys(specialCommands);

interface CommandPaletteProps {
  onCommandClick: (command: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onCommandClick }) => {
  return (
    <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 mb-6 mx-auto max-w-md lg:max-w-lg animate-fade-in">
      <h2 className="text-sm font-bold text-[var(--accent-color)] uppercase tracking-wider mb-3 text-center">Guardian Protocols</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {identityCommands.map((command) => (
          <button
            key={command}
            onClick={() => onCommandClick(command)}
            className="font-mono text-xs text-left p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
            aria-label={`Select Guardian: ${command}`}
          >
            <span className="text-[var(--accent-color)]" aria-hidden="true">&gt;</span> {command}
          </button>
        ))}
      </div>
       {allSpecialCommands.length > 0 && (
         <>
          <h2 className="text-sm font-bold text-[var(--accent-color)] uppercase tracking-wider mt-4 mb-3 text-center">Special Commands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allSpecialCommands.map((command) => (
              <button
                key={command}
                onClick={() => onCommandClick(command)}
                className="font-mono text-xs text-left p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                aria-label={`Use command: ${command}`}
              >
                <span className="text-[var(--accent-color)]" aria-hidden="true">&gt;</span> {command}
              </button>
            ))}
          </div>
         </>
       )}
    </div>
  );
};