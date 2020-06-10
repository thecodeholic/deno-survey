import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";
import User from "../models/User.ts";
import BaseSurveyController from "./BaseSurveyController.ts";

export class SurveyController extends BaseSurveyController {
  async getAll(ctx: RouterContext) {
    const user: User = ctx.state.user as User;
    const surveys = await Survey.findByUser(user.id);
    ctx.response.body = surveys;
  }

  async getSingle(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    let survey: Survey | null = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      ctx.response.body = survey;
    }
  }

  async create(ctx: RouterContext) {
    const { value: { name, description } } = await ctx.request.body();

    const user = ctx.state.user as User;
    const survey = new Survey(user.id, name, description);
    await survey.create();
    ctx.response.status = 201;
    ctx.response.body = survey;
  }

  async update(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const { value: { name, description } } = await ctx.request.body();
    const survey: Survey | null = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      await survey.update({ name, description });
      ctx.response.body = survey;
    }
  }

  async delete(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const survey: Survey | null = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      await survey.delete();
      ctx.response.status = 204;
    }
  }
}

export default new SurveyController();
