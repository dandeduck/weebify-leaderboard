import { Router } from "./deps.ts"
import { deleteScore } from "./controllers/deleteScore.ts";
import { getTopScores } from "./controllers/getTopScores.ts";
import { putScore } from "./controllers/putScore.ts";

const router = new Router()
    .get("/api/scores/top/:limit", getTopScores)
    .put("/api/scores/put/", putScore)
    .delete("/api/scores/delete/:id", deleteScore);

export default router;
