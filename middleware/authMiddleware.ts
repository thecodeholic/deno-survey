import {RouterContext, validateJwt} from "../deps.ts";

export const authMiddleware = async (ctx: RouterContext, next: Function) => {
  const headers: Headers = ctx.request.headers;

  const authorization = headers.get('Authorization')
  if (!authorization) {
    ctx.response.status = 401;
    return;
  }
  const jwt = authorization.split(' ')[1];
  if (!jwt) {
    ctx.response.status = 401;
    return;
  }
  console.log(jwt);
  const data = await validateJwt(jwt || '', Deno.env.get('JWT_SECRET_KEY') || '', {isThrowing: false})
  if (data) {
    await next();
  } else {
    ctx.response.status = 401;
  }
}