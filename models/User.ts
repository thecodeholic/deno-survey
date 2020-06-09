import { userCollection } from "../mongo.ts";

export default class User {
  public id: string = "";
  public name: string = "";
  public email: string = "";
  public password: string = "";

  constructor({ id = "", name = "", email = "", password = "" }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async findOne(params: object) {
    const user = await userCollection.findOne(params);
    if (!user) {
      return null;
    }
    return new User(User.prepare(user));
  }

  async save() {
    delete this.id;
    const { $oid } = await userCollection.insertOne(this);
    this.id = $oid;
    return this;
  }

  private static prepare(data: any) {
    data.id = data._id.$oid;
    delete data._id.$oid;
    return data;
  }
}
