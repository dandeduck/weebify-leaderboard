import { scores } from "../helpers/dbconnect.ts";
import { Status, RouterContext } from "../deps.ts"

// @description: DELETE single score
// @route DELETE /api/score/delete/:id
export async function deleteScore(context: RouterContext) {
  const params = context.params
  const response  = context.response;

    try {
        await scores.deleteOne({ _id: params.id });
        response.status = Status.Created;
        response.body = {
          success: true,
          message: "Score deleted"
        };
      } catch (err) {
        response.body = {
          success: false,
          message: err.toString()
        };
      }
}