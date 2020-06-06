import { Router } from "./deps.ts";
import {authMiddleware} from "./middleware/authMiddleware.ts";
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
  .get('/api/survey', authMiddleware, surveyController.getAll)
  .get('/api/survey/:id', authMiddleware, surveyController.getSingle)
  .post('/api/survey', authMiddleware, surveyController.create)
  .put('/api/survey/:id', authMiddleware, surveyController.update)
  .delete('/api/survey/:id', authMiddleware, surveyController.delete)

  // Survey Question CRUD
  .get('/api/survey/:surveyId/question', authMiddleware, questionController.getBySurvey)
  .get('/api/question/:id', authMiddleware, questionController.getSingle)
  .post('/api/question/:surveyId', authMiddleware, questionController.create)
  .put('/api/question/:id', authMiddleware, questionController.update)
  .delete('/api/question/:id', authMiddleware, questionController.delete)

export default router;