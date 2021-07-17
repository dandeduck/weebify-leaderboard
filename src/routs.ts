import { Router } from "./deps.ts"

const router = new Router()
    .get("/api/scores/top/:limit", getTopScores)
    .put("/api/scores/:id", updateScore)
    .delete("/api/scores/:id", deleteScore);

export default router;
