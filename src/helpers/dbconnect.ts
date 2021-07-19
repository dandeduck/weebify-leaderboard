import { MongoClient, ConnectOptions } from '../deps.ts';
import { Score } from "./Score.ts";

const connString = Deno.env.get('MONGO_CONN') ?? '{}';
const CONN : ConnectOptions = JSON.parse(connString);

const client = new MongoClient();

try {
    console.log('trying to connect to ', CONN);
    await client.connect(CONN);
    console.log("Database successfully connected");
} catch (err) {
    console.log(err);
}

const db = client.database("weebify"); 
export const scores = db.collection<Score>("scores");
