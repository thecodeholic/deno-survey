import { RouterContext } from "../deps.ts";
import Question from "../models/Question.ts";
import BaseSurveyController from "./BaseSurveyController.ts";

export class QuestionController extends BaseSurveyController {
  async getBySurvey(ctx: RouterContext) {
    const surveyId: string = ctx.params.surveyId!;
    const survey = await this.findSurveyOrFail(surveyId, ctx);
    if (survey) {
      ctx.response.body = await Question.findBySurvey(surveyId);
    }
  }

  async getSingle(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const question: Question | null = await Question.findOne(id);
    if (!question) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid Question ID" };
      return;
    }
    ctx.response.body = question;
  }

  async create(ctx: RouterContext) {
    const surveyId: string = ctx.params.surveyId!;
    const survey = this.findSurveyOrFail(surveyId, ctx);
    if (!survey) {
      return;
    }
    const { value: {text, type, required, data} } = await ctx.request.body();
    const question = new Question(surveyId, text, type, required, data);
    await question.create();
    ctx.response.status = 201;
    ctx.response.body = question;
  }

  async update(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const { value: {text, type, required, data} } = await ctx.request.body();
    const question: Question | null = await Question.findOne(id);
    if (!question) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid Question ID" };
      return;
    }
    await question.update(text, type, required, data);
    ctx.response.body = question;
  }

  async delete(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const question: Question | null = await Question.findOne(id);
    if (!question) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid Question ID" };
      return;
    }
    await question.delete();
    ctx.response.status = 204;
  }
}

export default new QuestionController();
