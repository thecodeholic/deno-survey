import { RouterContext } from "../deps.ts";
import { renderView } from "../helpers.ts";
import Survey from "../models/Survey.ts";

export class SiteController {
  async surveys(ctx: RouterContext) {
    const surveys = await Survey.getAll();
    ctx.response.body = await renderView("surveys", {
      surveys: surveys
    });
  }
  async viewSurvey(ctx: RouterContext) {
    ctx.response.body = await renderView("survey", {
      survey: {
        name: "Test survey",
        description: "Lorem ipsum",
      },
    });
  }
}

export default new SiteController();
