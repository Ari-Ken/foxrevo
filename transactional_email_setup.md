# FoxRevo: Transactional Email Setup Plan & Guidelines

This document details the configuration requirements to deploy a 100% leak-proof transactional email system for the FoxRevo platform using **Resend**, **Supabase DB Triggers**, and **Vercel Cron Jobs**.

---

## Part 1: Resend Setup

1. **Domain Verification:**
   * Go to your **Resend Dashboard** -> **Domains**.
   * Add `foxrevo.com`.
   * Configure the provided `MX`, `TXT`, and `CNAME` records in your DNS provider (e.g. Namecheap, Cloudflare, GoDaddy).
   * Verify the domain to enable sending from custom aliases like `admissions@foxrevo.com`.

2. **Generate API Key:**
   * Go to **Resend Dashboard** -> **API Keys**.
   * Create a key with **Sending** permission.
   * Add the key to your `.env` and Vercel dashboard:
     ```env
     RESEND_API_KEY="re_your_api_key_here"
     ```

---

## Part 2: Database Trigger (Instant Alerts)

To automate emails for instant actions (like checkout confirmations, module completion rewards, or lockout alerts), register a trigger inside your **Supabase Database SQL Editor** that notifies the Vercel API.

### 1. Enable Http Extensions
Ensure your Supabase project can make HTTP requests:
```sql
CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";
```

### 2. Create the Trigger Function
Run this script to construct the payload router:
```sql
CREATE OR REPLACE FUNCTION public.route_email_webhook()
RETURNS TRIGGER AS $$
DECLARE
  payload json;
  webhook_url text := 'https://foxrevo.com/api/webhooks/email-router'; -- Replace with your Vercel URL
BEGIN
  -- Build payload including new record and historical updates
  payload := json_build_object(
    'record', row_to_json(NEW),
    'old_record', row_to_json(OLD)
  );

  -- Dispatch HTTP POST request to the API route asynchronously
  PERFORM extensions.http_post(
    webhook_url,
    payload::text,
    'application/json'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3. Bind the Trigger to Candidates
```sql
CREATE OR REPLACE TRIGGER tr_candidate_email_event
AFTER UPDATE ON public.candidates
FOR EACH ROW
EXECUTE FUNCTION public.route_email_webhook();
```

---

## Part 3: Cron Jobs for Checkout Abandonment (Chronological Recovery)

To send the 1-hour, 24-hour, and 48-hour recovery emails when a registration is started but unpaid, configure a schedule task:

1. **Create Vercel Cron Configuration:**
   Add a `vercel.json` file to the root of your project:
   ```json
   {
     "crons": [
       {
         "path": "/api/webhooks/cron-recovery",
         "schedule": "0 * * * *"
       }
     ]
   }
   ```
   *Note: This schedule runs the abandonment check endpoint once every hour.*

2. **Configure API Key Validation:**
   To secure this endpoint, configure a cron secret in your Vercel settings and evaluate it:
   ```env
   CRON_SECRET="your_secure_cron_secret"
   ```

---

## Part 4: Supabase SMTP configuration (Magic Links & Resets)

To route default authentication magic links and password recovery emails through Resend:

1. Log in to **Supabase Dashboard** -> **Project Settings** -> **Auth**.
2. Scroll to **SMTP Settings** and toggle **Enable Custom SMTP**.
3. Fill in the values:
   * **Sender Email:** `admissions@foxrevo.com`
   * **Sender Name:** `FoxRevo`
   * **Host:** `smtp.resend.com`
   * **Port:** `465` (SSL)
   * **Username:** `resend`
   * **Password:** *Your Resend API Key*
4. Click **Save**.
