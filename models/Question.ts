import {v4} from "../deps.ts";
import Survey from "./Survey.ts";
import {surveyCollection} from "../mongo.ts";

export default class Question {
  public uuid: string;
  public text: string;
  public type: string;
  public required: boolean;
  public data: object;

  constructor({uuid = '', text = '', type = '', required = false, data = {}}) {
    this.uuid = v4.generate();
    this.text = text;
    this.type = type;
    this.required = required;
    this.data = data;
  }

  static async getBySurvey(surveyId: string) {
    const survey = await Survey.get(surveyId);
    if (!survey) {
      return [];
    }
    return survey.questions;
  }

  static async get(uuid: string) {
    const survey = await surveyCollection.findOne({ "questions": {uuid} });
    console.log(survey);
  }
}