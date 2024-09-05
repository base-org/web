import type { Metadata } from 'next';
import {
  getAllSurveyQuestionsAndAnswerOptions,
  getAllSurveys,
  getSurvey,
} from 'apps/web/pages/api/surveys/surveys';
import SurveyContent from 'apps/web/src/components/Surveys/SurveyContent';
import { initialFrame } from 'apps/web/pages/api/surveys/frame/frameResponses';

export async function generateStaticParams() {
  try {
    const surveys = await getAllSurveys();
    return surveys?.map((survey) => ({
      id: String(survey.id),
    }));
  } catch (error) {
    console.error('Could not get questions:', error);
    return [];
  }
}

type SurveyProps = {
  params: { id: number };
};

export async function generateMetadata({ params }: SurveyProps): Promise<Metadata> {
  const survey = await getSurvey(params.id);
  if (!survey) {
    return;
  }
  const questionsWithAnswerOptions = await getAllSurveyQuestionsAndAnswerOptions(params.id);
  if (!questionsWithAnswerOptions) {
    return;
  }
  return {
    title: 'Based Surveys',
    description: 'Base <3 Builders',
    openGraph: {
      title: 'Base.org | Surveys',
      description: 'Base <3 Builders',
      images: ['https://base.org/images/base-open-graph.png'],
    },
    other: {
      ...(initialFrame(survey, questionsWithAnswerOptions) as Record<string, string>),
    },
  };
}

export default async function Survey({ params }: SurveyProps) {
  const survey = await getSurvey(params.id);

  return (
    <div className="mt-[-96px] bg-black">
      <div className="mt-[96px] flex h-screen flex-col items-center">
        <div className="mt-40 w-[740px] bg-blue-60 text-center text-white">
          {!survey ? (
            <h1 className="my-10 text-3xl">No Survey with this ID</h1>
          ) : (
            <SurveyContent survey={survey} />
          )}
        </div>
      </div>
    </div>
  );
}
