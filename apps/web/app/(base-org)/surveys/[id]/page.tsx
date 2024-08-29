import type { Metadata } from 'next';
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { DOMAIN } from 'apps/web/src/constants';
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

export async function generateMetadata({ params }: SurveyProps): Promise<Metadata> {
  const survey = await getSurvey(params.id);
  const frameMetadata = {
    buttons: survey?.answers.map((answer) => ({
      action: 'post',
      label: answer.description,
      postUrl: `http://localhost:3000/api/surveys/frameUserResponse?questionId=${survey.question.id}&answerId=${answer.id}`,
    })),
    image: {
      src: `${DOMAIN}/api/surveys/assets/questionFrameImage.png?survey=${survey?.question.description}`,
    },
    postUrl: 'http://localhost:3000/api/surveys/frameUserResponse',
  };

  return {
    title: 'Based Surveys',
    description: 'LFG',
    openGraph: {
      title: 'Base.org | Surveys',
      description: 'LFGooooo',
      images: ['https://base.org/images/base-open-graph.png'],
    },
    other: {
      ...(getFrameMetadata(frameMetadata) as Record<string, string>),
    },
  };
}

export default async function Survey({ params }: SurveyProps) {
  const survey = await getSurvey(params.id);

  if (!survey || survey.answers.length === 0) {
    return <div>No Survey with this ID</div>;
  }

  return <SurveyContent surveyData={survey} />;
}
