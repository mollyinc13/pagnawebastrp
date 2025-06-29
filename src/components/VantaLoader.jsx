// src/components/VantaLoader.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import BIRDS from 'vanta/dist/vanta.birds.min';

export default function VantaLoader() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Asegurarse de que el elemento exista antes de inicializar Vanta
      if (vantaRef.current) {
        vantaEffect.current = BIRDS({
          el: vantaRef.current,
          THREE, // Aquí podríamos tener el problema de compatibilidad de versiones
          backgroundColor: 0x000000,
          color1: 0x00ff99,
          color2: 0x00cc7a,
          quantity: 3.0,
          speedLimit: 2.0,
          cohesion: 5.0,
          backgroundAlpha: 1.0
        });
      }
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []); // El array de dependencias vacío asegura que esto se ejecute solo al montar/desmontar

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Para que esté detrás de otros contenidos
      }}
    />
  );
}
