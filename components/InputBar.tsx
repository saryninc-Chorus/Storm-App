
// Fix: Import global types before React to ensure JSX namespace augmentation is applied correctly.
import '../types';
import React, { forwardRef, useRef } from 'react';

interface InputBarProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  isListening: boolean;
  onMicrophoneClick: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  selectedImageUrl?: string | null;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);

const MicrophoneIcon = ({ isListening }: { isListening: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-300 ${isListening ? 'text-red-500' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);

const AttachmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export const InputBar = forwardRef<HTMLInputElement, InputBarProps>((
    { inputValue, onInputChange, onSendMessage, isLoading, isListening, onMicrophoneClick, onImageChange, onImageRemove, selectedImageUrl }, 
    ref
) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && !isListening) {
      onSendMessage();
    }
  };

  const hasContent = !!inputValue.trim() || !!selectedImageUrl;

  const placeholder = isListening
    ? 'Listening...'
    : isLoading
    ? 'Awaiting connection...'
    : 'Type a sacred message...';

  return (
    <div className="bg-zinc-900 border-t border-zinc-700">
      {selectedImageUrl && (
          <div className="p-2 px-4 relative w-fit">
              <div className="relative">
                  <img src={selectedImageUrl} alt="Preview" className="h-20 w-20 object-cover rounded-md" />
                  <button 
                      onClick={onImageRemove}
                      className="absolute -top-2 -right-2 bg-zinc-800 text-white rounded-full p-1 border-2 border-zinc-900 hover:bg-red-500 transition-colors"
                      aria-label="Remove image"
                  >
                     <CloseIcon />
                  </button>
              </div>
          </div>
      )}
      <div className="flex items-center gap-2 md:gap-4 p-4">
        <input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading || isListening}
          className="flex-grow bg-zinc-800 text-white placeholder-zinc-500 px-4 py-3 rounded-full border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent transition duration-300"
        />
        <input 
            type="file"
            ref={imageInputRef}
            onChange={onImageChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
        />
        <button
          onClick={() => imageInputRef.current?.click()}
          disabled={isLoading}
          className="bg-zinc-800 border border-zinc-700 text-white p-3 rounded-full hover:bg-zinc-700 disabled:bg-zinc-600 disabled:cursor-not-allowed transform hover:scale-110 transition duration-300"
          aria-label="Attach image"
        >
          <AttachmentIcon />
        </button>
         <button
          onClick={onMicrophoneClick}
          disabled={isLoading}
          className="bg-zinc-800 border border-zinc-700 text-white p-3 rounded-full hover:bg-zinc-700 disabled:bg-zinc-600 disabled:cursor-not-allowed transform hover:scale-110 transition duration-300"
          aria-label="Use microphone"
        >
          <MicrophoneIcon isListening={isListening} />
        </button>
        <button
          onClick={onSendMessage}
          disabled={isLoading || !hasContent}
          className="bg-[var(--accent-color)] text-black p-3 rounded-full hover:opacity-90 disabled:bg-zinc-600 disabled:text-zinc-400 disabled:cursor-not-allowed transform hover:scale-110 transition duration-300"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
});

InputBar.displayName = "InputBar";