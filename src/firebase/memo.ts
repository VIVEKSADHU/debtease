'use client';
import {useMemo} from 'react';

/**
 * Custom hook to memoize Firebase queries and references.
 * This is crucial to prevent infinite re-renders when using Firestore hooks.
 * @param factory A function that returns a Firebase query or reference.
 * @param deps The dependency array for the useMemo hook.
 * @returns The memoized Firebase query or reference.
 */
export function useMemoFirebase<T>(factory: () => T, deps: React.DependencyList): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
