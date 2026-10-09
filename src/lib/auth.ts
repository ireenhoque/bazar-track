
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_STANDARD_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_STANDARD_URL is missing from environment variables");
}

const client = new MongoClient(mongoUrl);

const db = client.db("bazar-track_bd");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});