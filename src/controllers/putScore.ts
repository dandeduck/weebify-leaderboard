import { scores } from "../helpers/dbconnect.ts";
import { Score } from "../helpers/Score.ts";
import { Request, Context, Status } from "../deps.ts";

// @description: PUT single score
// @route PUT /api/score/put/
export async function putScore(context: Context<Record<string, unknown>>) {
    const request : Request = context.request;
    const response = context.response;

    try {
        if (!request.hasBody) { 
            response.status = Status.BadRequest;
            response.body = {
              success: false,
              message: "No Data",
            };
        } else {
            const body = request.body();
            const score = await body.value;
            const place = await insertOrUpdateScore(score);

            response.status = Status.Created;
            response.body = {
                success: true,
                place: place
            };
        }
    } catch (err) {
        response.body = {
            success: false,
            message: err.stack
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