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

-- Kreiraj indekse
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Kreiraj RLS politike (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Politike za profiles
CREATE POLICY "Uporabniki lahko vidijo lastni profil" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Uporabniki lahko ažurirajo lastni profil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Politike za addresses
CREATE POLICY "Uporabniki lahko vidijo lastne naslove" ON addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Uporabniki lahko kreirajo naslove" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Uporabniki lahko ažurirajo svoje naslove" ON addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Uporabniki lahko brišejo svoje naslove" ON addresses
  FOR DELETE USING (auth.uid() = user_id);

-- Politike za orders
CREATE POLICY "Uporabniki lahko vidijo lastna naročila" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Uporabniki lahko kreirajo naročila" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politike za order_items
CREATE POLICY "Uporabniki lahko vidijo svoje postavke" ON order_items
  FOR SELECT USING (auth.uid() IN (
    SELECT user_id FROM orders WHERE id = order_id
  ));

-- Trigger za ažuriranje updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
