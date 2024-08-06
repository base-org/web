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

type AnswerTable = {
  id: Generated<number>;
  question_id: number;
  name: string;
  description: string;
  created_at: ColumnType<Date, string | undefined, never>;
};

type UserResponseTable = {
  id: Generated<number>;
  user_id: string;
  user_address: string;
  question_id: number;
  answer_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
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

export async function getAllQuestions() {
  return await surveyDb.selectFrom('frame_survey_questions').selectAll().execute();
}

export async function getQuestion(id: string) {
  const question = await surveyDb
    .selectFrom('frame_survey_questions')
    .where('id', '=', Number(id))
    .selectAll()
    .executeTakeFirst()
  return question;
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
