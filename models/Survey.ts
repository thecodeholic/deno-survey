import { surveyCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class Survey extends BaseModel {
  public id: string = "";

  constructor(
    public userId: string,
    public name: string,
    public description: string,
  ) {
    super();
    this.userId = userId;
    this.name = name;
    this.description = description;
  }

  static async findAll(): Promise<Survey[]> {
    const surveys = await surveyCollection.find();
    return surveys.map((survey: any) => Survey.prepare(survey));
  }

  static async findByUser(userId: string): Promise<Survey[]> {
    const surveys = await surveyCollection.find({ userId });
    return surveys.map((survey: object) => Survey.prepare(survey));
  }

  static async findOne(id: string): Promise<Survey | null> {
    const survey = await surveyCollection.findOne({ _id: { $oid: id } });
    if (!survey) {
      return null;
    }
    return Survey.prepare(survey);
  }

  async create() {
    delete this.id;
    const { $oid } = await surveyCollection.insertOne(this);
    this.id = $oid;
    return this;
  }

  async update({ name, description }: { name: string; description: string }) {
    const { modifiedCount } = await surveyCollection
      .updateOne({ _id: { $oid: this.id } }, {
        $set: { name, description },
      });

    if (modifiedCount > 0) {
      this.name = name;
      this.description = description;
    }
    return this;
  }

  delete() {
    return surveyCollection.deleteOne({ _id: { $oid: this.id } });
  }

  static prepare(data: any): Survey {
    data = BaseModel.prepare(data);
    const survey = new Survey(
      data.userId,
      data.name,
      data.description,
    );
    survey.id = data.id;
    return survey;
  }
}
