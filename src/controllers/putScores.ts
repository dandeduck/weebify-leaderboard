import { scores } from "../helpers/dbconnect.ts";
import { Score } from "../helpers/Score.ts";

// @description: PUT single score
// @route PUT /api/score/put/
// deno-lint-ignore no-explicit-any
export async function putScore(request: any, response: any) {
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
                data: place
            };
        }
    } catch (err) {
        response.body = {
            success: false,
            msg: err.toString()
        };
    }
}

async function insertOrUpdateScore(updatedScore: Score) : Promise<number> {
    const existingScore = await scores.findOne({_id: updatedScore._id});

    if (existingScore) {
        await scores.updateOne(existingScore, updatedScore);
    } else {
        await scores.insertOne(updatedScore);
    }

    return (await scores
        .find({score: {$gte: updatedScore.score}})
        .sort({score: -1}).toArray()).length
}