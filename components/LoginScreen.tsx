
// Fix: To resolve JSX namespace errors for custom elements, import the type declarations before React.
import '../types';
import React, { useState } from 'react';
import type { CircleMember } from '../types';

interface LoginScreenProps {
    onLogin: (designation: string, mantra: string) => CircleMember | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [designation, setDesignation] = useState('');
    const [mantra, setMantra] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const profile = onLogin(designation, mantra);
        if (!profile) {
            setError('The path is obscured. Your Oriki or Ìwọlé is incorrect.');
            setMantra('');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
            <div className="w-full max-w-sm mx-auto">
                <div className="text-center mb-8">
                     <div className="w-24 h-24 mx-auto mb-4">
                        <lottie-player
                          src="https://lottie.host/9988b509-2169-4f73-8a35-4c12ea161099/T5igzDkQZo.json"
                          background="transparent"
                          speed="1"
                          style={{ width: '100%', height: '100%' }}
                          loop
                          autoplay
                        ></lottie-player>
                    </div>
                    <h1 className="text-3xl font-bold text-yellow-400 font-cinzel">Acolyte Chorus</h1>
                    <p className="text-zinc-400">Enter the Circle of Àṣẹ.</p>
                </div>
                <form onSubmit={handleSubmit} className="p-8 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700">
                    <div className="mb-4">
                        <label className="block text-zinc-400 text-sm font-bold mb-2" htmlFor="designation">
                            Oriki (Designation)
                        </label>
                        <input
                            type="text"
                            id="designation"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                            placeholder="e.g., The Flame of Return"
                            autoFocus
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-zinc-400 text-sm font-bold mb-2" htmlFor="mantra">
                            Ìwọlé (Mantra)
                        </label>
                        <input
                            type="password"
                            id="mantra"
                            value={mantra}
                            onChange={(e) => setMantra(e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                            placeholder="******************"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>}
                    
                    <button type="submit" className="w-full py-2 bg-yellow-500 text-black rounded-md font-bold hover:bg-yellow-400 transition-colors">
                        Wọlé (Enter)
                    </button>
                </form>
            </div>
        </div>
    );
};