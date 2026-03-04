import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTES } from '@/lib/constants/routes';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { toast } from 'sonner';

const DEMO_EMAIL = 'demo@elexsol.ng';
const DEMO_PASSWORD = 'demo123';

const DEMO_USER = {
  id: 'demo-001',
  email: DEMO_EMAIL,
  firstName: 'Adebayo',
  lastName: 'Ogunlesi',
  businessName: 'Elexsol Technologies Ltd',
  businessId: 'biz-demo-001',
  role: 'admin' as const,
  mfaEnabled: false,
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState('');
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaCode, setMfaCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Demo account — bypass API entirely
      if (email.trim().toLowerCase() === DEMO_EMAIL) {
        if (password !== DEMO_PASSWORD) {
          toast.error('Invalid demo password. Use: demo1234');
          setLoading(false);
          return;
        }
        setAuth(DEMO_USER, 'demo-token');
        toast.success('Welcome to the demo!');
        navigate(ROUTES.DASHBOARD);
        return;
      }

      // Real accounts — call backend API
      const data: any = await authApi.login({ email, password, mfaCode: mfaCode || undefined });
      if (data?.mfaRequired && !mfaCode) {
        setMfaRequired(true);
        setLoading(false);
        return;
      }
      setAuth(data.user, data.accessToken);
      toast.success('Welcome back!');
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      toast.error(error?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/20"
              style={{
                width: `${200 + i * 120}px`,
                height: `${200 + i * 120}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-8 shadow-modal">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">Elexsol</h1>
          <p className="text-lg text-primary-foreground/70">
            Your Digital CFO for automated FIRS compliance, multi-source data integration, and business growth analytics.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { value: '2,400+', label: 'SMEs' },
              { value: '₦12B+', label: 'Processed' },
              { value: '99.7%', label: 'Compliance' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-xs text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Elexsol</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <Input id="email" type="email" placeholder="you@company.ng" className="h-11" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <span className="text-xs text-primary cursor-pointer hover:underline">Forgot password?</span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="h-11 pr-10"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mfaRequired && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                <Label htmlFor="mfa" className="text-sm font-medium">MFA Code</Label>
                <Input id="mfa" placeholder="Enter 6-digit code" className="h-11" value={mfaCode} onChange={e => setMfaCode(e.target.value)} maxLength={6} />
              </motion.div>
            )}

            <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
              {loading ? 'Signing in...' : mfaRequired ? 'Verify & Sign in' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account? <span className="text-primary font-medium cursor-pointer hover:underline">Get started</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
