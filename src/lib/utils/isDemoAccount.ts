import { useAuthStore } from '@/lib/store/authStore';

const DEMO_EMAIL = 'admin@elexsol.ng';

export function isDemoAccount(): boolean {
  const { user } = useAuthStore.getState();
  return user?.email === DEMO_EMAIL;
}
