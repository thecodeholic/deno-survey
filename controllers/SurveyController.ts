import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";
import User from "../models/User.ts";

export class SurveyController {
  async getAll(ctx: RouterContext) {
    const user: User = ctx.state.user as User;
    const surveys = await Survey.findByUser(user.id);
    ctx.response.body = surveys;
  }

  async getSingle(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    let survey: Survey | null = await this.findOrFail(id, ctx);
    if (survey) {
      ctx.response.body = survey;
    }
  }

  async create(ctx: RouterContext) {
    const { value: { name, description } } = await ctx.request.body();

    const user = ctx.state.user as User;
    const survey = new Survey({ name, userId: user.id, description });
    await survey.create();
    ctx.response.status = 201;
    ctx.response.body = survey;
  }

  async update(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const { value: { name, description } } = await ctx.request.body();
    const survey: Survey | null = await this.findOrFail(id, ctx);
    if (survey) {
      await survey.update({ name, description });
      ctx.response.body = survey;
    }
  }

  async delete(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const survey: Survey | null = await this.findOrFail(id, ctx);
    if (survey) {
      await survey.delete();
      ctx.response.status = 204;
    }
  }
  async findOrFail(id: string, ctx: RouterContext): Promise<Survey | null> {
    const survey: Survey | null = await Survey.findOne(id);
    // If the survey does not exist return with 404
    if (!survey) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid Survey ID" };
      return null;
    }
    const user = ctx.state.user as User;
    // If survey does not belong to current user, return with 403
    if (survey.userId !== user.id) {
      ctx.response.status = 403;
      ctx.response.body = {
        message: "You don't have permission to view this survey",
      };
      return null;
    }
    return survey;
  }
}

export default new SurveyController();
