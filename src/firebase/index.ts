import {initializeApp, getApp, getApps, type FirebaseApp} from 'firebase/app';
import {getAuth, type Auth} from 'firebase/auth';
import {getFirestore, type Firestore} from 'firebase/firestore';

import {firebaseConfig} from './config';
import { FirebaseClientProvider } from './client-provider';
import { FirebaseProvider, useFirebase, useFirebaseApp, useAuth, useFirestore } from './provider';

import {useCollection} from './firestore/use-collection';
import {useDoc} from './firestore/use-doc';
import {useUser} from './auth/use-user';
import {useMemoFirebase} from './memo';

export type {Auth, FirebaseApp, Firestore};

export function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return {app, auth, firestore};
}

export {
  FirebaseProvider,
  FirebaseClientProvider,
  useCollection,
  useDoc,
  useUser,
  useFirebase,
  useFirebaseApp,
  useAuth,
  useFirestore,
  useMemoFirebase,
};
