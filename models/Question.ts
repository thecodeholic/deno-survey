import { questionCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class Question extends BaseModel {
  public id: string = "";
  constructor(
    public surveyId: string,
    public text: string,
    public type: QuestionType,
    public required: boolean,
    public data: any,
  ) {
    super();
  }

  static async findBySurvey(surveyId: string): Promise<Question[]> {
    const questions = await questionCollection.find({ surveyId });
    if (!questions) {
      return [];
    }
    return questions.map((q: object) => Question.prepare(q));
  }

  static async findOne(id: string): Promise<Question | null> {
    const question = await questionCollection.findOne({ _id: { $oid: id } });
    if (!question) {
      return null;
    }
    return Question.prepare(question);
  }

  async create() {
    delete this.id;
    const { $oid } = await questionCollection.insertOne(this);
    this.id = $oid;
    return this;
  }

  public async update(
    text: string,
    type: QuestionType,
    required: boolean,
    data: any,
  ) {
    this.text = text;
    this.type = type;
    this.required = required;
    this.data = data;
    await questionCollection.updateOne(
      { _id: { $oid: this.id } },
      {
        $set: {
          text: this.text,
          type: this.type,
          required: this.required,
          data: this.data,
        },
      },
    );
    return this;
  }

  async delete() {
    return questionCollection.deleteOne({ _id: { $oid: this.id } });
  }

  isText() {
    return this.type === QuestionType.TEXT;
  }

  isChoice() {
    return this.type === QuestionType.CHOICE;
  }

  static prepare(data: any): Question {
    data = BaseModel.prepare(data);
    const question = new Question(
      data.surveyId,
      data.text,
      data.type,
      data.required,
      data.data,
    );
    question.id = data.id;
    return question;
  }
}

export enum QuestionType {
  TEXT = "text",
  CHOICE = "choice",
}
