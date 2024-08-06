import React from 'react';

import { getAllQuestions, getSurvey } from '../../../../src/apis/frameSurveys';

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
  const survey = await getSurvey(params.id);
  console.log({ survey });

  if (!survey) {
    return <div>No Survey with this ID</div>;
  }

  return (
    <div>
      <span>Survey</span>
      <p>Question: {survey.question.description ?? ''}</p>
      <ol>
        {survey.answers.map((answer) => (
          <li key={answer.id}>{answer.description}</li>
        ))}
      </ol>
    </div>
  );
}
