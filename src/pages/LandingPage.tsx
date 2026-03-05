import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, BarChart3, ShieldCheck, Link2, CheckCircle2, TrendingUp, Lock, Wifi, CreditCard, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: ShieldCheck, title: 'FIRS Compliance', desc: 'Automated invoice validation and 72-hour clearance tracking' },
  { icon: Link2, title: 'Multi-Source Integration', desc: 'Connect Zoho, WhatsApp & QuickBooks in one click' },
  { icon: BarChart3, title: 'Growth Analytics', desc: 'Revenue trends, payment velocity & cash flow forecasting' },
];

const featureHighlights = [
  { title: 'Zero-Touch FIRS Synchronization', description: 'Invoices are validated, signed, and submitted to FIRS automatically — no manual uploads required.' },
  { title: 'Bank-Grade ECDSA Cryptography', description: 'Every document is cryptographically signed with industry-standard elliptic curve keys.' },
  { title: 'Peppol BIS 3.0 Standard Ready', description: 'Future-proof your invoicing with international e-invoicing standard compliance built in.' },
  { title: 'Automated Reconciliation Engine', description: 'Match payments to invoices across multiple data sources in real time.' },
];

const integrations = [
  { name: 'Paystack', icon: CreditCard },
  { name: 'Flutterwave', icon: Wifi },
  { name: 'First Bank', icon: Building2 },
  { name: 'GTBank', icon: Building2 },
  { name: 'Zoho', icon: Link2 },
];

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-2xl mx-auto lg:mx-0"
      style={{ perspective: '1200px' }}
    >
      <div className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 bg-muted/30">
          <span className="w-3 h-3 rounded-full bg-destructive/60" />
          <span className="w-3 h-3 rounded-full bg-warning/60" />
          <span className="w-3 h-3 rounded-full bg-success/60" />
          <span className="ml-3 text-[11px] text-muted-foreground font-medium tracking-wide">elexsol — dashboard</span>
        </div>
        <div className="p-5 grid grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="col-span-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground tracking-wide">FIRS Tax Status</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/15 border border-success/30 text-success text-xs font-bold">
                <CheckCircle2 className="w-3 h-3" /> Cleared
              </span>
              <span className="text-[10px] text-muted-foreground">Last sync 2m ago</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="rounded-xl bg-card border border-border/50 p-4 backdrop-blur-sm">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Revenue</span>
            <p className="text-lg font-bold text-foreground mt-1">₦4.2M</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-success" />
              <span className="text-[10px] text-success font-semibold">+18.3%</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="rounded-xl bg-card border border-border/50 p-4 backdrop-blur-sm">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Sources</span>
            <p className="text-lg font-bold text-foreground mt-1">5</p>
            <span className="text-[10px] text-muted-foreground">Connected</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="col-span-2 rounded-xl bg-card border border-border/50 p-4 backdrop-blur-sm">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Monthly Invoices</span>
            <div className="flex items-end gap-1.5 mt-3 h-10">
              {[35, 55, 42, 68, 52, 78, 65, 88, 72, 95, 82, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.3 + i * 0.04 }}
                  className="flex-1 rounded-sm origin-bottom"
                  style={{
                    height: `${h}%`,
                    background: i >= 10
                      ? 'hsl(var(--primary))'
                      : `hsl(var(--primary) / ${0.2 + (i / 12) * 0.6})`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute -bottom-6 -right-4 lg:-right-8 rounded-xl border border-border/50 bg-card/90 backdrop-blur-xl shadow-xl p-4 flex items-center gap-3"
      >
        <div className="w-9 h-9 rounded-lg bg-success/15 border border-success/30 flex items-center justify-center">
          <Lock className="w-4 h-4 text-success" />
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">AES-256 Secured</p>
          <p className="text-[10px] text-muted-foreground">Keys vaulted</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] pointer-events-none z-0 rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.07) 0%, transparent 70%)' }}
      />

      {/* Nav */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Elexsol</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="font-medium">Sign in</Button>
            <Button size="sm" onClick={() => navigate('/signup')} className="font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold mb-8 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4" /> Trusted by 2,400+ Nigerian SMEs
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
                Your Digital CFO for{' '}
                <span className="bg-gradient-to-r from-primary via-[hsl(180_60%_40%)] to-primary bg-clip-text text-transparent">
                  Automated Compliance
                </span>
              </h1>

              <p className="text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
                Elexsol automates FIRS compliance, integrates your financial data sources, and delivers growth analytics — so you can focus on building your business.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
                <Button
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="h-14 px-10 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all"
                >
                  Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="h-14 px-10 text-base font-semibold border-border/60 hover:bg-muted/60 transition-colors"
                >
                  View Demo
                </Button>
              </div>

              <div className="pt-6 border-t border-border/40">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-4">Integrates with</p>
                <div className="flex items-center gap-5 flex-wrap">
                  {integrations.map((i) => (
                    <div key={i.name} className="flex items-center gap-2 text-muted-foreground/70 hover:text-muted-foreground transition-colors">
                      <i.icon className="w-4 h-4" />
                      <span className="text-xs font-medium">{i.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="relative">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights (replaces vanity metrics) */}
      <section className="relative z-10 border-y border-border/40 bg-muted/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureHighlights.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <h3 className="text-sm font-bold text-foreground mb-2">{feat.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">Everything you need to stay compliant</h2>
          <p className="text-lg text-muted-foreground">One platform for invoicing, tax compliance, and business intelligence</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 group-hover:from-primary/25 group-hover:to-primary/10 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 bg-muted/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/20">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">Elexsol</span>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Elexsol Technologies Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
