import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Transaction {
  id: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
}

interface TransactionListProps {
  limit?: number;
  darkMode?: boolean;
}

const transactions: Transaction[] = [
  { id: 1, description: 'Salary', date: '2024-02-01', type: 'income', amount: 50000, category: 'Job' },
  { id: 2, description: 'Grocery Shopping', date: '2024-02-03', type: 'expense', amount: 2000, category: 'Food' },
  { id: 3, description: 'Electricity Bill', date: '2024-02-05', type: 'expense', amount: 1500, category: 'Utilities' },
  { id: 4, description: 'Freelance Work', date: '2024-02-07', type: 'income', amount: 12000, category: 'Freelance' },
];

export default function TransactionList({ limit, darkMode = false }: TransactionListProps) {
  const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div>
      <div className="h-[300px] overflow-auto space-y-4">
        {displayedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}
          >
            <div>
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{transaction.description}</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.date}</p>
            </div>
            <div className={`text-right ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              <p className="font-medium">
                {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>{transaction.category}</p>
            </div>
          </div>
        ))}
      </div>
      {limit && (
        <div className="mt-4 text-center">
          <button className={`w-full border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-2 flex items-center justify-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            View All Transactions
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}