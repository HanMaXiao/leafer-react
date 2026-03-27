// playground/examples/Animation.tsx
import React, { useState, useEffect } from 'react';
import { Leafer, Rect, Text } from '@leafer-react';

export const Animation: React.FC<{ debug?: boolean }> = ({ debug }) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setRotation(r => (r + 2) % 360);
    }, 16); // ~60fps

    const scaleInterval = setInterval(() => {
      setScale(s => 1 + Math.sin(Date.now() / 500) * 0.2);
    }, 16);

    return () => {
      clearInterval(interval);
      clearInterval(scaleInterval);
    };
  }, [isPlaying]);

  if (debug) {
    console.log('[Animation] rendered, rotation:', rotation, 'scale:', scale);
  }

  return (
    <Leafer fill="#f5f5f5">
      {/* Title */}
      <Text
        x={50}
        y={30}
        text="Animation Demo"
        fontSize={20}
        fontWeight="bold"
        fill="#333"
      />

      {/* Rotating rectangle */}
      <Rect
        x={200}
        y={150}
        width={80}
        height={80}
        fill="#32cd79"
        cornerRadius={12}
        rotation={rotation}
      />

      {/* Counter-rotating rectangle */}
      <Rect
        x={450}
        y={190}
        width={80}
        height={80}
        fill="#667eea"
        cornerRadius={40}
        rotation={-rotation}
      />

      {/* Pulsing circle */}
      <Rect
        x={650}
        y={190}
        width={80}
        height={80}
        fill="#f5576c"
        cornerRadius={40}
        scaleX={scale}
        scaleY={scale}
      />

      {/* Controls info */}
      <Text
        x={200}
        y={320}
        text={`Rotation: ${rotation}°`}
        fontSize={14}
        fill="#666"
      />
      <Text
        x={450}
        y={320}
        text={`Counter-rotation: ${-rotation}°`}
        fontSize={14}
        fill="#666"
      />
      <Text
        x={650}
        y={320}
        text={`Scale: ${scale.toFixed(2)}`}
        fontSize={14}
        fill="#666"
      />

      {/* Status */}
      <Text
        x={50}
        y={380}
        text={`Status: ${isPlaying ? '▶ Playing' : '⏸ Paused'}`}
        fontSize={16}
        fill={isPlaying ? '#32cd79' : '#999'}
        fontWeight="bold"
        cursor="pointer"
        onClick={() => setIsPlaying(p => !p)}
      />

      {/* Instructions */}
      <Text
        x={50}
        y={420}
        text="• Click status text to toggle animation • State-driven 60fps animation"
        fontSize={14}
        fill="#666"
      />
    </Leafer>
  );
};

export const AnimationCode = `import React, { useState, useEffect } from 'react';
import { Leafer, Rect, Text } from '@leafer-react';

export const Animation = () => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setRotation(r => (r + 2) % 360);
    }, 16);

    const scaleInterval = setInterval(() => {
      setScale(s => 1 + Math.sin(Date.now() / 500) * 0.2);
    }, 16);

    return () => {
      clearInterval(interval);
      clearInterval(scaleInterval);
    };
  }, [isPlaying]);

  return (
    <Leafer fill="#f5f5f5">
      <Rect
        x={200}
        y={150}
        width={80}
        height={80}
        fill="#32cd79"
        rotation={rotation}
      />
      <Rect
        x={450}
        y={190}
        width={80}
        height={80}
        fill="#667eea"
        cornerRadius={40}
        rotation={-rotation}
      />
      <Rect
        x={650}
        y={190}
        width={80}
        height={80}
        fill="#f5576c"
        cornerRadius={40}
        scaleX={scale}
        scaleY={scale}
      />
    </Leafer>
  );
};`.trim();
