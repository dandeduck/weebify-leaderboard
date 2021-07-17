import { MongoClient } from '../deps.ts';
import { Score } from "./Score.ts";


const URI = Deno.env.get('MONGO_URI') ?? 'none';

const client = new MongoClient();

try {
    console.log('before connecting to ', URI);
    await client.connect(URI);
    console.log("Database successfully connected");
} catch (err) {
    console.log(err);
}

const db = client.database("weebify"); 
export const scores = db.collection<Score>("scores");

