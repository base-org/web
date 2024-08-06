import { getAllQuestions, getSurvey } from 'apps/web/src/apis/frameSurveys';
import { ButtonWithSurveyResponse } from 'apps/web/src/components/Button/ButtonWithSurveyResponse';

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

  if (!survey || survey.answers.length === 0) {
    return <div>No Survey with this ID</div>;
  }

  return (
    <div className="mt-[-96px] bg-blue-60">
      <div className="mt-[96px]">
        <p>Question: {survey.question.description ?? ''}</p>
        <ol>
          {survey.answers.map((answer) => (
            <li key={answer.id}>
              <ButtonWithSurveyResponse text={answer.description} surveyResponseId={answer.id} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
