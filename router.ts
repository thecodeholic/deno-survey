import { Router } from "./deps.ts";
import { authMiddleware } from "./middleware/authMiddleware.ts";
import siteController from "./controllers/SiteController.ts";
import surveyController from "./controllers/SurveyController.ts";
import questionController from "./controllers/QuestionController.ts";
import authController from "./controllers/AuthController.ts";
import { questionCollection } from "./mongo.ts";

const router = new Router();

router
  .get("/", siteController.surveys)
  .get("/survey/:id", siteController.viewSurvey)
  .post("/survey/:id", siteController.submitSurvey)
  .post("/api/register", authController.register)
  .post("/api/login", authController.login)
  // Survey CRUD
  .get(
    "/api/survey",
    authMiddleware,
    surveyController.getAll.bind(surveyController),
  )
  .get(
    "/api/survey/:id",
    authMiddleware,
    surveyController.getSingle.bind(surveyController),
  )
  .post(
    "/api/survey",
    authMiddleware,
    surveyController.create.bind(surveyController),
  )
  .put(
    "/api/survey/:id",
    authMiddleware,
    surveyController.update.bind(surveyController),
  )
  .delete(
    "/api/survey/:id",
    authMiddleware,
    surveyController.delete.bind(surveyController),
  )
  // Survey Question CRUD
  .get(
    "/api/survey/:surveyId/question",
    authMiddleware,
    questionController.getBySurvey.bind(questionCollection),
  )
  .get(
    "/api/question/:id",
    authMiddleware,
    questionController.getSingle.bind(questionCollection),
  )
  .post(
    "/api/question/:surveyId",
    authMiddleware,
    questionController.create.bind(questionCollection),
  )
  .put(
    "/api/question/:id",
    authMiddleware,
    questionController.update.bind(questionCollection),
  )
  .delete(
    "/api/question/:id",
    authMiddleware,
    questionController.delete.bind(questionCollection),
  );

export default router;
