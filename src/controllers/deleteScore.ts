import { scores } from "../helpers/dbconnect.ts";
import { Response} from "../deps.ts"

// @description: DELETE single score
// @route DELETE /api/score/delete/:id
// deno-lint-ignore no-explicit-any
export async function deleteScore(context: any) {
  const params = context.params
  const response : Response = context.response;

    try {
        await scores.deleteOne({ _id: params.id });
        response.status = 201;
        response.body = {
          success: true,
          msg: "Score deleted"
        };
      } catch (err) {
        response.body = {
          success: false,
          msg: err.toString()
        };
      }
}