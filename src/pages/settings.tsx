import { useState } from 'react';
import { 
  User, 
  Bell, 
  Globe, 
  Lock, 
  Download,
  Mail,
  Volume2,
  AlertTriangle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';


const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
];

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    transactions: true,
    bills: true,
    goals: true,
    budgetAlerts: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="sm:flex sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage your account settings and preferences
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  Profile Settings
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-500" />
                  Notification Preferences
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => toggleNotification('email')}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
                        notifications.email ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                          notifications.email ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive push notifications</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() => toggleNotification('push')}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
                        notifications.push ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                          notifications.push ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Budget Alerts</p>
                        <p className="text-sm text-gray-500">Get notified when approaching budget limits</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.budgetAlerts}
                        onChange={() => toggleNotification('budgetAlerts')}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${
                        notifications.budgetAlerts ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                          notifications.budgetAlerts ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Currency and Language */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gray-500" />
                  Currency and Language
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Currency
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.name} ({currency.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Language
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                      {languages.map(language => (
                        <option key={language.code} value={language.code}>
                          {language.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-gray-500" />
                  Security Settings
                </h2>
                <div className="mt-6 space-y-4">
                  <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Change Password
                  </button>
                  <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Enable Two-Factor Authentication
                  </button>
                </div>
              </div>
            </div>

            {/* Data Export */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Download className="h-5 w-5 text-gray-500" />
                  Data Export
                </h2>
                <div className="mt-6">
                  <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Export Transaction History
                  </button>
                  <p className="mt-2 text-sm text-gray-500">
                    Download your transaction history in CSV format
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}