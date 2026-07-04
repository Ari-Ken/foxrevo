import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';
import { supabaseAdmin } from '../../../utils/supabaseAdmin';
import CertificateView from './CertificateView';

export const dynamic = 'force-dynamic';

export default async function CertificatePage() {
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

  // Must have passed entrance exam, all three training assessments, and paid the fee
  const isQualified = 
    candidate.passed_exam && 
    candidate.part1_passed && 
    candidate.part2_passed && 
    candidate.part3_passed &&
    candidate.cert_paid;

  if (!isQualified) {
    redirect('/dashboard');
  }

  return <CertificateView candidate={candidate} />;
}
