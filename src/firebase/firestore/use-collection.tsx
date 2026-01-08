'use client';
import {useState, useEffect} from 'react';
import {
  onSnapshot,
  query,
  collection,
  type DocumentData,
  type Query,
  type CollectionReference,
} from 'firebase/firestore';

import {errorEmitter} from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

export function useCollection<T>(q: Query | CollectionReference | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!q) {
      setData([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
          } as T;
        });

        setData(docs);
        setLoading(false);
      },
      async (err) => {
        const permissionError = new FirestorePermissionError({
          path: 'path' in q ? q.path : 'unknown',
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);

        setError(permissionError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [q]);

  return {data, loading, error};
}
