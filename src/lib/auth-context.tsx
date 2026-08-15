"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  UserProfile,
  NewsletterPreferences,
  Address,
  MockOrder,
  RegisterData,
} from "./auth-types";
import { LOYALTY_CONFIG } from "@/config/loyalty";

// Auth service abstraction — replace the localStorage calls here to plug in Supabase, Firebase, etc.

interface AuthContextValue {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (data: RegisterData) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error?: string }>;
  updateNewsletter: (prefs: NewsletterPreferences) => Promise<void>;
  addPoints: (points: number, description: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  orders: MockOrder[];
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_KEY = "goodwill-auth";
const USERS_KEY = "goodwill-users";
const WISHLIST_KEY = "goodwill-wishlist";
const ADDRESSES_KEY = "goodwill-addresses";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function makeReferralCode(firstName: string) {
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GOODWILL-${firstName.toUpperCase().slice(0, 4)}${suffix}`;
}

const DEMO_ORDERS: MockOrder[] = [
  {
    id: "gw-10482",
    number: "GW-10482",
    date: "12.08.2026",
    total: 189,
    status: "placano",
    itemCount: 2,
    shippingAddress: "Dunajska cesta 5, 1000 Ljubljana",
    products: [
      {
        name: "Linen Oversized Shirt",
        size: "M",
        price: 119,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
      },
      {
        name: "Wide Leg Trousers",
        size: "S",
        price: 70,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4078?w=400&q=80",
      },
    ],
  },
  {
    id: "gw-10391",
    number: "GW-10391",
    date: "28.07.2026",
    total: 245,
    status: "dostavljeno",
    itemCount: 3,
    shippingAddress: "Dunajska cesta 5, 1000 Ljubljana",
    products: [
      {
        name: "Merino Wool Knit",
        size: "L",
        price: 145,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
      },
    ],
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) setUser(JSON.parse(raw));
      const wl = localStorage.getItem(WISHLIST_KEY);
      if (wl) setWishlist(JSON.parse(wl));
      const addr = localStorage.getItem(ADDRESSES_KEY);
      if (addr) setAddresses(JSON.parse(addr));
    } catch {
      // ignore corrupt storage
    }
    setIsLoading(false);
  }, []);

  const saveUser = useCallback((u: UserProfile | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(u));
      // Keep users pool in sync
      const pool = localStorage.getItem(USERS_KEY);
      const users: UserProfile[] = pool ? JSON.parse(pool) : [];
      const idx = users.findIndex((x) => x.id === u.id);
      if (idx >= 0) users[idx] = u;
      else users.push(u);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, []);

  const login = useCallback(
    async (email: string, _password: string): Promise<{ error?: string }> => {
      // Mock auth — any password works for demo
      const pool = localStorage.getItem(USERS_KEY);
      const users: UserProfile[] = pool ? JSON.parse(pool) : [];
      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (!found) return { error: "Napačen e-poštni naslov ali geslo." };
      saveUser(found);
      return {};
    },
    [saveUser]
  );

  const register = useCallback(
    async (data: RegisterData): Promise<{ error?: string }> => {
      const pool = localStorage.getItem(USERS_KEY);
      const users: UserProfile[] = pool ? JSON.parse(pool) : [];
      if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase()))
        return { error: "Ta e-poštni naslov je že registriran." };

      const bonusPoints =
        LOYALTY_CONFIG.points.registration +
        (data.newsletterConsent ? LOYALTY_CONFIG.points.newsletterSignup : 0);

      const newUser: UserProfile = {
        id: uid(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        points: bonusPoints,
        referralCode: makeReferralCode(data.firstName),
        newsletterPreferences: {
          newCollections: data.newsletterConsent,
          exclusiveOffers: data.newsletterConsent,
          sales: false,
          journal: false,
          events: false,
        },
        createdAt: new Date().toISOString(),
      };

      saveUser(newUser);
      return {};
    },
    [saveUser]
  );

  const logout = useCallback(async () => {
    saveUser(null);
  }, [saveUser]);

  const updateProfile = useCallback(
    async (data: Partial<UserProfile>): Promise<{ error?: string }> => {
      if (!user) return { error: "Niste prijavljeni." };
      saveUser({ ...user, ...data });
      return {};
    },
    [user, saveUser]
  );

  const updateNewsletter = useCallback(
    async (prefs: NewsletterPreferences) => {
      if (!user) return;
      await updateProfile({ newsletterPreferences: prefs });
    },
    [user, updateProfile]
  );

  const addPoints = useCallback(
    (points: number, _description: string) => {
      if (!user) return;
      updateProfile({ points: user.points + points });
    },
    [user, updateProfile]
  );

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const addAddress = useCallback((address: Omit<Address, "id">) => {
    setAddresses((prev) => {
      const newAddr = { ...address, id: uid() };
      const next = address.isDefault
        ? [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))]
        : [...prev, newAddr];
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const next = prev.map((a) => ({ ...a, isDefault: a.id === id }));
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      updateNewsletter,
      addPoints,
      wishlist,
      toggleWishlist,
      orders: DEMO_ORDERS,
      addresses,
      addAddress,
      removeAddress,
      setDefaultAddress,
    }),
    [
      user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      updateNewsletter,
      addPoints,
      wishlist,
      toggleWishlist,
      addresses,
      addAddress,
      removeAddress,
      setDefaultAddress,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
