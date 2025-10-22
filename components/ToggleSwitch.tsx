
// Fix: Import global types before React to ensure JSX namespace augmentation is applied correctly.
import '../types';
import React from 'react';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  id?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange, id = "voice-toggle" }) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer select-none">
      <span className="mr-3 text-sm font-medium text-gray-300">{label}</span>
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
          aria-label={label}
        />
        <div className="w-12 h-6 bg-zinc-700 rounded-full ring-2 ring-transparent peer-focus:ring-[var(--accent-color)] peer-checked:bg-[var(--accent-color)] transition-colors duration-300"></div>
        <div
          className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-6"
        ></div>
      </div>
    </label>
  );
};