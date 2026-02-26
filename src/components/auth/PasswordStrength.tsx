'use client';

import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  {
    label: 'At least 8 characters',
    test: (pwd) => pwd.length >= 8,
  },
  {
    label: 'Contains uppercase letter',
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    label: 'Contains lowercase letter',
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    label: 'Contains number',
    test: (pwd) => /[0-9]/.test(pwd),
  },
  {
    label: 'Contains special character',
    test: (pwd) => /[^A-Za-z0-9]/.test(pwd),
  },
];

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0);
  const [metRequirements, setMetRequirements] = useState<boolean[]>([]);

  useEffect(() => {
    const results = requirements.map((req) => req.test(password));
    setMetRequirements(results);
    setStrength(results.filter(Boolean).length);
  }, [password]);

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-gray-200';
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength === 0) return 'No password';
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      {/* Strength bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Password strength:</span>
          <span className={getStrengthColor().replace('bg-', 'text-')}>
            {getStrengthText()}
          </span>
        </div>
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getStrengthColor()} transition-all duration-300`}
            style={{ width: `${(strength / requirements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Requirements list */}
      <div className="space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center text-xs">
            {metRequirements[index] ? (
              <Check className="h-3 w-3 text-green-500 mr-2" />
            ) : (
              <X className="h-3 w-3 text-red-500 mr-2" />
            )}
            <span className={metRequirements[index] ? 'text-green-600' : 'text-gray-500'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
