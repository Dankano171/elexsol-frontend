'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PasswordStrength } from './PasswordStrength';
import { industries } from '@/lib/constants/industries';

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  businessName: z.string().min(1, 'Business name is required'),
  businessTin: z
    .string()
    .length(10, 'TIN must be exactly 10 digits')
    .regex(/^\d+$/, 'TIN must contain only numbers'),
  industry: z.string().min(1, 'Please select an industry'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [step, setStep] = useState(1);
  const { signup, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    trigger,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const password = watch('password', '');

  const nextStep = async () => {
    let fieldsToValidate: (keyof SignupFormData)[] = [];
    
    if (step === 1) {
      fieldsToValidate = ['email', 'password', 'confirmPassword'];
    } else if (step === 2) {
      fieldsToValidate = ['firstName', 'lastName', 'phone'];
    } else if (step === 3) {
      fieldsToValidate = ['businessName', 'businessTin', 'industry'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
    } catch (error: any) {
      setError('root', {
        message: error.message || 'Signup failed',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errors.root && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}

      {/* Step 1: Account Information */}
      {step === 1 && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Account Information</h4>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? 'border-red-500' : ''}
            />
            <PasswordStrength password={password} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Personal Information */}
      {step === 2 && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Personal Information</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+234 801 234 5678"
              {...register('phone')}
            />
          </div>
        </div>
      )}

      {/* Step 3: Business Information */}
      {step === 3 && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Business Information</h4>
          
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              {...register('businessName')}
              className={errors.businessName ? 'border-red-500' : ''}
            />
            {errors.businessName && (
              <p className="text-sm text-red-500">{errors.businessName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessTin">Tax Identification Number (TIN)</Label>
            <Input
              id="businessTin"
              placeholder="1234567890"
              maxLength={10}
              {...register('businessTin')}
              className={errors.businessTin ? 'border-red-500' : ''}
            />
            {errors.businessTin && (
              <p className="text-sm text-red-500">{errors.businessTin.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <select
              id="industry"
              {...register('industry')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-sm text-red-500">{errors.industry.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        {step > 1 && (
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
        )}
        
        {step < 3 ? (
          <Button type="button" onClick={nextStep} className="ml-auto">
            Next
          </Button>
        ) : (
          <Button type="submit" className="ml-auto" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        )}
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center space-x-2 pt-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === step
                ? 'bg-primary'
                : i < step
                ? 'bg-success'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </form>
  );
}
