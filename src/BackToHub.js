import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackToHub({ label = 'Back to Hub', className = '' }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/meta-isi')}
      className={className}
      title="Back to Hub (Alt+H)"
      style={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#e5e7eb',
        borderRadius: 8,
        padding: '6px 10px',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
