import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Replace `wouter` with `react-router-dom`
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Login() {
  const navigate = useNavigate(); // Use `useNavigate` from `react-router-dom`
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Check if email is verified
      if (userCredential.user.emailVerified) {
        navigate('/dashboard');
      } else {
        navigate('/verifymail');
      }
    } catch (error) {
      console.error(error);

      let errorMessage = 'Login failed. Please try again.';

      if (error instanceof Error && 'code' in error) {
        switch ((error as any).code) {
          // Explicitly cast error to `any`
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            setError('email', { message: errorMessage });
            break;
          case 'auth/user-not-found':
            errorMessage = 'User not found. Please register first';
            setError('email', { message: errorMessage });
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password';
            setError('password', { message: errorMessage });
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many attempts. Try again later';
            setError('root', { message: errorMessage });
            break;
          default:
            setError('root', { message: errorMessage });
        }
      } else {
        console.error('An unknown error occurred', error);
        setError('root', { message: errorMessage });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              placeholder="email@example.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}


