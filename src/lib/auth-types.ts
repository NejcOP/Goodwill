export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  birthDate?: string;
  points: number;
  referralCode: string;
  newsletterPreferences: NewsletterPreferences;
  createdAt: string;
}

export interface NewsletterPreferences {
  newCollections: boolean;
  exclusiveOffers: boolean;
  sales: boolean;
  journal: boolean;
  events: boolean;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface MockOrder {
  id: string;
  number: string;
  date: string;
  total: number;
  status: "placano" | "v-obdelavi" | "poslano" | "dostavljeno";
  itemCount: number;
  products?: MockOrderProduct[];
  shippingAddress?: string;
}

export interface MockOrderProduct {
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate?: string;
  newsletterConsent: boolean;
}
