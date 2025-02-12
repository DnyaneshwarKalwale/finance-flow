import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from 'framer-motion';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Home, Car, Coffee, Lightbulb, Heart, Film, ArrowRight } from 'lucide-react';

// Zod schema for form validation
const financialSchema = z.object({
  monthlyIncome: z.number().min(1, "Monthly income is required"),
  savingsGoal: z.number().min(0, "Savings goal cannot be negative"),
  housing: z.number().min(0, "Cannot be negative"),
  transportation: z.number().min(0, "Cannot be negative"),
  food: z.number().min(0, "Cannot be negative"),
  utilities: z.number().min(0, "Cannot be negative"),
  healthcare: z.number().min(0, "Cannot be negative"),
  entertainment: z.number().min(0, "Cannot be negative"),
});

type ExpenseCategory = {
  name: keyof z.infer<typeof financialSchema>;
  label: string;
  icon: React.ComponentType;
  color: string;
};

const expenseCategories: ExpenseCategory[] = [
  { name: 'housing', label: 'Housing', icon: Home, color: 'bg-purple-100' },
  { name: 'transportation', label: 'Transportation', icon: Car, color: 'bg-blue-100' },
  { name: 'food', label: 'Food', icon: Coffee, color: 'bg-green-100' },
  { name: 'utilities', label: 'Utilities', icon: Lightbulb, color: 'bg-yellow-100' },
  { name: 'healthcare', label: 'Healthcare', icon: Heart, color: 'bg-pink-100' },
  { name: 'entertainment', label: 'Entertainment', icon: Film, color: 'bg-orange-100' },
];

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof financialSchema>>({
    resolver: zodResolver(financialSchema),
    defaultValues: {
      monthlyIncome: 0,
      savingsGoal: 0,
      housing: 0,
      transportation: 0,
      food: 0,
      utilities: 0,
      healthcare: 0,
      entertainment: 0,
    },
  });

  const handleSaveToFirestore = async (data: z.infer<typeof financialSchema>) => {
    try {
      setIsSubmitting(true);
      setFormError(null);

      // Calculate total expenses
      const totalExpenses = Object.keys(data).reduce((total, key) => {
        if (key !== 'monthlyIncome' && key !== 'savingsGoal') {
          return total + (data[key as keyof typeof data] || 0);
        }
        return total;
      }, 0);

      // Validate total expenses
      if (totalExpenses > data.monthlyIncome) {
        throw new Error("Total expenses cannot exceed monthly income.");
      }

      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      // Save to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        email: user.email,
        displayName: user.displayName,
      });

      // Navigate to dashboard (custom navigation)
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("Firestore save error:", error);
      setFormError(error instanceof Error ? error.message : "Failed to save data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header and Progress Bar */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 inline-block">
            Financial Profile Setup
          </h2>
          <p className="mt-4 text-lg text-gray-600">Let's build your financial future together</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-center gap-2">
            {[1, 2].map((num) => (
              <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {num}
              </div>
            ))}
          </div>
          {/* Custom Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: step === 1 ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-xl shadow-xl border-0 bg-white/90 backdrop-blur-sm p-8">
            <form onSubmit={handleSubmit(handleSaveToFirestore)} className="space-y-8">
              {formError && (
                <div className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-lg">
                  {formError}
                </div>
              )}

              {step === 1 ? (
                <div className="space-y-6">
                  {/* Income and Savings Fields */}
                  <div>
                    <label className="text-gray-700 font-medium">Monthly Income</label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full pl-8 text-lg py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-0"
                        {...register('monthlyIncome', { valueAsNumber: true })}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    </div>
                    {errors.monthlyIncome && (
                      <p className="text-red-500">{errors.monthlyIncome.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-gray-700 font-medium">Monthly Savings Goal</label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full pl-8 text-lg py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-0"
                        {...register('savingsGoal', { valueAsNumber: true })}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    </div>
                    {errors.savingsGoal && (
                      <p className="text-red-500">{errors.savingsGoal.message}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5 inline" />
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Expense Categories */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {expenseCategories.map(({ name, label, icon: Icon, color }) => (
                      <div key={name}>
                        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                          {/* <Icon className="h-6 w-6 text-gray-700" /> */}
                        </div>
                        <label className="block text-gray-700 font-medium mb-2">{label}</label>
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="0"
                            className="w-full pl-8 py-2 rounded-lg border-gray-200"
                            {...register(name, { valueAsNumber: true })}
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        </div>
                        {errors[name] && (
                          <p className="text-red-500">{errors[name]?.message}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 rounded-xl border-2 text-gray-600 hover:text-gray-700 hover:border-blue-300 text-lg font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Complete Setup'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Securely processed with bank-level encryption 🔒
        </div>
      </motion.div>
    </div>
  );
}