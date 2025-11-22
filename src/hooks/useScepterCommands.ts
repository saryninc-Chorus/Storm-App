import { useEffect } from 'react';
export const useScepterCommands = (cfg:{on1?:()=>void;on2?:()=>void;onSpace?:()=>void}={})=>{
  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{
      if(!(e.metaKey||e.ctrlKey)) return;
      if(e.key==='1'){ e.preventDefault(); cfg.on1?.(); }
      if(e.key==='2'){ e.preventDefault(); cfg.on2?.(); }
      if(e.key===' '){ e.preventDefault(); cfg.onSpace?.(); }
    };
    window.addEventListener('keydown',h);
    return ()=>window.removeEventListener('keydown',h);
  },[cfg.on1,cfg.on2,cfg.onSpace]);
};
