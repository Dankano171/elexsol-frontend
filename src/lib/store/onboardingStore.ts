import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  hasCryptoKeys: boolean;
  hasPaymentDetails: boolean;
  accountTier: string | null;
  setCryptoKeys: (value: boolean) => void;
  setPaymentDetails: (value: boolean) => void;
  setAccountTier: (tier: string | null) => void;
  isOnboardingComplete: () => boolean;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      hasCryptoKeys: false,
      hasPaymentDetails: false,
      accountTier: null,
      setCryptoKeys: (value) => set({ hasCryptoKeys: value }),
      setPaymentDetails: (value) => set({ hasPaymentDetails: value }),
      setAccountTier: (tier) => set({ accountTier: tier }),
      isOnboardingComplete: () => {
        const { hasCryptoKeys, hasPaymentDetails, accountTier } = get();
        return hasCryptoKeys && hasPaymentDetails && !!accountTier;
      },
      resetOnboarding: () => set({ hasCryptoKeys: false, hasPaymentDetails: false, accountTier: null }),
    }),
    { name: 'onboarding-storage' }
  )
);
