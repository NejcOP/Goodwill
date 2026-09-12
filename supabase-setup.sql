-- Kreiraj products tabelu
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

-- Kreiraj indexe za brže upite
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_gender ON products(gender);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
