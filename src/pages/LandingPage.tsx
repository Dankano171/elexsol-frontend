import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, BarChart3, ShieldCheck, Link2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: ShieldCheck, title: 'FIRS Compliance', desc: 'Automated invoice validation and 72-hour clearance tracking' },
  { icon: Link2, title: 'Multi-Source Integration', desc: 'Connect Zoho, WhatsApp & QuickBooks in one click' },
  { icon: BarChart3, title: 'Growth Analytics', desc: 'Revenue trends, payment velocity & cash flow forecasting' },
];

const stats = [
  { value: '2,400+', label: 'SMEs Onboarded' },
  { value: '₦12B+', label: 'Processed Monthly' },
  { value: '99.7%', label: 'Compliance Rate' },
  { value: '14 days', label: 'Avg. Payment Velocity' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <header className="border-b border-border/40 bg-background/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Elexsol</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="font-medium">Sign in</Button>
            <Button size="sm" onClick={() => navigate('/login')} className="font-medium">Get Started <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl -mr-48 -mt-48 opacity-60" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-primary/15 via-transparent to-transparent blur-3xl -ml-40 -mb-40 opacity-50" />

        <div className="max-w-7xl mx-auto px-8 py-32 lg:py-40 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold mb-8 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4" /> Trusted by 2,400+ Nigerian SMEs
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
              Your Digital CFO for<br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">Automated Compliance</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Elexsol automates FIRS compliance, integrates your financial data sources, and delivers growth analytics — so you can focus on building your business.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/login')} className="h-13 px-10 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/login')} className="h-13 px-10 text-base font-semibold border-border/60 hover:bg-muted/80 transition-colors">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative border-y border-border/40 bg-muted/15 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                className="text-center group"
              >
                <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-3 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-24 lg:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Everything you need to stay compliant</h2>
          <p className="text-lg text-muted-foreground font-light">One platform for invoicing, tax compliance, and business intelligence</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-primary/30 hover:bg-card/60 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 group-hover:from-primary/25 group-hover:to-primary/10 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">Elexsol</span>
          </div>
          <p className="text-xs text-muted-foreground font-light">© {new Date().getFullYear()} Elexsol Technologies Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
