import { Context, Status } from './deps.ts';

export function auth(context: Context<Record<string, unknown>>, next: () => Promise<unknown>) {
    const auth = context.request.headers.get("Authorization")?.replace("Basic ", "");
    const response = context.response;

    if (!auth) {
        response.status = Status.Unauthorized;
        response.body = { message: "Unauthorized" };

        return;
    }

    if (Deno.env.get('AUTH_SECRET') !== auth) {
        response.status = Status.Unauthorized;
        response.body = { message: "Wrong username and password" };

        return;
    }

    return next();
}