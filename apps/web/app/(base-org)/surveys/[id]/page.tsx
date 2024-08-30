import type { Metadata } from 'next';
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { DOMAIN } from 'apps/web/src/constants';
import { getAllSurveys, getSurvey } from 'apps/web/pages/api/surveys/frameSurveys';
import SurveyContent from 'apps/web/src/components/Surveys/SurveyContent';

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

// export async function generateMetadata({ params }: SurveyProps): Promise<Metadata> {
//   const survey = await getSurvey(params.id);
//   const frameMetadata = {
//     buttons: survey?.answers.map((answer) => ({
//       action: 'post',
//       label: answer.description,
//       postUrl: `http://localhost:3000/api/surveys/frameUserResponse?questionId=${survey.question.id}&answerId=${answer.id}`,
//     })),
//     image: {
//       src: `${DOMAIN}/api/surveys/assets/questionFrameImage.png?survey=${survey?.question.description}`,
//     },
//     postUrl: 'http://localhost:3000/api/surveys/frameUserResponse',
//   };

//   return {
//     title: 'Based Surveys',
//     description: 'LFG',
//     openGraph: {
//       title: 'Base.org | Surveys',
//       description: 'LFGooooo',
//       images: ['https://base.org/images/base-open-graph.png'],
//     },
//     other: {
//       ...(getFrameMetadata(frameMetadata) as Record<string, string>),
//     },
//   };
// }

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
