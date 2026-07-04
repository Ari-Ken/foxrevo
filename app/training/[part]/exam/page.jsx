import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '../../../../utils/supabase/server';
import { supabaseAdmin } from '../../../../utils/supabaseAdmin';
import TrainingExamClient from './TrainingExamClient';

export const dynamic = 'force-dynamic';

export default async function TrainingExamPage({ params }) {
  const { part } = params;

  // Validate route
  if (!['part1', 'part2', 'part3'].includes(part)) {
    redirect('/dashboard');
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const email = user.email;

  // Fetch candidate profile (bypasses RLS to ensure integrity)
  const { data: candidate } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('email', email)
    .single();

  if (!candidate) {
    redirect('/login');
  }

  // Must have paid and passed the entrance exam
  if (!candidate.payment_status || !candidate.passed_exam) {
    redirect('/dashboard');
  }

  return <TrainingExamClient part={part} candidate={candidate} />;
}
