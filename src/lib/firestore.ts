
'use client';
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import type { Customer, Debt } from './types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Customer Functions
export const getCustomersCollection = (db: Firestore, userId: string) => {
  return collection(db, 'users', userId, 'customers');
};

export const addCustomer = (db: Firestore, userId: string, customerData: Omit<Customer, 'id' | 'userId'>) => {
  const customersCollection = getCustomersCollection(db, userId);
  const data = { ...customerData, userId };
  addDoc(customersCollection, data).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: customersCollection.path,
      operation: 'create',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
};


// Debt Functions
export const getDebtsCollection = (db: Firestore, userId: string) => {
  return collection(db, 'users', userId, 'debts');
};

export const addDebt = (db: Firestore, userId: string, debtData: Omit<Debt, 'id' | 'userId' | 'status'> & {dueDate: Date}) => {
  const debtsCollection = getDebtsCollection(db, userId);
  const data = {
    ...debtData,
    userId,
    status: 'Unpaid',
    dueDate: debtData.dueDate.toISOString(),
  };
  addDoc(debtsCollection, data).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: debtsCollection.path,
      operation: 'create',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
};

export const updateDebtStatus = (db: Firestore, userId: string, debtId: string, status: 'Paid' | 'Unpaid') => {
  const debtRef = doc(db, 'users', userId, 'debts', debtId);
  const data = { status };
  updateDoc(debtRef, data).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: debtRef.path,
      operation: 'update',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
};

export const deleteDebt = (db: Firestore, userId: string, debtId: string) => {
  const debtRef = doc(db, 'users', userId, 'debts', debtId);
  deleteDoc(debtRef).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: debtRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
  });
};
