import { Application } from "./deps.ts";
import router from "./router.ts";

const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
});

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

// register some middleware

await app.listen({port: 8000})