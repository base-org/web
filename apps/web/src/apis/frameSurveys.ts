import { ColumnType, Generated, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

type Database = {
  frame_survey_questions: QuestionTable;
  frame_survey_question_answers: AnswerTable;
  frame_survey_user_responses: UserResponseTable;
};

type QuestionTable = {
  id: Generated<number>;
  name: string;
  description: string;
  created_at: ColumnType<Date, string | undefined, never>;
};

export type Question = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
};

type AnswerTable = {
  id: Generated<number>;
  question_id: number;
  name: string;
  description: string;
  created_at: ColumnType<Date, string | undefined, never>;
};

export type Answer = {
  id: number;
  question_id: number;
  name: string;
  description: string;
  created_at: Date;
};

export type Survey = {
  question: Question;
  answers: Answer[];
};

type UserResponseTable = {
  id: Generated<number>;
  user_id: string;
  user_address: string;
  question_id: number;
  answer_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
};

export type UserResponse = {
  user_id: string;
  user_address: string;
  question_id: number;
  answer_id: number;
};

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'postgres',
    host: 'localhost',
    user: 'postgres',
    password: 'posgres',
    port: 6432,
    max: 10,
  }),
});

export const surveyDb = new Kysely<Database>({
  dialect,
});

// (probably) Doesn't need to be in an API routes
// web/src/apis/survey.ts // getAllQuestions
// GetAllQuestions => call getAllQuestions()
// /apiroutes/survey => call getAllQuestions()

export async function getAllQuestions(): Promise<Question[]> {
  const questions: Question[] = await surveyDb
    .selectFrom('frame_survey_questions')
    .selectAll()
    .execute();
  return questions;
}

async function getQuestion(id: string): Promise<Question> {
  const question: Question = await surveyDb
    .selectFrom('frame_survey_questions')
    .where('id', '=', Number(id))
    .selectAll()
    .executeTakeFirst();
  return question;
}

export async function getSurvey(id: string): Promise<Survey> {
  const question = await getQuestion(id);
  const answers = await surveyDb
    .selectFrom('frame_survey_question_answers')
    .where('question_id', '=', question.id)
    .selectAll()
    .execute();

  return {
    question,
    answers,
  };
}

export async function postUserResponse(
  questionId: number,
  answerId: number,
  userAddress: string,
  userId: string,
) {
  const survey = await getSurvey(String(questionId));
  const surveyAnswerIds = survey.answers.map((answer) => answer.id);

  if (!surveyAnswerIds.includes(answerId)) {
    return {
      status: 404,
      message: 'Invalid answer for this question',
    };
  }

  // TODO Sanitize the strings //
  const userResponse = await surveyDb
    .insertInto('frame_survey_user_responses')
    .values({
      question_id: questionId,
      answer_id: answerId,
      user_address: userAddress,
      user_id: userId,
    })
    .returning(['question_id', 'answer_id', 'user_address', 'user_id'])
    .executeTakeFirst();

  return {
    status: 200,
    userResponse,
    message: 'you fucking rock',
  };
}

/*
  // web/src/apis/survey.ts -> always present & initiated
  db types
  db connection
  db queries --> READ & CREATE

  Table frame_survey_questions
    - question ID = 1 // slug = 'my-survey-one'
    - question ID = 2 // slug = 'my-survey-two'
    - ....

  // page for each survey
  // Gets pre-rendered at build time / "yarn build"
  // app/surveys/GetAllQuestions/page // SSR
    --> query web/src/apis/survey
    --> each survey gets own page (i think)



  GetAllQuestions/postFrame // client component
    -- fetch()
    -- post()
    -- useEffect / useState()

  // Only available when the server is started / "yarn dev" & "yarn start"
  API routes routes (maybe)
    --> query web/src/apis/survey
*/
