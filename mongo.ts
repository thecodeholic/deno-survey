import {MongoClient} from "./deps.ts";

const client = new MongoClient();
client.connectWithUri(Deno.env.get('MONGODB_URI') || '');

const db = client.database("deno_survey_db");
export default db;

export const userCollection = db.collection("users");
export const surveyCollection = db.collection("surveys");
