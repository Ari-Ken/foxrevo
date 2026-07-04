import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../utils/supabaseAdmin';
import { createClient } from '../../../../utils/supabase/server';
import { parsePart1Questions } from '../../../training/questions/part1';
import { parsePart2Questions } from '../../../training/questions/part2';
import { parsePart3Questions } from '../../../training/questions/part3';

export async function POST(req) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized access. Session invalid.' }, { status: 401 });
    }

    const { part, answers } = await req.json();
    const partNum = parseInt(part);

    if (!partNum || ![1, 2, 3].includes(partNum) || !answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid assessment payload.' }, { status: 400 });
    }

    const formattedEmail = user.email;

    // 1. Fetch candidate
    const { data: candidate, error: fetchError } = await supabaseAdmin
      .from('candidates')
      .select('*')
      .eq('email', formattedEmail)
      .single();

    if (fetchError || !candidate) {
      return NextResponse.json({ error: 'Candidate profile not found.' }, { status: 403 });
    }

    // Must have passed entrance exam first
    if (!candidate.passed_exam) {
      return NextResponse.json({ error: 'Entrance exam clearance required before starting assessments.' }, { status: 403 });
    }

    // 2. Load and grade the questions
    let questions = [];
    if (partNum === 1) {
      questions = parsePart1Questions();
    } else if (partNum === 2) {
      questions = parsePart2Questions();
    } else if (partNum === 3) {
      questions = parsePart3Questions();
    }

    let correctAnswers = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        correctAnswers += 1;
      }
    });

    const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    const isPass = scorePercentage >= 40; // Passing grade is 40%

    // 3. Update database
    const updatePayload = {};
    if (partNum === 1) {
      updatePayload.part1_score = scorePercentage;
      updatePayload.part1_passed = isPass || candidate.part1_passed;
    } else if (partNum === 2) {
      updatePayload.part2_score = scorePercentage;
      updatePayload.part2_passed = isPass || candidate.part2_passed;
    } else if (partNum === 3) {
      updatePayload.part3_score = scorePercentage;
      updatePayload.part3_passed = isPass || candidate.part3_passed;
    }

    const { error: updateError } = await supabaseAdmin
      .from('candidates')
      .update(updatePayload)
      .eq('email', formattedEmail);

    if (updateError) {
      console.error(`Failed to save Part ${partNum} assessment:`, updateError);
      return NextResponse.json({ error: 'Internal Server Error saving score.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      score: scorePercentage,
      passed: isPass,
      correctCount: correctAnswers,
      totalQuestions: questions.length
    });

  } catch (err) {
    console.error('Submit assessment error:', err);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
