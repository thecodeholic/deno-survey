import { userCollection } from "../mongo.ts";

export default class User {
  public id: string = '';
  public name: string = '';
  public email: string = '';
  public password: string = '';


  constructor({ id = '', name, email, password = '' }:
    { id?: string, name: string, email: string, password: string }
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public static async findOne(params: object) {
    let user = await userCollection.findOne(params);
    if (!user) {
      return null;
    }
    const _id = user._id;
    delete user._id;
    user.id = _id.$oid;
    return new User(user);
  }

  public async save() {
    const { $oid } = await userCollection.insertOne(this);
    console.log($oid);
    this.id = $oid;
  }
}