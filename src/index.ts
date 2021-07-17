import "./deps.ts"
import { Application } from "./deps.ts"
import router from "./routs.ts"

const PORT = +(Deno.env.get('PORT') ?? 8080);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({ port: PORT });
console.log(`Listening on PORT: ${PORT}`)
