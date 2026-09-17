-- Creative Paradise Gift Store: Orders Table Schema
-- Execute this script in your Supabase Dashboard -> SQL Editor -> New Query -> Run

CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    user_id TEXT, -- Supabase Auth user ID or custom customer ID
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    delivery_date TEXT NOT NULL,
    delivery_slot TEXT NOT NULL,
    delivery_type TEXT NOT NULL,
    items JSONB NOT NULL,
    subtotal NUMERIC NOT NULL,
    discount_amount NUMERIC DEFAULT 0,
    coupon_code TEXT,
    delivery_fee NUMERIC DEFAULT 0,
    total_amount NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    payment_status TEXT NOT NULL,
    order_status TEXT NOT NULL DEFAULT 'placed',
    tracking_history JSONB NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders (order_number);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders (customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders (customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON public.orders (order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 1. Service role has full access
DROP POLICY IF EXISTS "Service role can manage all orders" ON public.orders;
CREATE POLICY "Service role can manage all orders" 
ON public.orders 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- 2. Authenticated users can view their own orders
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
TO authenticated 
USING (
    user_id = auth.uid()::text OR 
    customer_email = auth.jwt()->>'email'
);

-- 3. Any client (including guests) can insert an order during checkout
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;
CREATE POLICY "Anyone can insert orders" 
ON public.orders 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 4. Public can select orders
DROP POLICY IF EXISTS "Public can select order by order number" ON public.orders;
CREATE POLICY "Public can select order by order number" 
ON public.orders 
FOR SELECT 
TO public 
USING (true);

-- 5. Public / admin can update order status
DROP POLICY IF EXISTS "Enable update for orders" ON public.orders;
CREATE POLICY "Enable update for orders" 
ON public.orders 
FOR UPDATE 
TO public 
USING (true) 
WITH CHECK (true);

-- ==========================================================
-- 2. Reminders Table Schema ("My Reminders" Occasion Tracker)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.reminders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    occasion TEXT NOT NULL,
    recipient_name TEXT NOT NULL,
    date TEXT NOT NULL,
    notify_days_before INTEGER DEFAULT 3,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON public.reminders (user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_date ON public.reminders (date);

ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access on reminders" ON public.reminders;
CREATE POLICY "Service role full access on reminders" 
ON public.reminders FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public select reminders" ON public.reminders;
CREATE POLICY "Public select reminders" 
ON public.reminders FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public insert reminders" ON public.reminders;
CREATE POLICY "Public insert reminders" 
ON public.reminders FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Public update reminders" ON public.reminders;
CREATE POLICY "Public update reminders" 
ON public.reminders FOR UPDATE TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public delete reminders" ON public.reminders;
CREATE POLICY "Public delete reminders" 
ON public.reminders FOR DELETE TO public USING (true);

-- ==========================================================
-- 3. Corporate Inquiries Table Schema (Bulk Gifting Leads)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.corporate_inquiries (
    id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    occasion TEXT NOT NULL,
    quantity TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'New', -- 'New', 'Contacted', 'Quoted', 'Closed'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_corporate_inquiries_status ON public.corporate_inquiries (status);
CREATE INDEX IF NOT EXISTS idx_corporate_inquiries_created_at ON public.corporate_inquiries (created_at DESC);

ALTER TABLE public.corporate_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access on corporate_inquiries" ON public.corporate_inquiries;
CREATE POLICY "Service role full access on corporate_inquiries" 
ON public.corporate_inquiries FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can insert corporate inquiries" ON public.corporate_inquiries;
CREATE POLICY "Anyone can insert corporate inquiries" 
ON public.corporate_inquiries FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Public select corporate inquiries" ON public.corporate_inquiries;
CREATE POLICY "Public select corporate inquiries" 
ON public.corporate_inquiries FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public update corporate inquiries" ON public.corporate_inquiries;
CREATE POLICY "Public update corporate inquiries" 
ON public.corporate_inquiries FOR UPDATE 
TO public USING (true) WITH CHECK (true);

-- ==========================================================
-- 4. User Profiles & Role-Based Access Control (RBAC) Table
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 1. Service role has full unrestricted access
DROP POLICY IF EXISTS "Service role full access on profiles" ON public.profiles;
CREATE POLICY "Service role full access on profiles" 
ON public.profiles FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 2. Authenticated users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- 3. Authenticated users can update their own personal info (name, phone, avatar)
-- Prevents clients from tampering with or escalating their own role column
DROP POLICY IF EXISTS "Users can update own profile non-role" ON public.profiles;
CREATE POLICY "Users can update own profile non-role" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id) 
WITH CHECK (
    auth.uid() = id AND 
    (role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()))
);

-- 4. Automatic profile initialization trigger when an auth.users record is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url, phone, role)
  VALUES (
    new.id,
    COALESCE(new.email, ''),
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(COALESCE(new.email, ''), '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    'customer'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(NULLIF(EXCLUDED.name, ''), public.profiles.name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    updated_at = NOW();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================================
-- Example: To promote an account to Administrator, run in Supabase SQL Editor:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@repallgifts.com';
-- ==========================================================
