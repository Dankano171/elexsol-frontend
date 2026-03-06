import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import IntegrationConnectPage from "./pages/IntegrationConnectPage";
import CompliancePage from "./pages/CompliancePage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import RegulatoryPage from "./pages/RegulatoryPage";
import RegulatoryDetailPage from "./pages/RegulatoryDetailPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const P = ({ children }: { children: React.ReactNode }) => <ProtectedRoute>{children}</ProtectedRoute>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<P><DashboardPage /></P>} />
          <Route path="/integrations" element={<P><IntegrationsPage /></P>} />
          <Route path="/integrations/:provider" element={<P><IntegrationConnectPage /></P>} />
          <Route path="/compliance" element={<P><CompliancePage /></P>} />
          <Route path="/compliance/:id" element={<P><InvoiceDetailPage /></P>} />
          <Route path="/regulatory" element={<P><RegulatoryPage /></P>} />
          <Route path="/regulatory/:id" element={<P><RegulatoryDetailPage /></P>} />
          <Route path="/analytics" element={<P><AnalyticsPage /></P>} />
          <Route path="/reports" element={<P><ReportsPage /></P>} />
          <Route path="/settings" element={<P><SettingsPage /></P>} />
          <Route path="/admin/elex-control-99" element={<P><AdminPage /></P>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
