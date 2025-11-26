import React, { useState, useEffect, useRef } from 'react';
import { generateImage } from '../services/geminiService';

interface GeneratedImageProps {
  prompt: string;
  alt: string;
  className?: string;
  fallbackUrl: string;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ prompt, alt, className, fallbackUrl }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      // Prevent double fetching in React Strict Mode or fast re-renders
      if (fetchedRef.current) return;
      fetchedRef.current = true;

      try {
        const generated = await generateImage(prompt);
        if (isMounted) {
          setImageUrl(generated);
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [prompt]);

  if (loading) {
    return (
      <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Gerando imagem IA...</span>
      </div>
    );
  }

  return (
    <img 
      src={imageUrl || fallbackUrl} 
      alt={alt} 
      className={`object-cover ${className}`}
    />
  );
};
