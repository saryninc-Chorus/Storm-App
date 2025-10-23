import React, { useState, useEffect } from 'react';
import './Spark.css';

const Spark = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="spark"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default Spark;
