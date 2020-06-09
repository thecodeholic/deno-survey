import { send, Context } from "../deps.ts";
import { fileExists } from "../helpers.ts";

export const staticFileMiddleware = async (
  context: Context,
  next: Function,
) => {
  const path = `${Deno.cwd()}/assets${context.request.url.pathname}`;
  if (await fileExists(path)) {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/assets`,
    });
  } else {
    await next();
  }
};
