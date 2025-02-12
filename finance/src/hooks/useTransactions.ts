// src/hooks/useFirebase.ts
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

interface Transaction {
  id?: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export const useFirebase = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const transactionsRef = collection(db, 'transactions');
  const categoriesRef = collection(db, 'categories');

  const fetchTransactions = async () => {
    const snapshot = await getDocs(transactionsRef);
    const transactionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
    setTransactions(transactionsData);
  };

  const fetchCategories = async () => {
    const snapshot = await getDocs(categoriesRef);
    const categoriesData = snapshot.docs.map(doc => doc.data().name);
    setCategories(categoriesData);
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    await addDoc(transactionsRef, transaction);
    fetchTransactions();
  };

  const updateTransaction = async (id: string, transaction: Omit<Transaction, 'id'>) => {
    await updateDoc(doc(transactionsRef, id), transaction);
    fetchTransactions();
  };

  const deleteTransaction = async (id: string) => {
    await deleteDoc(doc(transactionsRef, id));
    fetchTransactions();
  };

  const addCategory = async (category: string) => {
    await addDoc(categoriesRef, { name: category });
    fetchCategories();
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  return { transactions, categories, addTransaction, updateTransaction, deleteTransaction, addCategory };
};