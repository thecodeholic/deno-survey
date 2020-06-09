import { surveyCollection } from "../mongo.ts";

export default class Survey {
  public id: string;
  public userId: string;
  public name: string;
  public description: string;

  constructor({ id = "", userId = "", name = "", description = "" }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.description = description;
  }

  static async findAll(): Promise<Survey[]> {
    const surveys = await surveyCollection.find();
    return surveys.map((survey: any) => new Survey(Survey.prepare(survey)));
  }

  static async findByUser(userId: string): Promise<Survey[]> {
    const surveys = await surveyCollection.find({ userId });
    return surveys.map((survey: object) => new Survey(Survey.prepare(survey)));
  }

  static async findOne(id: string): Promise<Survey | null> {
    const survey = await surveyCollection.findOne({ _id: { $oid: id } });
    if (!survey) {
      return null;
    }
    return new Survey(Survey.prepare(survey));
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

  private static prepare(data: any) {
    data.id = data._id.$oid;
    delete data._id.$oid;
    return data;
  }
}
