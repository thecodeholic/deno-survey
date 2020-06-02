import { RouterContext } from "../deps.ts";
import { renderView } from "../helpers.ts";

export class SiteController {
  async surveys(ctx: RouterContext) {
    ctx.response.body = await renderView('surveys')
  }
  async viewSurvey(ctx: RouterContext) {
    ctx.response.body = await renderView('survey', {
      survey: {
        name: 'Test survey',
        description: 'Lorem ipsum'
      }
    })
  }
}

export default new SiteController()