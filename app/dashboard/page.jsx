import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
import { supabaseAdmin } from '../../utils/supabaseAdmin';
import DashboardClient from './DashboardClient';

export const revalidate = 0; // Disable cache to fetch fresh database statuses

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const email = user.email.toLowerCase();
  const full_name = user.user_metadata?.full_name || 'Candidate';

  // Fetch or auto-create the candidate record using admin client (bypasses RLS)
  let { data: candidate, error } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('email', email)
    .single();

  if (!candidate) {
    const { data: created, error: createError } = await supabaseAdmin
      .from('candidates')
      .upsert({ 
        email, 
        full_name, 
        payment_status: false, 
        passed_exam: false, 
        exam_score: 0, 
        exam_attempts: 0 
      }, { onConflict: 'email' })
      .select()
      .single();

    if (createError) {
      console.error('Failed to create candidate record:', createError);
      return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-primary)' }}>
            <h2>Profile Error</h2>
            <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>We could not load your profile. Please contact support.</p>
          </div>
        </div>
      );
    }
    candidate = created;
  }

  return <DashboardClient candidate={candidate} />;
}
