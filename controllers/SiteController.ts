import { RouterContext } from "../deps.ts";
import { renderView } from "../helpers.ts";
import Survey from "../models/Survey.ts";
import Question from "../models/Question.ts";
import {answerCollection} from "../mongo.ts";

export class SiteController {
  async surveys(ctx: RouterContext) {
    const surveys = await Survey.getAll();
    ctx.response.body = await renderView("surveys", {
      surveys: surveys
    });
  }
  async viewSurvey(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const survey = await Survey.get(id)
    if (!survey) {
      ctx.response.body = await renderView("notfound");
      return;
    }
    const questions: Question[] = await Question.getBySurvey(id);

    ctx.response.body = await renderView("survey", {
      survey,
      questions,
      errors: {},
      answers: {}
    });
  }

  async submitSurvey(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const survey = await Survey.get(id)
    if (!survey) {
      ctx.response.body = await renderView("notfound");
      return;
    }
    const {value: formData} = await ctx.request.body();
    const questions: Question[] = await Question.getBySurvey(id);
    const answers: any = {};
    const errors: any = {};
    console.log(formData);
    for (const question of questions) {
      let value = formData.get(question.id);
      if (question.type === 'choice' && question.data.multiple === true) {
        value = formData.getAll(question.id);
      }
      if (question.required) {
        if (question.type === 'choice' && question.data.multiple && !value.length || (!value)){
          errors[question.id] = "This field is required";
        }
      }
      answers[question.id] = value;
    }
    console.log("Errors ", errors);
    console.log("Answers ", answers);
    if (Object.keys(errors).length > 0){
      ctx.response.body = await renderView("survey", {
        survey,
        questions,
        errors,
        answers
      });
      return;
    }
    const {$oid} = await answerCollection.insertOne({
      surveyId: id,
      date: new Date(),
      userAgent: ctx.request.headers.get('User-Agent'),
      answers
    });
    ctx.response.body = await renderView("surveyFinish", {
      answerId: $oid
    });
  }
}

export default new SiteController();
