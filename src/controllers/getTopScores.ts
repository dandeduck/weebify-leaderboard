import { scores } from "../helpers/dbconnect.ts";

// @description: GET top scores
// @route GET /api/scores/top/
// deno-lint-ignore no-explicit-any
export async function getTopScores(context: any) : Promise<void> {
    const MAX_LIMIT = 100;
    const params = context.params;
    const response = context.response;

    params.limit = params.limit ?? 10;
    params.limit = Math.min(Math.max(params.limit, 1), MAX_LIMIT)
    
    const topScores = await scores.find({}).sort({score: -1}).limit(params.limit).toArray();

    if (topScores) {
        response.status = 200;
        response.body = {
            success: true,
            data: topScores
        };
    } else {
        response.status = 500;
        response.body = {
            success: false,
            msg: "Could not get top scores",
        };       
    }
}