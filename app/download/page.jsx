import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
import { supabaseAdmin } from '../../utils/supabaseAdmin';
import DownloadClient from './DownloadClient';

export default async function DownloadPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const email = user.email.toLowerCase();

  const { data: candidate } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('email', email)
    .single();

  if (!candidate || !candidate.payment_status || !candidate.passed_exam) {
    redirect('/dashboard');
  }

  return <DownloadClient />;
}
