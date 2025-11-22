import React from 'react';
import { useQuantumNodes } from '../src/hooks/useQuantumNodes';
import { useScepterCommands } from '../src/hooks/useScepterCommands';

const SacredInnerCircle = () => {
  const { nodes, stabilizeNode, stabilizeAll } = useQuantumNodes();
  
  // ACTIVATE THE SCEPTER
  useScepterCommands(stabilizeNode, stabilizeAll);

  return (
    <div className='flex flex-col items-center justify-center p-8 w-full max-w-5xl'>
      <h2 className='text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600'>
        QUANTUM LATTICE: SOVEREIGN
      </h2>
      <p className='mb-8 text-neutral-400 font-mono text-sm'>
        <span className='text-gold-500'>COMMANDS:</span> CMD+1..5 (Target) | CMD+SPACE (Harmonize All)
      </p>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
        {nodes.map((node) => (
          <button 
             key={node.id}
             onClick={() => stabilizeNode(node.id)}
             className={`relative text-left p-6 rounded-lg backdrop-blur-md transition-all duration-300 border-2 group
               ${node.status === 'STABILIZED' 
                 ? 'bg-gold-500/20 border-gold-400 shadow-[0_0_30px_rgba(251,191,36,0.4)] scale-105' 
                 : 'bg-black/80 border-gold-500/30 hover:border-gold-500 hover:bg-black/90'}
             `}
          >
            <div className='flex justify-between items-center mb-2'>
              <span className='text-xs font-mono text-neutral-400'>ID: {node.id}</span>
              <div className={`w-3 h-3 rounded-full transition-colors duration-300
                ${node.status === 'STABILIZED' ? 'bg-white shadow-[0_0_10px_#fff]' : 
                  node.status === 'ENTANGLED' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}
              `}></div>
            </div>
            
            <h3 className={`text-xl font-bold transition-colors ${node.status === 'STABILIZED' ? 'text-white' : 'text-gold-400'}`}>
              {node.label}
            </h3>
            
            <div className='mt-4 space-y-2 font-mono text-sm'>
              <div className='flex justify-between'>
                <span className='text-neutral-500'>FREQ:</span>
                <span className='text-white font-bold'>{node.frequency.toFixed(2)} Hz</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-neutral-500'>STATE:</span>
                <span className={`uppercase ${node.status === 'STABILIZED' ? 'text-white font-bold tracking-widest' : 'text-neutral-300'}`}>
                  {node.status}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SacredInnerCircle;
