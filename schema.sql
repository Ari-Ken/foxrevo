-- FOXREVO OS v2.0 DATABASE SCHEMA MIGRATION
-- Copy and execute this script inside the SQL Editor of your Supabase Dashboard

-- 1. Community Feed: Posts
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content VARCHAR(280) NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('#detox', '#rewire', '#build', '#qa')),
    metrics JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Post Policies
CREATE POLICY "Allow public read access to posts" ON public.posts
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Allow authors to update their own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id);


-- 2. Community Feed: Votes (Assets upvotes)
CREATE TABLE IF NOT EXISTS public.post_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('upvote')),
    CONSTRAINT unique_user_post_vote UNIQUE (user_id, post_id)
);

ALTER TABLE public.post_votes ENABLE ROW LEVEL SECURITY;

-- Votes Policies
CREATE POLICY "Allow public read access to votes" ON public.post_votes
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to vote" ON public.post_votes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own vote" ON public.post_votes
    FOR DELETE USING (auth.uid() = user_id);


-- 3. Personal Asset Column Tracker Logs
CREATE TABLE IF NOT EXISTS public.asset_tracker_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    cash_flow NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    assets_val NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    liabilities_val NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.asset_tracker_logs ENABLE ROW LEVEL SECURITY;

-- Asset Tracker Policies
CREATE POLICY "Allow users to read their own asset logs" ON public.asset_tracker_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own asset logs" ON public.asset_tracker_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 4. Business Validation Blueprints
CREATE TABLE IF NOT EXISTS public.business_validations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    audience VARCHAR(200) NOT NULL,
    problem VARCHAR(500) NOT NULL,
    solution VARCHAR(500) NOT NULL,
    signups_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.business_validations ENABLE ROW LEVEL SECURITY;

-- Validation Policies
CREATE POLICY "Allow users to read their own validations" ON public.business_validations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own validations" ON public.business_validations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own validations" ON public.business_validations
    FOR UPDATE USING (auth.uid() = user_id);
