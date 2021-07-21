import { scores } from "../helpers/dbconnect.ts";
import { Score } from "../helpers/Score.ts";
import { Request, Response, RouterContext } from "../deps.ts";

// @description: PUT single score
// @route PUT /api/score/put/
export async function putScore(context: RouterContext) {
    const request : Request = context.request;
    const response : Response = context.response;

    try {
        if (!request.hasBody) { 
            response.status = 400;
            response.body = {
              success: false,
              msg: "No Data",
            };
        } else {
            const body = await request.body();
            const score = await body.value;
            const place = await insertOrUpdateScore(score);

            response.status = 201;
            response.body = {
                success: true,
                place: place
            };
        }
    } catch (err) {
        response.body = {
            success: false,
            msg: err.stack
        };
    }
}

async function insertOrUpdateScore(updatedScore: Score) : Promise<number> {
    const existingScore = await scores.findOne({_id: updatedScore._id});

    if (existingScore) {
        if (existingScore.score != updatedScore.score) {
            await scores.deleteOne(existingScore);
            await scores.insertOne(updatedScore);
        }
    } else {
        await scores.insertOne(updatedScore);
    }

    return (await scores
        .find({score: {$gte: updatedScore.score}})
        .sort({score: -1})
        .toArray()).length
}