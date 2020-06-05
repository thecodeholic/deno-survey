import { surveyCollection } from "../mongo.ts";
import Question from "./Question.ts";
import BaseModel from "./BaseModel.ts";

export default class Survey {
  public id = "";
  public name = "";
  public description = "";

  constructor({
    id = "",
    name = "",
    description = "",
  }) {
      this.id = id;
      this.name = name;
      this.description = description;
  }
  static async getAll() {
    const surveys = await surveyCollection.find();
    return surveys.map((survey: any) => new Survey(Survey.prepare(survey)));
  }

  public async create(){
    delete this.id;
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

  private static prepare(data: any) {
    data.id = data._id.$oid;
    delete data._id;
    return data;
  }
}
