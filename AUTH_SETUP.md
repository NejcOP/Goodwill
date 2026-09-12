# 🔐 Supabase Avtentifikacija Setup

## Koraci za Postavljanje Prijave Uporabnikov

### 1️⃣ Kreiraj Tabele v Supabase SQL Editorju

Idi na https://app.supabase.com → SQL Editor in izvrši kod iz `supabase-auth-setup.sql`:

```sql
-- Kreiraj tabelo za profile uporabnikov
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Kreiraj tabelo za naslov dostave
CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  street_address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, title)
);

-- Kreiraj tabelo za naročila
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Kreiraj tabelo za postavke naročila
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Kreiraj indekse in RLS politike
-- (Polni kod je v supabase-auth-setup.sql)
```

### 2️⃣ Omogući Avtentifikacijo v Supabase

1. Idi v **Authentication** sekcijo
2. V **Providers** omogući **Email**
3. V **Email Templates** nastavi tema kot želi
4. V **URL Configuration** nastavi:
   - Site URL: `http://localhost:3000` (razvoj) ali `https://yourdomain.com` (produkcija)
   - Redirect URLs: `http://localhost:3000/racun/prijava`, `http://localhost:3000/racun`

### 3️⃣ Provjeri `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://xagnrchpvzpzlcbfjesn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4️⃣ Kreiraj Login/Register Komponente

Primjer login komponente:

```tsx
"use client";

import { useState } from "react";
import { signIn } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn(email, password);

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/racun/profil");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />
      
      <input
        type="password"
        placeholder="Geslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />
      
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-charcoal text-white rounded hover:bg-charcoal/90"
      >
        {loading ? "Prijava..." : "Prijavi se"}
      </button>
    </form>
  );
}
```

### 5️⃣ Uporabi `useAuth` Hook v Komponentah

```tsx
"use client";

import { useAuth } from "@/lib/hooks/use-auth";

export function UserProfile() {
  const { user, loading } = useAuth();

  if (loading) return <p>Nalagam...</p>;
  if (!user) return <p>Niste prijavljeni</p>;

  return (
    <div>
      <p>Pozdrav, {user.email}!</p>
    </div>
  );
}
```

---

## 📝 Kreirane Datoteke

✅ `supabase-auth-setup.sql` - SQL za tabele
✅ `src/lib/actions/auth.ts` - Server akcije (prijava, registracija)
✅ `src/lib/hooks/use-auth.ts` - Hook za prikaz stanja
✅ `.env.local` - Dodana `NEXT_PUBLIC_APP_URL`

---

## 🚀 Kaj Lahko Počneš

Uporabniki sedaj lahko:
- ✅ Se registrirajo z emailom in geslom
- ✅ Se prijavijo
- ✅ Se odjavijo
- ✅ Resetirajo geslo
- ✅ Vidijo svoje naslove in naročila

**Javi mi ko bo vse nastavljeno! 🎉**
