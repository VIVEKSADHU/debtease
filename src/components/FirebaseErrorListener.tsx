'use client';
import {useEffect} from 'react';
import {errorEmitter} from '@/firebase/error-emitter';

export function FirebaseErrorListener() {
  useEffect(() => {
    const handlePermissionError = (error: Error) => {
      // In a real app, you might want to log this to a service
      // like Sentry or display a user-friendly message.
      // For this starter, we'll just throw it to show the Next.js overlay.
      throw error;
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, []);

  return null;
}
