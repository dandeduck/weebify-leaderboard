import { Router } from "./deps.ts"
import { deleteScore } from "./controllers/deleteScore.ts";
import { getTopScores } from "./controllers/getTopScores.ts";
import { putScore } from "./controllers/putScores.ts";

const router = new Router()
    .get("/:dick", log)
    .get("/api/scores/top/:limit", getTopScores)
    .put("/api/scores/put/", putScore)
    .delete("/api/scores/delete/:id", deleteScore);

export default router;


function log(context: any) {
    console.log(context);
    context.response.body = context.params['dick'];
}