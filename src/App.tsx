import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import CompliancePage from "./pages/CompliancePage";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/regulatory" element={<PlaceholderPage title="Regulatory Clearance" subtitle="72-hour CSID clearance tracking" />} />
          <Route path="/analytics" element={<PlaceholderPage title="Analytics" subtitle="Revenue & growth insights" />} />
          <Route path="/reports" element={<PlaceholderPage title="Reports" subtitle="Generate compliance & financial reports" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" subtitle="Manage your account & preferences" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
