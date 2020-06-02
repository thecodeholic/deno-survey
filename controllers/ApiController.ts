import { RouterContext } from "../deps.ts";
import { userCollection } from "../mongo.ts";
import { hashSync, compareSync } from "../deps.ts";
import User from "../models/User.ts";


export class ApiController {
  async register(ctx: RouterContext) {
    const { value: { name, email, password } } = await ctx.request.body();
    const hashedPassword = hashSync(password);
    const user = new User(name, email, hashedPassword);
    const { $oid } = await userCollection.insertOne(user);
    user.id = $oid;
    ctx.response.status = 201;
    ctx.response.body = user;
  }
  async login(ctx: RouterContext) {
    const { value } = await ctx.request.body();
    console.log(value);
  }
}

export default new ApiController();