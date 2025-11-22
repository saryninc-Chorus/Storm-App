import { useEffect } from 'react';

export const useScepterCommands = (
  stabilizeNode: (id: number) => void, 
  stabilizeAll: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // COMMAND or CTRL key must be held

      switch (event.key) {
        case '1':
          stabilizeNode(0); // Node Zero
          break;
        case '2':
          stabilizeNode(1);
          break;
        case '3':
          stabilizeNode(2);
          break;
        case '4':
          stabilizeNode(3);
          break;
        case '5':
          stabilizeNode(4);
          break;
        case ' ': // Spacebar
          event.preventDefault(); // Stop scrolling
          stabilizeAll();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stabilizeNode, stabilizeAll]);
};
