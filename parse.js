const fs = require('fs');

const raw = fs.readFileSync('./raw_questions.txt', 'utf8');

const regex = /^(\d+)\.\s+(.*?)\nA\)\s+(.*?)\nB\)\s+(.*?)\nC\)\s+(.*?)\nD\)\s+(.*?)\n\*\*Answer:\s+([A-D])\*\*/gm;

const questions = [];
let match;
while ((match = regex.exec(raw)) !== null) {
  questions.push({
    id: parseInt(match[1]),
    question: match[2].trim(),
    options: {
      A: match[3].trim(),
      B: match[4].trim(),
      C: match[5].trim(),
      D: match[6].trim()
    },
    answer: match[7]
  });
}

if (questions.length !== 100) {
  console.error("Failed to parse exactly 100 questions. Parsed:", questions.length);
} else {
  fs.writeFileSync('./app/exam/questions.json', JSON.stringify(questions, null, 2));
  console.log("Successfully wrote 100 questions to app/exam/questions.json");
}
