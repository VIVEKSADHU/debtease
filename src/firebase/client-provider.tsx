'use client';

import {useState, useEffect} from 'react';
import type {Auth} from 'firebase/auth';
import type {FirebaseApp} from 'firebase/app';
import type {Firestore} from 'firebase/firestore';

import {initializeFirebase} from '@/firebase';
import {FirebaseProvider} from '@/firebase/provider';
import {FirebaseErrorListener} from '@/components/FirebaseErrorListener';

type Props = {
  children: React.ReactNode;
};

export function FirebaseClientProvider({children}: Props) {
  const [firebase, setFirebase] = useState<{
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
  } | null>(null);

  useEffect(() => {
    const {app, auth, firestore} = initializeFirebase();
    setFirebase({app, auth, firestore});
  }, []);

  if (!firebase) {
    return null;
  }

  return (
    <FirebaseProvider
      app={firebase.app}
      auth={firebase.auth}
      firestore={firebase.firestore}
    >
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
}
