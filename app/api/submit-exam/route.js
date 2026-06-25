import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../utils/supabaseAdmin';
import { parseQuestions } from '../../exam/questionsData';
import { createClient } from '../../../utils/supabase/server';

export async function POST(req) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized access. Session invalid.' }, { status: 401 });
    }

    const { answers } = await req.json();

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const formattedEmail = user.email;

    // 1. Verify candidate in Supabase
    const { data: candidate, error: fetchError } = await supabaseAdmin
      .from('candidates')
      .select('*')
      .eq('email', formattedEmail)
      .single();

    if (fetchError || !candidate) {
      return NextResponse.json({ error: 'Candidate not found in the system. Access denied.' }, { status: 403 });
    }

    if (!candidate.payment_status) {
      return NextResponse.json({ error: 'Payment clearance missing. Access denied.' }, { status: 403 });
    }

    if (candidate.passed_exam) {
      return NextResponse.json({ error: 'Examination already passed.' }, { status: 400 });
    }

    if (candidate.exam_attempts >= 2) {
      return NextResponse.json({ error: 'Maximum attempts (2) reached.' }, { status: 403 });
    }

    // 2. Grade the Exam
    const questions = parseQuestions();
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        score += 1;
      }
    });

    const isPass = score >= 45;
    const newAttempts = (candidate.exam_attempts || 0) + 1;

    // 3. Update Supabase
    const updatePayload = {
      exam_score: score,
      exam_attempts: newAttempts,
    };

    if (isPass) {
      updatePayload.passed_exam = true;
    }

    const { error: updateError } = await supabaseAdmin
      .from('candidates')
      .update(updatePayload)
      .eq('email', formattedEmail);

    if (updateError) {
      console.error("Failed to update candidate score:", updateError);
      return NextResponse.json({ error: 'Internal Server Error saving score.' }, { status: 500 });
    }

    // 4. Return result
    return NextResponse.json({
      success: true,
      score: score,
      passed: isPass,
      attemptsRemaining: 2 - newAttempts
    });

  } catch (error) {
    console.error("Submit Exam Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
