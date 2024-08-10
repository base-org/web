import { getAllQuestions, getSurvey } from 'apps/web/src/apis/frameSurveys';
import SurveyContent from 'apps/web/src/components/Surveys/SurveyContent';

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
    <SurveyContent surveyData={survey}/>
  );
}
