# Elexsol Frontend - Business Growth & Compliance Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-orange)](LICENSE)

## 🎯 **Overview**

Elexsol is a production-grade, high-fidelity frontend application built for Nigerian SMEs to manage their finances, ensure FIRS compliance, and accelerate business growth. Following Google Services Design Language, it provides a clean, intuitive, and performant interface for the Digital CFO platform.

### **Key Features**
- ✅ **Unified Authentication** - Multi-step signup with MFA support
- ✅ **FIRS Credentials Management** - Secure CSID and private key storage
- ✅ **Digital CFO Dashboard** - Financial pulse with real-time metrics
- ✅ **Integration Hub** - Connect Zoho, WhatsApp, and QuickBooks
- ✅ **Compliance Center** - Flagged invoice management with inline editing
- ✅ **Regulatory Clearance** - 72-hour timers and IRN tracking
- ✅ **Billing & Plans** - Tiered subscriptions with Paystack/Flutterwave
- ✅ **Privacy-First Admin** - Hidden route with anonymized exports
- ✅ **Mobile Responsive** - Optimized for 4G smartphones

---

## 📋 **Table of Contents**
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Key Modules](#key-modules)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## 🛠️ **Tech Stack**

### **Core Technologies**
| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js (App Router) | 14.0 |
| Language | TypeScript | 5.3 |
| Styling | Tailwind CSS | 3.3 |
| UI Components | shadcn/ui | Latest |
| State Management | Zustand | 4.4 |
| Server State | TanStack Query | 5.14 |
| Forms | React Hook Form | 7.48 |
| Validation | Zod | 3.22 |
| Charts | Recharts | 2.10 |
| Tables | TanStack Table | 8.11 |
| Authentication | NextAuth.js | 4.24 |
| HTTP Client | Axios | 1.6 |
| Notifications | Sonner | 1.2 |
| Animations | Framer Motion | 10.16 |

### **Payment Integration**
- Paystack (primary)
- Flutterwave (secondary)

---

## 📦 **Prerequisites**

- Node.js 18.x or higher
- npm/yarn/pnpm
- Backend API running (see backend README)

---

## 🚀 **Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-org/elexsol-frontend.git
cd elexsol-frontend
```

### **2. Install Dependencies**
```bash
npm install
# or
yarn install
```

### **3. Set Up Environment Variables**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### **4. Install shadcn/ui Components**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog dropdown-menu form input label select table tabs toast alert badge progress switch calendar popover command avatar
```

---

## ⚙️ **Configuration**

### **Essential Environment Variables**

```env
# App Configuration
NEXT_PUBLIC_APP_NAME=Elexsol
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-min-32-chars-long

# Feature Flags
NEXT_PUBLIC_ENABLE_MFA=true
NEXT_PUBLIC_ENABLE_ADMIN=true

# Admin Hidden Route (obfuscated)
NEXT_PUBLIC_ADMIN_SLUG=elex-control-99

# Payment Providers
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-xxx
```

See `.env.example` for complete configuration.

---

## 🏃 **Running the Application**

### **Development Mode**
```bash
npm run dev
# Open http://localhost:3000
```

### **Production Build**
```bash
npm run build
npm start
```

### **Type Checking**
```bash
npm run type-check
```

### **Linting**
```bash
npm run lint
```

---

## 📁 **Project Structure**

```
elexsol-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Authentication routes
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── mfa-setup/
│   │   ├── (dashboard)/         # Protected dashboard routes
│   │   │   ├── dashboard/
│   │   │   ├── integrations/
│   │   │   ├── compliance/
│   │   │   ├── regulatory/
│   │   │   ├── billing/
│   │   │   └── settings/
│   │   ├── admin/               # Hidden admin route
│   │   │   └── [slug]/
│   │   └── layout.tsx
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── auth/                 # Authentication components
│   │   ├── dashboard/            # Dashboard components
│   │   ├── integrations/         # Integration components
│   │   ├── compliance/           # Compliance components
│   │   ├── regulatory/           # Regulatory components
│   │   ├── billing/              # Billing components
│   │   └── admin/                # Admin components
│   │
│   ├── lib/                      # Utilities
│   │   ├── api/                  # API clients
│   │   ├── hooks/                # Custom React hooks
│   │   ├── store/                # Zustand stores
│   │   ├── utils/                # Utility functions
│   │   └── constants/            # Constants
│   │
│   ├── types/                    # TypeScript types
│   └── styles/                   # Global styles
│
├── public/                        # Static assets
├── .env.example
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🎯 **Key Modules**

### **1. Authentication Module**
- Multi-step signup with TIN validation
- MFA setup with QR code generation
- Password strength meter
- Session management

### **2. FIRS Credentials Management**
- Secure CSID and private key input (masked)
- AES-256 encryption disclaimer
- Credentials health monitoring
- Test connection functionality

### **3. Billing & Plans**
- Tier selection cards (Free/Tier1/Tier2/Tier3)
- Paystack/Flutterwave integration
- Payment method management
- Usage limits and counters

### **4. Integration Hub**
- Card-based integration grid
- OAuth2 flow for Zoho/QuickBooks
- Health status indicators
- Sync progress tracking

### **5. Compliance Center**
- Flagged invoice grid with TanStack Table
- Inline editing for corrections
- Validation error tooltips
- Bulk actions

### **6. Regulatory Clearance**
- 72-hour countdown timer (real-time)
- Clearance timeline visualization
- IRN and QR code display
- Stamped invoice download

### **7. Admin Hub** (Hidden Route)
- System-wide metrics
- Sector performance (anonymized)
- User management
- Audit log viewer
- Excel export

---

## 🔄 **State Management**

### **Server State (TanStack Query)**
```typescript
// Example query
const { data, isLoading } = useQuery({
  queryKey: ['dashboard', 'metrics'],
  queryFn: () => dashboardApi.getMetrics(),
  refetchInterval: 30000, // 30 seconds
});

// Example mutation
const mutation = useMutation({
  mutationFn: (id) => integrationsApi.sync(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['integrations'] });
    toast.success('Sync completed');
  },
});
```

### **Client State (Zustand with Persist)**
```typescript
// Auth store (persisted)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);

// Compliance store (grid state)
export const useComplianceStore = create<ComplianceState>()(
  persist(
    (set) => ({
      selectedRows: [],
      columnVisibility: {},
      setSelectedRows: (rows) => set({ selectedRows: rows }),
    }),
    { name: 'compliance-storage' }
  )
);
```

---

## 🌐 **API Integration**

### **API Client Setup**
```typescript
// lib/api/client.ts
import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

// Request interceptor - adds auth token
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// Response interceptor - handles token refresh
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh
    }
    return Promise.reject(error);
  }
);
```

### **Hook Examples**
```typescript
// hooks/useFIRSCredentials.ts
export const useFIRSCredentials = () => {
  const queryClient = useQueryClient();

  const saveCredentials = useMutation({
    mutationFn: (data) => firsCredentialsApi.save(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credentials-health'] });
      toast.success('FIRS credentials saved securely');
    },
  });

  const health = useQuery({
    queryKey: ['credentials-health'],
    queryFn: () => firsCredentialsApi.getHealth(),
    refetchInterval: 60000,
  });

  return { saveCredentials, health };
};
```

---

## 🧪 **Testing**

### **Unit Tests**
```bash
npm run test:unit
```

### **Integration Tests**
```bash
npm run test:integration
```

### **E2E Tests**
```bash
npm run test:e2e
```

---

## 🚢 **Deployment**

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Manual Build**
```bash
# Build
npm run build

# Start production server
npm start
```

### **Docker**
```bash
# Build image
docker build -t elexsol-frontend .

# Run container
docker run -p 3000:3000 elexsol-frontend
```

---

## 🔒 **Security Features**

### **Frontend Security**
- JWT-based authentication with automatic refresh
- MFA with TOTP
- Session management
- HTTP-only cookies
- XSS protection via Content Security Policy
- CSRF protection
- Input sanitization
- PII masking in admin views

### **FIRS Credential Security**
- Private keys **never** logged or stored in plaintext
- Masked input fields with toggle visibility
- AES-256 encryption disclaimer
- No plaintext in browser storage

---

## 📱 **Mobile Responsiveness**

The application is fully optimized for Nigerian SMEs using 4G smartphones:
- Responsive layouts for all screen sizes
- Touch-friendly tap targets (min 44x44px)
- Optimized images and assets
- Smooth animations (60fps)
- Offline capability (PWA ready)

---

## 🤝 **Contributing**

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

### **Code Standards**
- ESLint configuration
- Prettier formatting
- Conventional commits
- TypeScript strict mode
- Component documentation

---

## 📄 **License**

Proprietary - All rights reserved. This software is confidential and may not be copied, distributed, or modified without explicit written permission.

---

**Built with ❤️ for Nigerian SMEs** 🚀
