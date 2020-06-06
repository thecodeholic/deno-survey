import {send, Context} from "../deps.ts";
import {fileExists} from "../helpers.ts";

export const staticFileMiddleware = async (context: Context, next: Function) => {
  const path = `${Deno.cwd()}/public${context.request.url.pathname}`;
  if (await fileExists(path)) {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/public`,
    });
  } else {
    await next();
  }
}