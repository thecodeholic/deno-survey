import { RouterContext } from "../deps.ts";
import { surveyCollection } from "../mongo.ts";
import Survey from "../models/Survey.ts";

export class SurveyController {
  async getAll(ctx: RouterContext) {
    const surveys = await Survey.findAll();
    ctx.response.body = surveys;
  }

  async getSingle(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const survey = await Survey.findOne(id);
    if (!survey) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid Id" };
      return;
    }
    ctx.response.body = survey;
  }

  async create(ctx: RouterContext) {
    const { value: { name, description } } = await ctx.request.body();

    const survey = new Survey({ name, description });
    await survey.create();
    ctx.response.status = 201;
    ctx.response.body = survey;
  }

  async update(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const { value: { name, description } } = await ctx.request.body();
    const survey = await Survey.findOne(id);
    if (!survey) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid id" };
      return;
    }
    await survey.update({ name, description });

    ctx.response.body = survey;
  }

  async delete(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const survey = await Survey.findOne(id);
    if (!survey) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid id" };
      return;
    }
    await survey.delete();
    ctx.response.status = 204;
    ctx.response.body = "";
  }
}

export default new SurveyController();
