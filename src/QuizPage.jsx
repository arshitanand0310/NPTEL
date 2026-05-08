import React, { useState } from 'react';

function QuizPage({ title, dueDate, questions, userAnswers }) {
  const [bookmarked, setBookmarked] = useState(false);

  const totalCorrect = questions.filter((q, i) => {
    const chosen = userAnswers[i];
    const correct = q.correct;
    return chosen.length === correct.length &&
      chosen.every(a => correct.includes(a)) &&
      correct.every(c => chosen.includes(c));
  }).length;

  return (
    <div className="quiz-page">
      <div className="quiz-topbar">
        <span className="quiz-assessment-badge">Assessment</span>
        <button className="quiz-bookmark-btn" onClick={() => setBookmarked(!bookmarked)}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle', color: '#1a73c8' }}>
            {bookmarked ? 'bookmark' : 'bookmark_border'}
          </span>
          Bookmark
        </button>
      </div>

      <div className="quiz-title-row">
        <h1 className="quiz-title">{title}</h1>
        <span className="quiz-due-date">Due date on {dueDate}, 23:59 IST</span>
      </div>

      <p className="quiz-subtitle">
        The due date for submitting this assignment has passed. As per our records you have not submitted this assignment.
      </p>

      {questions.map((q, i) => {
        const chosen = userAnswers[i];
        const correct = q.correct;
        const isCorrect = chosen.length === correct.length &&
          chosen.every(a => correct.includes(a)) &&
          correct.every(c => chosen.includes(c));
        const isMulti = q.type === 'multi';
        const acceptedAnswerText = correct.map(idx => q.options[idx]).join('; ');

        return (
          <div className="quiz-question" key={i}>
            <div className="quiz-q-header">
              <span className="quiz-q-text">{i + 1}.&nbsp;&nbsp;{q.q}</span>
              <span className="quiz-points">1 Point</span>
            </div>
            <div className="quiz-options">
              {q.options.map((opt, j) => (
                <label className="quiz-option" key={j}>
                  {isMulti ? (
                    <input type="checkbox" checked={false} readOnly style={{ accentColor: '#555' }} />
                  ) : (
                    <input type="radio" name={`q${i}`} checked={false} readOnly />
                  )}
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            <div className="quiz-feedback">
              {isCorrect ? (
                <span className="quiz-pill-correct">✓ &nbsp;Correct answer! Score: 1</span>
              ) : (
                <span className="quiz-pill-red">You didn't attempt this question well in time. Score: 0</span>
              )}
              <span className="quiz-pill-green">
                Accepted answer is &nbsp;<strong>{acceptedAnswerText}</strong>
              </span>
            </div>
          </div>
        );
      })}

      <div className="quiz-summary">
        <strong>Score: {totalCorrect} / {questions.length}</strong>
      </div>
    </div>
  );
}

export default QuizPage;