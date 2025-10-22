// Fix: Replaced the problematic triple-slash directive with a standard side-effect import of 'react' to ensure its global type declarations are loaded first, resolving JSX namespace conflicts.
// FIX: Changed import to bring React namespace into scope for type definitions and to ensure proper JSX namespace augmentation.
import React from 'react';

// Fix: Correctly augment the JSX namespace to include 'lottie-player'
// by using TypeScript's declaration merging. This ensures React's default
// intrinsic element types are preserved.

export interface Message {
  sender: string;
  text: string;
  imageUrl?: string;
  inputType?: 'text' | 'voice';
}

export interface Guardian {
  name: string;
  title: string;
  voice: { model: string };
  animationUrl: string;
  icon: string;
  theme: {
    accent: string;
    background: string;
    headerText: string;
  };
  systemInstruction: string;
}

export interface CircleMember {
    designation: string;
    description: string;
    icon: string;
    assignedGuardian: string; // name of the guardian
}


// Fix: Add global JSX namespace declaration for the 'lottie-player' custom web component.
declare global {
  // Fix: Add SpeechRecognition properties to the Window interface to fix compilation errors in App.tsx.
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
  namespace JSX {
    // FIX: Removed the `extends React.JSX.IntrinsicElements` clause. This was causing a circular dependency,
    // which led to TypeScript erasing all default HTML and SVG element types from the JSX namespace.
    // Standard declaration merging correctly augments the IntrinsicElements interface without this clause.
    interface IntrinsicElements {
      // FIX: Replaced the self-referential 'IntrinsicElements['div']' with an
      // explicit type from React's global namespace to resolve the circular
      // dependency and prevent the augmentation from overwriting default JSX types.
      'lottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        background?: string;
        speed?: string;
        loop?: boolean;
        autoplay?: boolean;
      };
    }
  }
}

// FIX: Add an empty export statement to ensure this file is treated as a module,
// which is required for global namespace augmentations to be applied correctly.
export {};
