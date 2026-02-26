import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, BarChart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">Elexsol</div>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-primary">
            Login
          </Link>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          The Digital CFO for Nigerian Growth:
          <span className="text-primary block mt-2">
            Automated Compliance, Accelerated Cash Flow.
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Streamline your business finances with automated invoicing, real-time compliance with FIRS,
          and intelligent cash flow forecasting.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" asChild>
            <Link href="/signup">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to grow your business
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="google-card p-6">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">FIRS Compliance</h3>
            <p className="text-gray-600">
              Automated validation of 55 mandatory fields and instant submission to FIRS.
            </p>
          </div>

          <div className="google-card p-6">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Velocity</h3>
            <p className="text-gray-600">
              Track and optimize your average days to get paid with intelligent insights.
            </p>
          </div>

          <div className="google-card p-6">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cash Flow Forecast</h3>
            <p className="text-gray-600">
              30-day projections with AI-powered predictions and trend analysis.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
