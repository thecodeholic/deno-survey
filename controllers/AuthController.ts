import {
  RouterContext,
  makeJwt,
  Jose,
  Payload,
  setExpiration,
} from "../deps.ts";
import { userCollection } from "../mongo.ts";
import { hashSync, compareSync } from "../deps.ts";
import User from "../models/User.ts";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};
export class AuthController {
  async register(ctx: RouterContext) {
    const { value: { name, email, password } } = await ctx.request.body();

    let user = await User.findOne({ email });
    if (user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Email is already used" };
      return;
    }
    const hashedPassword = hashSync(password);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    ctx.response.status = 201;
    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
  async login(ctx: RouterContext) {
    const { value: { email, password } } = await ctx.request.body();
    if (!email || !password) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Please provide email and password" };
      return;
    }
    let user = await User.findOne({ email });
    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Incorrect email" };
      return;
    }
    if (!compareSync(password, user.password)) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Incorrect password" };
      return;
    }

    const payload: Payload = {
      iss: user.email,
      exp: setExpiration(
        Date.now() + parseInt(Deno.env.get("JWT_EXP_DURATION") || "0"),
      ),
    };
    const jwt = makeJwt(
      { key: Deno.env.get("JWT_SECRET_KEY") || "", payload, header },
    );

    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      jwt,
    };
  }
}

export default new AuthController();
