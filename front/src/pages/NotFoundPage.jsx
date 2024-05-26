import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  useEffect(() => {
    // Al montar el componente, desactivar el scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <section className="text-center z-0 max-w-lg mx-auto my-8 p-4">
        <h1 className="text-2xl font-bold mb-4">Página No Encontrada</h1>
        <Link to="/" className="text-blue-500 hover:underline">Volver al Inicio</Link>
      </section>
    </main>
  );
};
