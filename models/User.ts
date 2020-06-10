import { userCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class User extends BaseModel {
  public id: string = "";
  public name: string = "";
  public email: string = "";
  public password: string = "";

  constructor({ id = "", name = "", email = "", password = "" }) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async findOne(params: object): Promise<User | null> {
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
}
