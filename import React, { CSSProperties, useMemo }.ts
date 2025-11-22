import React, { CSSProperties, useMemo } from 'react';

export interface SacredInnerCircleProps {
  items?: React.ReactNode[];
  center?: React.ReactNode;
  radius?: number;          // Outer circle radius (px)
  itemSize?: number;        // Diameter of each item (px)
  className?: string;
  style?: CSSProperties;
}

export const SacredInnerCircle: React.FC<SacredInnerCircleProps> = ({
  items = [],
  center,
  radius = 120,
  itemSize = 48,
  className = '',
  style
}) => {
  const positions = useMemo(() => {
    const count = items.length;
    if (count === 0) return [];
    const step = (2 * Math.PI) / count;
    return items.map((_, i) => {
      const angle = i * step - Math.PI / 2; // start at top
      const x = radius + Math.cos(angle) * radius - itemSize / 2;
      const y = radius + Math.sin(angle) * radius - itemSize / 2;
      return { x, y };
    });
  }, [items, radius, itemSize]);

  const wrapperSize = radius * 2 + itemSize;

  return (
    <div
      className={`sacred-inner-circle ${className}`.trim()}
      style={{
        position: 'relative',
        width: wrapperSize,
        height: wrapperSize,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {center && (
        <div
          className="sic-center"
          style={{
            position: 'absolute',
            zIndex: 2
          }}
        >
          {center}
        </div>
      )}
      {items.map((node, i) => {
        const p = positions[i];
        return (
          <div
            key={i}
            className="sic-item"
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: itemSize,
              height: itemSize,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              overflow: 'hidden'
            }}
          >
            {node}
          </div>
        );
      })}
    </div>
  );
};