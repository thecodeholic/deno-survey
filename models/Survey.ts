import { surveyCollection } from "../mongo.ts";
import Question from "./Question.ts";

export default class Survey {
  public id = "";
  public name = "";
  public description = "";
  public questions: Question[] = [];

  constructor({
    id = "",
    name = "",
    description = "",
    questions = []
  }) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.questions = questions;
  }
  static async getAll() {
    const surveys = await surveyCollection.find();
    return surveys.map((survey: any) => new Survey(Survey.prepare(survey)));
  }

  public async create(){
    const {$oid} = await surveyCollection.insertOne(this)
    this.id = $oid;
    return this;
  }

  public async update({name = '', description = ''}) {
    const {modifiedCount} = await surveyCollection.updateOne({ _id: { $oid: this.id } }, {
      $set: {name, description}
    });
    if (modifiedCount > 0) {
      this.name = name;
      this.description = description;
    }
    return this;
  }

  static async get(id: string) {
    const survey = await surveyCollection.findOne({ _id: { $oid: id } });
    console.log(survey);
    if (!survey) {
      return null;
    }
    return new Survey(Survey.prepare(survey))
  }

  static async delete(id: string) {
    return surveyCollection.deleteOne({_id: {$oid: id}});
  }

  public async addQuestion({text = '', type = '', required = false, data = {}}) {
    const question = new Question({text, type, required, data});
    this.questions.push(question)
    const {modifiedCount} = await surveyCollection.updateOne({_id: {$oid: this.id}}, {
      $set: {
        questions: this.questions
      }
    });
    return question;
  }

  public getQuestions() {
    return this.questions;
  }

  private static prepare(survey: any) {
    survey.id = survey._id.$oid;
    delete survey._id;
    return survey;
  }
}
