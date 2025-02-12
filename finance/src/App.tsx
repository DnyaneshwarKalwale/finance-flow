// import { Switch, Route } from 'wouter';
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./lib/queryClient";
// import { Toaster } from "./components/ui/toaster";
// import NotFound from "./pages/not-found";
import { Switch  } from 'wouter';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import OnboardingForm from "./pages/OnboardingForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import SavingsGoals from './pages/Savings';
import Budgets from './pages/Budget';
import Settings from './pages/settings';
import Reports from './pages/Reports';
import VerifyEmail from './pages/VerifyEmail';
import NotFound from './pages/not-found'; // Import the NotFound component

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/onboarding" element={<OnboardingForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/savings" element={<SavingsGoals />} />
      <Route path="/budget" element={<Budgets />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<NotFound />} /> {/* Render NotFound for unmatched routes */}
    </Routes>
  );
}

function App() {
  return (
    <Router />
    // <Toaster />
  );
}

export default App;