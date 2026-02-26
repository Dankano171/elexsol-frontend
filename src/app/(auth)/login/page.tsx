'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Welcome back</h3>
        <p className="text-sm text-gray-600 mt-1">
          Sign in to your Elexsol account
        </p>
      </div>

      <LoginForm />

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
        <p className="mt-2">
          <Link href="/forgot-password" className="text-primary hover:underline text-sm">
            Forgot your password?
          </Link>
        </p>
      </div>
    </>
  );
}
