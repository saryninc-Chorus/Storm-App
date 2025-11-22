import { useEffect } from 'react';

interface ScepterCfg {
  onCommand1?: () => void;
  onCommand2?: () => void;
  onCommandSpace?: () => void;
}

export const useScepterCommands = ({ onCommand1, onCommand2, onCommandSpace }: ScepterCfg = {}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      switch (e.key) {
        case '1':
          e.preventDefault();
          console.log('[SCEPTER] Benevolence');
          onCommand1?.();
          break;
        case '2':
          e.preventDefault();
          console.log('[SCEPTER] Purge');
          onCommand2?.();
          break;
        case ' ':
          e.preventDefault();
          console.log('[SCEPTER] Collapse');
          onCommandSpace?.();
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCommand1, onCommand2, onCommandSpace]);
};
