import { Response, RouterContext } from "../deps.ts";
import { scores } from "../helpers/dbconnect.ts";

// @description: GET top scores
// @route GET /api/scores/top/
export async function getTopScores(context: RouterContext) : Promise<void> {
    const MAX_LIMIT = 100;
    const response: Response = context.response;
    
    let limit = +(context.params.limit || 0);
    limit = Math.min(Math.max(limit, 1), MAX_LIMIT)
    
    const topScores = await scores.find({}).sort({score: -1}).limit(limit).toArray();

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