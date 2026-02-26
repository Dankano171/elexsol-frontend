import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/lib/providers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elexsol - Digital CFO for Nigerian Growth',
  description: 'Automated Compliance & Accelerated Cash Flow',
  keywords: ['invoicing', 'compliance', 'FIRS', 'Nigeria', 'finance'],
  authors: [{ name: 'Elexsol' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: 'white',
                color: '#1f2937',
                border: '1px solid #e5e7eb',
              },
              className: 'shadow-lg',
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
