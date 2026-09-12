# 🚀 Supabase Integracija za GOODWILL

Evo što trebas da uradi da bude Supabase u funkciji:

## 1️⃣ Kreiraj Tabelu u Supabase

Idi na [Supabase Dashboard](https://app.supabase.com/projects) → Klikni na tvoj projekat → **SQL Editor**

Prekopiraj i izvrši sav SQL kod iz datoteke `supabase-setup.sql`:

```sql
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  gender TEXT,
  subcategory TEXT,
  price INTEGER NOT NULL,
  compare_at_price INTEGER,
  colors JSONB,
  sizes TEXT[],
  description TEXT,
  materials TEXT,
  care TEXT,
  shipping TEXT,
  is_new BOOLEAN DEFAULT false,
  rating FLOAT,
  review_count INTEGER,
  images TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_gender ON products(gender);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
```

## 2️⃣ Migriraj Podatke

Kada je tabela kreirana, pokreni:

```bash
npm run migrate-products
```

Ovo će upisati sve proizvode iz mock-a u Supabase!

## 3️⃣ Provjeri Kredencijale

Provjeri `.env.local` - trebao bi da ima:
```
NEXT_PUBLIC_SUPABASE_URL=https://xagnrchpvzpzlcbfjesn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4️⃣ Testira

```bash
npm run build
npm run dev
```

Sada bi trebalo da sve radi sa pravom bazom podataka! 🎉

---

## 📝 Šta je Promijenjeno

✅ `.env.local` - Dodane Supabase kredencijale
✅ `src/lib/supabase.ts` - Kreirani Supabase klijent
✅ `src/lib/actions/products.ts` - Server akcije za dohvatanje podataka
✅ `scripts/migrate-products.js` - Script za migraciju podataka
✅ `supabase-setup.sql` - SQL za kreiranje tabele
