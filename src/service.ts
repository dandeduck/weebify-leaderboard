import "https://deno.land/x/dotenv@v2.0.0/load.ts";
import { Application } from "./deps.ts"
import router from "./routs.ts"

const PORT = +(Deno.env.get('PORT') ?? 8080);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on PORT: ${PORT}`)
await app.listen({ port: PORT });
