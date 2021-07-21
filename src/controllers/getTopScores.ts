import { Status, RouterContext } from "../deps.ts";
import { scores } from "../helpers/dbconnect.ts";

// @description: GET top scores
// @route GET /api/scores/top/
export async function getTopScores(context: RouterContext) {
    const MAX_LIMIT = 100;
    const response = context.response;
    
    let limit = +(context.params.limit || 0);
    limit = Math.min(Math.max(limit, 1), MAX_LIMIT)
    
    const topScores = await scores.find({}).sort({score: -1}).limit(limit).toArray();

    if (topScores) {
        response.status = Status.OK;
        response.body = {
            success: true,
            data: topScores
        };
    } else {
        response.status = Status.InternalServerError;
        response.body = {
            success: false,
            message: "Could not get top scores",
        };       
    }
}