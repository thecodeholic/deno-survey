import { Router } from "./deps.ts";
import siteController from "./controllers/SiteController.ts";
import surveyController from "./controllers/SurveyController.ts";
import questionController from "./controllers/QuestionController.ts";
import apiController from "./controllers/ApiController.ts";


const router = new Router();

router
  .get('/', siteController.surveys)
  .get('/survey/:id', siteController.viewSurvey)

  .post('/api/register', apiController.register)
  .post('/api/login', apiController.login)

  // Survey CRUD
  .get('/api/survey', surveyController.getAll)
  .get('/api/survey/:id', surveyController.getSingle)
  .post('/api/survey', surveyController.create)
  .put('/api/survey/:id', surveyController.update)
  .delete('/api/survey/:id', surveyController.delete)

  // Survey Question CRUD
  .get('/api/survey/:surveyId/question', questionController.getBySurvey)
  .get('/api/question/:id', questionController.getSingle)
  .post('/api/question/:surveyId', questionController.create)
  .put('/api/question/:id', questionController.update)
  .delete('/api/question/:id', questionController.delete)

export default router;