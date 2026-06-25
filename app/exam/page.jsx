import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
import { supabaseAdmin } from '../../utils/supabaseAdmin';
import ExamClient from './ExamClient';

export default async function ExamPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const email = user.email.toLowerCase();

  const { data: candidate } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('email', email)
    .single();

  if (!candidate || !candidate.payment_status) {
    redirect('/dashboard');
  }

  const hasPassed = candidate.passed_exam === true;
  const attempts = candidate.exam_attempts || 0;
  const isLocked = attempts >= 2 && !hasPassed;

  if (isLocked) {
    redirect('/dashboard');
  }

  return <ExamClient />;
}
