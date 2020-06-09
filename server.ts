import { Application, send } from "./deps.ts";
import router from "./router.ts";
import { staticFileMiddleware } from "./middleware/staticFileMiddleware.ts";

const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

// register some middleware
app.use(staticFileMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
