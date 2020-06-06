import { v4 } from "../deps.ts";
import Survey from "./Survey.ts";
import { surveyCollection, questionCollection } from "../mongo.ts";

export default class Question {
  public id: string;
  public surveyId: string;
  public text: string;
  public type: string;
  public required: boolean;
  public data: any;

  constructor({ id = '', surveyId = '', text = '', type = '', required = false, data = {} } = {}) {
    this.id = id;
    this.surveyId = surveyId;
    this.text = text;
    this.type = type;
    this.required = required;
    this.data = data;
  }

  static async getBySurvey(surveyId: string) {
    const questions = await questionCollection.find({ surveyId })
    if (!questions) {
      return [];
    }
    return questions.map((q: object) => new Question(Question.prepare(q)));
  }

  async create() {
    delete this.id;
    const { $oid } = await questionCollection.insertOne(this)
    this.id = $oid;
    return this;
  }

  static async get(id: string) {
    const question = await questionCollection.findOne({ _id: { $oid: id } });
    if (!question) {
      return null;
    }
    return new Question(Question.prepare(question));
  }

  public async update({ text = '', type = '', required = false, data = {}  }) {
    this.text = text;
    this.type = type;
    this.required = required;
    this.data = data;
    console.log(this.id);
    const { modifiedCount } = await questionCollection.updateOne({ _id: { $oid: this.id } }, {
      $set: {
        text: this.text,
        type: this.type,
        required: this.required,
        data: this.data,
      }
    });
    return this;
  }

  
  async delete() {
    return questionCollection.deleteOne({_id: {$oid: this.id}});
  }
  
  private static prepare(data: any) {
    data.id = data._id.$oid;
    delete data._id;
    return data;
  }
}