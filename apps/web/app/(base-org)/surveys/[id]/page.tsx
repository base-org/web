import { getAllQuestions, getSurvey } from '../../../../src/apis/frameSurveys';
import SurveyContent from '../../../../src/components/Surveys/SurveyContent';

export async function generateStaticParams() {
  try {
    const questions = await getAllQuestions();
    return questions?.map((question) => ({
      id: String(question.id),
    }));
  } catch (error) {
    console.error('Could not get questions:', error);
    return [];
  }
}

type SurveyProps = {
  params: { id: number };
};

export default async function Survey({ params }: SurveyProps) {
  const survey = await getSurvey(params.id);

  if (!survey || survey.answers.length === 0) {
    return <div>No Survey with this ID</div>;
  }

  return <SurveyContent surveyData={survey} />;
}
