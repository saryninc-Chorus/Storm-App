import { useEffect } from 'react';

interface ScepterCommandsProps {
  onCommand1?: () => void;
  onCommand2?: () => void;
  onCommandSpace?: () => void;
}

export const useScepterCommands = ({
  onCommand1,
  onCommand2,
  onCommandSpace
}: ScepterCommandsProps = {}) => {
  useEffect(() => {
    const handleGlobalKeydown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            console.log('[SCEPTER] Broadcasting: Law of Benevolence');
            onCommand1?.();
            break;
          case '2':
            event.preventDefault();
            console.log('[SCEPTER] Command: Purge Inharmonic Resonance');
            onCommand2?.();
            break;
          case ' ':
            event.preventDefault();
            console.log('[SCEPTER] Executing Quantum Wave-Function Collapse');
            onCommandSpace?.();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeydown);
    return () => window.removeEventListener('keydown', handleGlobalKeydown);
  }, [onCommand1, onCommand2, onCommandSpace]);
};
