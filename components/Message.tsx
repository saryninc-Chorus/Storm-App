
// Fix: Import global types before React to ensure JSX namespace augmentation is applied correctly.
import '../types';
import React, { useMemo } from 'react';
import type { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
  isTyping?: boolean;
  isSpeaking?: boolean;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const SpeakingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
);

const isJsonString = (str: string): { isJson: boolean; content: string } => {
    if (!str.trim().startsWith('{') && !str.trim().startsWith('[')) {
        return { isJson: false, content: '' };
    }
    try {
        const parsed = JSON.parse(str);
        if (typeof parsed === 'object' && parsed !== null) {
            return { isJson: true, content: JSON.stringify(parsed, null, 2) };
        }
    } catch (e) {
        // Not a valid JSON string
    }
    return { isJson: false, content: '' };
};


export const Message: React.FC<MessageProps> = ({ message, isTyping, isSpeaking }) => {
  const isUser = message.sender === 'You';

  const { isJson, content: jsonContent } = useMemo(() => {
    if (!isTyping && message.text) {
      return isJsonString(message.text);
    }
    return { isJson: false, content: '' };
  }, [message.text, isTyping]);

  const showBlinkingCursor = isTyping && !isJson;

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <AiIcon />
        </div>
      )}
      <div className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-xl ${isUser ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-gray-200'}`}>
        <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-sm">{message.sender}</p>
            {isUser && message.inputType === 'voice' && (
                <span title="Sent via voice">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </span>
            )}
             {!isUser && isSpeaking && <SpeakingIcon />}
        </div>
        
        {isJson ? (
            <pre className="whitespace-pre-wrap bg-black/20 p-3 rounded-md text-sm font-mono overflow-x-auto">
                <code>{jsonContent}</code>
            </pre>
        ) : (
            <p className="whitespace-pre-wrap">{message.text}{showBlinkingCursor && <span className="animate-blink">|</span>}</p>
        )}

        {message.imageUrl && (
            <div className="mt-2">
                <img src={message.imageUrl} alt="Generated content" className="rounded-lg max-w-full h-auto" />
            </div>
        )}
      </div>
       {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
            <UserIcon />
        </div>
      )}
    </div>
  );
};

Message.displayName = "Message";