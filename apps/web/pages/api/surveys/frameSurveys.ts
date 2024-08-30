import { ColumnType, Generated, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

type Database = {
  frame_surveys: SurveyTable;
  frame_survey_questions: QuestionTable;
  frame_survey_question_answers: AnswerOptionsTable;
  frame_survey_user_responses: UserResponseTable;
};

type SurveyTable = {
  id: Generated<number>;
  name: string;
  description: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: Date;
  concluded_at: Date;
};

export type Survey = Pick<SurveyTable, 'id' | 'name' | 'description' | 'concluded_at'>;

export type SurveyQuestionWithAnswerOptions = {
  question: Question;
  answers: AnswerOption[];
};

type QuestionTable = {
  id: Generated<number>;
  survey_id: number;
  name: string;
  description: string;
  question_type: 'Multiple Choice' | 'Text Input';
  created_at: ColumnType<Date, string | undefined, never>;
};

export type Question = Pick<QuestionTable, 'id' | 'name' | 'description' | 'question_type'>;

type AnswerOptionsTable = {
  id: Generated<number>;
  question_id: number;
  answer_choice: string;
  created_at: ColumnType<Date, string | undefined, never>;
};

export type AnswerOption = Pick<AnswerOptionsTable, 'id' | 'question_id' | 'answer_choice'>;

export type UserSurveyResponseForDb = {
  response: UserQuestionResponse[];
};

export type UserQuestionResponse = {
  questionId: number;
  answerId: number | null;
  answer: string;
};

type UserResponseTable = {
  id: Generated<number>;
  user_id: string;
  user_address: string;
  question_id: number;
  answer_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
};

type UserResponseFromDb = {
  user_id: string;
  user_address: string;
  question_id: number;
  answer_id: number;
};

type UserResponseReturnValueType = {
  status: number;
  message: string;
  userResponse?: UserResponseFromDb;
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

export async function getAllSurveys(): Promise<SurveyTable[]> {
  try {
    const surveys: SurveyTable[] = await surveyDb.selectFrom('frame_surveys').selectAll().execute();
    return surveys;
  } catch (error) {
    console.error('Could not fetch questions:', error);
    return [];
  }
}

export async function getSurvey(surveyId: number): Promise<Survey | null> {
  try {
    const survey: Survey = await surveyDb
      .selectFrom('frame_surveys')
      .where('id', '=', surveyId)
      .select(['id', 'name', 'description', 'concluded_at'])
      .executeTakeFirst();
    return survey;
  } catch (error) {
    return null;
  }
}

export async function getAllSurveyQuestionsAndAnswerOptions(
  surveyId: number,
): Promise<SurveyQuestionWithAnswerOptions[]> {
  const questions = await getAllSurveyQuestions(surveyId);

  const questionsWithAnswers: SurveyQuestionWithAnswerOptions[] = [];

  for (const question of questions) {
    const answers = await getAllQuestionAnswerOptions(question.id);
    questionsWithAnswers.push({
      question: {
        id: question.id,
        name: question.name,
        description: question.description,
        question_type: question.question_type,
      },
      answers,
    });
  }

  return questionsWithAnswers;
}

export async function getAllSurveyQuestions(surveyId: number): Promise<QuestionTable[]> {
  try {
    const questions: QuestionTable[] = await surveyDb
      .selectFrom('frame_survey_questions')
      .where('survey_id', '=', surveyId)
      .selectAll()
      .execute();
    return questions;
  } catch (error) {
    console.error('Could not fetch questions:', error);
    return [];
  }
}

export async function getAllQuestionAnswerOptions(questionId: number): Promise<AnswerOption[]> {
  try {
    const answers = await surveyDb
      .selectFrom('frame_survey_question_answer_options')
      .where('question_id', '=', questionId)
      .select(['id', 'question_id', 'answer_choice'])
      .execute();
    return answers;
  } catch (error) {
    console.error('Could not get answers:', error);
    return [];
  }
}

export async function postUserResponse(
  surveyId: number,
  answer: UserSurveyResponseForDb,
  userAddress: string,
  userId: string | null,
): Promise<UserResponseReturnValueType> {
  const userResponse = await surveyDb
    .insertInto('frame_survey_user_responses')
    .values({
      survey_id: surveyId,
      answer: JSON.stringify(answer),
      user_address: userAddress,
      user_id: userId ?? 'NotAFrameResponse',
    })
    .returning(['survey_id', 'answer', 'user_address', 'user_id'])
    .executeTakeFirst();

  return {
    status: 200,
    userResponse,
    message: 'you fucking rock',
  };
}
