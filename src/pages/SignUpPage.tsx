import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, Building2, Mail, Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTES } from '@/lib/constants/routes';
import { useAuthStore } from '@/lib/store/authStore';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: '',
    email: '',
    password: '',
    phone: '',
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName || !form.email || !form.password || !form.phone) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.businessName.split(' ')[0] || '',
            last_name: form.businessName.split(' ').slice(1).join(' ') || '',
            business_name: form.businessName,
            phone: form.phone,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.user && data.session) {
        // Auto-signed in
        const user = {
          id: data.user.id,
          email: data.user.email || '',
          firstName: data.user.user_metadata?.first_name || '',
          lastName: data.user.user_metadata?.last_name || '',
          businessName: data.user.user_metadata?.business_name || '',
          businessId: '',
          role: 'admin' as const,
          mfaEnabled: false,
        };
        setAuth(user, data.session.access_token);
        toast.success('Account created! Welcome to Elexsol.');
        navigate(ROUTES.DASHBOARD);
      } else {
        // Email confirmation required
        toast.success('Account created! Please check your email to confirm, then sign in.');
        navigate(ROUTES.LOGIN);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: 'businessName', label: 'Business Name', icon: Building2, type: 'text', placeholder: 'Acme Nigeria Ltd' },
    { id: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'you@company.ng' },
    { id: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+234 801 234 5678' },
  ];

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
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">Join Elexsol</h1>
          <p className="text-lg text-primary-foreground/70">
            Automate your FIRS compliance, connect financial data, and unlock growth analytics — all in one platform.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { value: '5 min', label: 'Setup' },
              { value: 'Free', label: 'To start' },
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

          <h2 className="text-2xl font-bold text-foreground mb-1">Create your account</h2>
          <p className="text-sm text-muted-foreground mb-8">Get started with automated compliance in minutes</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((f) => (
              <div key={f.id} className="space-y-2">
                <Label htmlFor={f.id} className="text-sm font-medium">{f.label}</Label>
                <div className="relative">
                  <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="h-11 pl-10"
                    value={(form as any)[f.id]}
                    onChange={update(f.id)}
                    required
                  />
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="h-11 pl-10 pr-10"
                  value={form.password}
                  onChange={update('password')}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
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

            <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
