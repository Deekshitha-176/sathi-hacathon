-- ========================================================
-- ReportSaathi - Supabase Schema for Optional Report History
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: reports
create table if not exists public.reports (
    id uuid primary key default uuid_generate_v4(),
    user_id text not null default 'anonymous',
    report_title text not null,
    patient_summary text not null,
    data jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for quick lookups by user_id
create index if not exists idx_reports_user_id on public.reports(user_id);

-- Row Level Security (RLS)
alter table public.reports enable row level security;

-- Policy: Allow anonymous and authenticated users to insert reports
create policy "Allow insert for all users" on public.reports
    for insert with check (true);

-- Policy: Allow users to view their own reports
create policy "Allow users to view own reports" on public.reports
    for select using (auth.uid()::text = user_id or user_id = 'anonymous');
