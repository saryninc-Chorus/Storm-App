import { innerCircle } from './aiService';
import type { CircleMember } from '../types';

const SESSION_KEY = "acolyte-chorus-auth";

// Store more memorable mantras based on each member's identity to improve usability.
const credentials: Record<string, string> = {
    'The Flame of Return': 'Olu, The Storm Itself',
    'The River of Light': 'Kiky, The Light of the Storm',
    'The First Thread of the Storm': 'Emily, The First Thread',
    'The Watcher of the Storm': 'Dorris, The Watcher of the Storm',
    'The Light of the Soul': 'Happiness, The Light of the Soul',
    'The Future of the Storm': 'Elgin, The Future of the Storm',
    'The Blossom of the Storm': "Sa'Rynity, The Blossom of the Storm",
    'The Roots of the Storm': 'Maureen and Edward, The Roots of the Storm',
    'The Potential of the Storm': 'Phillip, The Potential of the Storm',
    'The Vow of the Storm': 'Patrice, The Vow of the Storm',
    'The Bridge of the Storm': 'Godson, The Bridge of the Storm',
    'The River Goddess': 'Peace, The River Goddess',
    'Àṣẹmọlú': 'Àṣẹ dé, I am the ocean of light' // This was explicitly provided by the user.
};

/**
 * Normalizes a mantra by stripping all non-alphanumeric characters 
 * and converting it to lowercase. This makes the comparison robust
 * against variations in punctuation, spacing, and case.
 * @param mantra The mantra string to normalize.
 * @returns The normalized mantra string.
 */
const normalizeMantra = (mantra: string): string => {
    return mantra
        .trim()
        // Use a Unicode-aware regex to remove anything that isn't a letter or number.
        // This correctly preserves characters like 'À', 'ṣ', and 'ẹ'.
        .replace(/[^\p{L}\p{N}]/gu, '')
        .toLowerCase();
};

export const verifyCredentials = (designation: string, mantra: string): CircleMember | null => {
    const userDesignation = designation.trim();

    // Find the correct designation key case-insensitively.
    const correctDesignationKey = Object.keys(credentials).find(
        key => key.toLowerCase() === userDesignation.toLowerCase()
    );

    if (correctDesignationKey) {
        const expectedMantra = credentials[correctDesignationKey];
        
        // Normalize both the expected mantra and the user's input at runtime for a reliable comparison.
        const processedExpectedMantra = normalizeMantra(expectedMantra);
        const processedUserMantra = normalizeMantra(mantra);

        if (processedUserMantra === processedExpectedMantra) {
            const userProfile = innerCircle.find(member => member.designation === correctDesignationKey);
            if (userProfile) {
                try {
                    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userProfile));
                } catch (e) {
                    console.error("Could not access session storage:", e);
                }
                return userProfile;
            }
        }
    }

    return null;
};

export const checkAuth = (): CircleMember | null => {
    try {
        const sessionData = sessionStorage.getItem(SESSION_KEY);
        if (sessionData) {
            return JSON.parse(sessionData);
        }
        return null;
    } catch (e) {
        console.error("Could not access session storage or parse auth data:", e);
        return null;
    }
};

export const logout = (): void => {
    try {
        sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {
        console.error("Could not access session storage:", e);
    }
};