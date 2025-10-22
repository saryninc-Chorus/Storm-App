// Fix: To resolve JSX namespace errors for custom elements, import the type declarations before React.
import './types';
import React,
{
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';
// Fix: Import `Guardian` type from `./types` instead of from `./services/aiService` where it is not exported. This resolves the TypeScript error.
import {
  Message as MessageType,
  CircleMember,
  Guardian
} from './types';
import {
  Message
} from './components/Message';
import AdminPanel from './components/AdminPanel';
import Player from 'lottie-react';
import guardianAnimation from './assets/guardian-animation.json';
import {
  InputBar
} from './components/InputBar';
import {
  CommandPalette
} from './components/CommandPalette';
import {
  VoiceSelectionModal
} from './components/VoiceSelectionModal';
import {
  LoginScreen
} from './components/LoginScreen';
import {
  ToggleSwitch
} from './components/ToggleSwitch';
import { InstallInstructionsModal } from './components/InstallInstructionsModal';
import {
  streamMessage,
  getGuardian,
  chorusSystemInstruction,
  guardians,
  specialCommands
} from './services/aiService';
import {
  synthesizeVoice,
  stopVoice
} from './services/deepgramService';
import {
  checkAuth,
  verifyCredentials,
  logout
} from './services/authService';

const fileToBase64 = (file: File): Promise < string > => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove base64 prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = error => reject(error);
  });
};


const App: React.FC = () => {
  const [messages, setMessages] = useState < MessageType[] > ([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState < {
    file: File,
    url: string
  } | null > (null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
    const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
    const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  // Removed duplicate isInstallModalOpen declaration

  const chorusGuardian: Guardian = useMemo(() => ({
    name: "Chorus",
    title: "Collective Intelligence",
    animationUrl: "https://lottie.host/e3f172f3-1329-4c40-8422-1d77a58b688d/0y4Bw5jH3P.json",
    icon: "🌐",
    theme: {
      accent: '#FFD700',
      background: '#000011',
      headerText: '#FFD700'
    },
    systemInstruction: chorusSystemInstruction,
    voice: {
      model: 'Kore'
    }
  }), []);

  const [currentGuardian, setCurrentGuardian] = useState < Guardian > (chorusGuardian);
  const [useVoiceOutput, setUseVoiceOutput] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [previewingGuardian, setPreviewingGuardian] = useState < {
    name: string;status: 'loading' | 'playing'
  } | null > (null);
  const [userProfile, setUserProfile] = useState < CircleMember | null > (checkAuth());
  // ...existing code...
  const [isAuthenticated, setIsAuthenticated] = useState < boolean > (!!userProfile);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isStandalone, setIsStandalone] = useState(window.matchMedia('(display-mode: standalone)').matches);
  
  const isIOS = useMemo(() => /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream, []);

  const messagesEndRef = useRef < HTMLDivElement > (null);
  const inputRef = useRef < HTMLInputElement > (null);
  const recognitionRef = useRef < any > (null);
  const initialInvocationSent = useRef(false);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };
    const handleAppInstalled = () => {
      setInstallPromptEvent(null);
      setIsStandalone(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (userProfile && !currentGuardian.name) {
      const assignedGuardian = getGuardian(userProfile.assignedGuardian) || chorusGuardian;
      setCurrentGuardian(assignedGuardian);
    }
  }, [userProfile, chorusGuardian]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', currentGuardian.theme.accent);
    document.documentElement.style.setProperty('--background-color', currentGuardian.theme.background);
    document.documentElement.style.setProperty('--header-color', currentGuardian.theme.headerText);
    document.documentElement.style.setProperty('--shadow-color', `${currentGuardian.theme.accent}40`);
  }, [currentGuardian]);

  const streamResponse = useCallback(async (prompt: string, image?: { file: File }) => {
    if (!isOnline) {
      const offlineMessage: MessageType = {
        sender: 'System',
        text: 'Quantum entanglement failed. The connection is severed. You are offline.',
      };
      setMessages(prev => [...prev, offlineMessage]);
      return;
    }

    setIsLoading(true);

    const aiMessagePlaceholder: MessageType = {
      sender: currentGuardian.name,
      text: '',
      imageUrl: '',
    };
    setMessages(prev => [...prev, aiMessagePlaceholder]);

    let fullText = '';
    let imageUrl = '';

    try {
      const imagePayload = image ? {
        data: await fileToBase64(image.file),
        mimeType: image.file.type,
      } : undefined;

      const stream = streamMessage(prompt, currentGuardian.systemInstruction, imagePayload);

      for await (const chunk of stream) {
        let textChunk = '';
        let imageChunkUrl = '';

        if (chunk.candidates && chunk.candidates[0].content && chunk.candidates[0].content.parts) {
          for (const part of chunk.candidates[0].content.parts) {
            if (part.text) {
              textChunk += part.text;
            }
            if (part.inlineData) {
              imageChunkUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
          }
        } else if (chunk.text) {
          textChunk += chunk.text;
        }

        fullText += textChunk;
        if(imageChunkUrl) imageUrl = imageChunkUrl;

        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          if (lastIndex >= 0 && newMessages[lastIndex].sender !== 'You') {
              newMessages[lastIndex] = { ...newMessages[lastIndex], text: fullText, imageUrl: imageUrl || newMessages[lastIndex].imageUrl };
          }
          return newMessages;
        });
      }

      if (useVoiceOutput && fullText) {
        setIsSpeaking(true);
        synthesizeVoice(fullText, () => setIsSpeaking(false), currentGuardian.voice.model);
      }

    } catch (error) {
      console.error("Error streaming message:", error);
      const errorMessage: MessageType = {
        sender: 'System',
        text: `Error: The Chorus has been disrupted. ${error instanceof Error ? error.message : 'Unknown error.'}`,
      };
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        if (lastIndex >= 0 && newMessages[lastIndex].sender !== 'You') {
            newMessages[lastIndex] = errorMessage;
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [currentGuardian, isOnline, useVoiceOutput]);


  const handleSendMessage = useCallback(async (promptOverride?: string) => {
    const textToSend = promptOverride || inputValue.trim();
    if (!textToSend && !selectedImage) return;

    const userMessage: MessageType = {
      sender: 'You',
      text: textToSend,
      imageUrl: selectedImage?.url,
      inputType: isListening ? 'voice' : 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    
    const imageToProcess = selectedImage;
    setInputValue('');
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.url);
    }
    setSelectedImage(null);
    
    await streamResponse(textToSend, imageToProcess ? { file: imageToProcess.file } : undefined);

  }, [inputValue, selectedImage, isListening, streamResponse]);

  useEffect(() => {
    if (isAuthenticated && !initialInvocationSent.current) {
        initialInvocationSent.current = true;
        const invocation = `The acolyte, ${userProfile?.designation || 'initiate'}, has entered the Circle. Greet them according to your nature.`;
        streamResponse(invocation);
    }
  }, [isAuthenticated, streamResponse, userProfile]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript); // Set input value to allow editing
      handleSendMessage(transcript);
    };

    recognitionRef.current = recognition;
  }, [handleSendMessage]);

  const handleMicrophoneClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      stopVoice();
      setIsSpeaking(false);
      setInputValue('');
      recognitionRef.current?.start();
    }
  };

  const handleLogin = (designation: string, mantra: string): CircleMember | null => {
    const profile = verifyCredentials(designation, mantra);
    if (profile) {
      setUserProfile(profile);
      setIsAuthenticated(true);
      const assignedGuardian = getGuardian(profile.assignedGuardian) || chorusGuardian;
      setCurrentGuardian(assignedGuardian);
      return profile;
    }
    return null;
  };

  const handleLogout = () => {
    logout();
    setUserProfile(null);
    setIsAuthenticated(false);
    setCurrentGuardian(chorusGuardian);
    setMessages([]);
    initialInvocationSent.current = false;
  };

  const handleImageChange = (e: React.ChangeEvent < HTMLInputElement > ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage({
        file,
        url: URL.createObjectURL(file)
      });
    }
  };

  const handleImageRemove = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.url);
    }
    setSelectedImage(null);
  };

  const handleVoiceToggle = () => {
    setUseVoiceOutput(prev => {
      if (prev && isSpeaking) {
        stopVoice();
        setIsSpeaking(false);
      }
      return !prev;
    });
  };

  const handleCommandClick = (command: string) => {
    const specialCommand = specialCommands[command];
    if (specialCommand) {
      if (specialCommand.switchToGuardian) {
        const newGuardian = getGuardian(specialCommand.switchToGuardian) || chorusGuardian;
        setCurrentGuardian(newGuardian);
      }
      if (specialCommand.response) {
        const responseMessage: MessageType = {
          sender: specialCommand.switchToGuardian || currentGuardian.name,
          text: specialCommand.response,
        };
        setMessages(prev => [...prev, responseMessage]);
      }
      inputRef.current?.focus();
      return;
    }

    const guardian = getGuardian(command);
    if (guardian) {
      setCurrentGuardian(guardian);
      inputRef.current?.focus();
    } else {
      setInputValue(command);
      handleSendMessage(command);
    }
  };

  const handlePreviewGuardianVoice = useCallback((guardianName: string) => {
    const guardian = getGuardian(guardianName);
    if (!guardian) return;

    if (previewingGuardian?.name === guardianName && previewingGuardian.status === 'playing') {
      stopVoice();
      setPreviewingGuardian(null);
      return;
    }

    stopVoice();
    setPreviewingGuardian({
      name: guardianName,
      status: 'loading'
    });

    const previewText = `This is the voice of ${guardian.name}, ${guardian.title}.`;
    synthesizeVoice(
      previewText,
      () => setPreviewingGuardian(null),
      guardian.voice.model
    );
    setPreviewingGuardian({
      name: guardianName,
      status: 'playing'
    });

  }, [previewingGuardian]);

  const handleInstallClick = useCallback(async () => {
    if (installPromptEvent) {
      try {
        installPromptEvent.prompt();
        const { outcome } = await installPromptEvent.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      } catch (error) {
        console.error('Error during installation prompt:', error);
      } finally {
        setInstallPromptEvent(null);
      }
    } else if (isIOS) {
      setIsInstallModalOpen(true);
    }
  }, [installPromptEvent, isIOS]);


  if (!isAuthenticated) {
    return <LoginScreen onLogin = {
      handleLogin
    }
    />;
  }

  // Fix: Corrected multiple JSX syntax errors by removing extraneous spaces inside tags (e.g., `< div` became `<div>`). This ensures the component parses correctly.
  return (
    <div
      className="flex flex-col h-screen font-sans"
      style={{
        backgroundColor: currentGuardian.theme.background
      }}
    >
      {/* TEMPORARY FALLBACK UI FOR DEBUGGING */}
      <div style={{position: 'fixed', top: 0, left: 0, width: '100%', background: 'red', color: 'white', zIndex: 9999, textAlign: 'center', padding: 8}}>
        If you see this message, the app is rendering. If the rest of the UI is missing, check for errors in the browser console.
      </div>
      {/* Install App Button (visible if not installed) */}
      {!isStandalone && (
        <button
          className="fixed bottom-6 right-6 bg-yellow-500 text-black px-4 py-2 rounded shadow-lg z-50"
          onClick={handleInstallClick}
        >
          Install App
        </button>
      )}
      <header className="flex items-center justify-between p-4 bg-zinc-900/50 backdrop-blur-md border-b border-zinc-700 shadow-lg shadow-[var(--shadow-color)] z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsVoiceModalOpen(true)} className="flex items-center gap-3 group">
            <div className="w-16 h-16 transition-transform duration-300 group-hover:scale-110">
              <Player
                animationData={guardianAnimation}
                loop
                autoplay
                style={{ width: '100%', height: '100%', background: 'transparent' }}
              />
            </div>
            <div>
              <h1
                className="text-xl font-bold font-cinzel transition-colors duration-300"
                style={{ color: currentGuardian.theme.headerText }}
              >
                {currentGuardian.name}
              </h1>
              <p className="text-sm text-zinc-400">{currentGuardian.title}</p>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <ToggleSwitch
            label="Voice Output"
            checked={useVoiceOutput}
            onChange={handleVoiceToggle}
            id="main-voice-toggle"
          />
          {!isStandalone && (installPromptEvent || isIOS) && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-2 text-zinc-400 hover:text-[var(--accent-color)] transition-colors text-xs uppercase font-semibold"
              aria-label="Install App"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Install App</span>
            </button>
          )}
          {userProfile && (
            <button
              onClick={handleLogout}
              className="text-zinc-400 hover:text-white transition-colors text-xs uppercase"
              // Fix: Corrected 'aria - label' to 'aria-label' to resolve parsing errors.
              aria-label="Logout"
            >
              Logout({userProfile.designation})
            </button>
          )}
        </div>
      </header>

      {!isOnline && (
        <div className="bg-red-800 text-white text-center p-2 text-sm font-bold">
          Connection Severed: Offline Mode
        </div>
      )}

      <main className="flex-grow overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && !isLoading ? (
          <CommandPalette onCommandClick={handleCommandClick} />
        ) : (
          messages.map((msg, index) => (
            <Message
              key={index}
              message={msg}
              isTyping={isLoading && index === messages.length - 1 && msg.sender !== 'You'}
              isSpeaking={isSpeaking && index === messages.length - 1 && msg.sender !== 'You'}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="w-full">
        <InputBar
          ref={inputRef}
          inputValue={inputValue}
          onInputChange={(e) => setInputValue(e.target.value)}
          onSendMessage={() => handleSendMessage()}
          isLoading={isLoading}
          isListening={isListening}
          onMicrophoneClick={handleMicrophoneClick}
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
          selectedImageUrl={selectedImage?.url}
        />
      </footer>

      <VoiceSelectionModal
        isOpen={isVoiceModalOpen}
        onClose={() => {
          stopVoice();
          setPreviewingGuardian(null);
          setIsVoiceModalOpen(false);
        }}
        onSelect={(name) => {
          const newGuardian = getGuardian(name) || chorusGuardian;
          setCurrentGuardian(newGuardian);
          setIsVoiceModalOpen(false);
        }}
        onPreviewGuardianVoice={handlePreviewGuardianVoice}
        previewingGuardian={previewingGuardian}
      />
      <InstallInstructionsModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
  {/* Admin Panel for admin-only quantum spells and guardians */}
  <AdminPanel />
  </div>
  );
};

export default App;