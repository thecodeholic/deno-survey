import { Application, Router } from "./deps.ts";
import siteController from "./controllers/SiteController.ts";
import surveyController from "./controllers/SurveyController.ts";
import questionController from "./controllers/QuestionController.ts";
import apiController from "./controllers/ApiController.ts";

const app = new Application();
const router = new Router();

router
  .get('/', siteController.surveys)
  .get('/survey/:id', siteController.viewSurvey)
  
  .post('/api/login', apiController.login)
  
  // Survey CRUD
  .get('/api/survey', surveyController.getAll)
  .get('/api/survey/:id', surveyController.getSingle)
  .post('/api/survey', surveyController.create)
  .put('/api/survey/:id', surveyController.update)
  .delete('/api/survey/:id', surveyController.delete)

  // Survey Question CRUD
  .get('/api/survey/:surveyId/question', questionController.getBySurvey)
  .get('/api/survey/:surveyId/question/:id', questionController.getSingle)
  .post('/api/survey/:surveyId/question', questionController.create)
  .put('/api/survey/:surveyId/question/:id', questionController.update)
  .delete('/api/survey/:surveyId/question/:id', questionController.delete)
  
  // Survey Question Shorter URLs
  .get('/api/question/:surveyId', questionController.getBySurvey)
  .get('/api/question/:id', questionController.getSingle)
  .post('/api/question/:surveyId', questionController.create)
  .put('/api/question/:id', questionController.update)
  .delete('/api/question/:id', questionController.delete)
  
  

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
});

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

// register some middleware

await app.listen({port: 8000})