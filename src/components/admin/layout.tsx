import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Elexsol',
  description: 'System Administration',
  robots: 'noindex, nofollow', // Prevent indexing
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
