import React from 'react';

import { getAllQuestions, getQuestion } from '../../../src/apis/frameSurveys';

export async function generateStaticParams() {
  const questions = await getAllQuestions();
  return questions.map((question) => ({
    id: String(question.id),
  }));
}

type SurveyProps = {
  params: { id: string };
};

export default async function Survey({ params }: SurveyProps) {
  const question = await getQuestion(params.id);

  if (!question) {
    return <div>No Question with this ID</div>
  }

  return (
    <div>
      <span>Question</span>
      <p>{question.description ?? ''}</p>
    </div>
  );
}
