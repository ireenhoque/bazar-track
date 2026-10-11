
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_STANDARD_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_STANDARD_URL is missing");
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

const appUrl =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";

// Reuse the MongoDB client and connection promise
// across requests in the same server runtime.
const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
  mongoClientPromise?: Promise<MongoClient>;
};

const client =
  globalForMongo.mongoClient ??
  new MongoClient(mongoUrl, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  });

globalForMongo.mongoClient = client;

const clientPromise =
  globalForMongo.mongoClientPromise ??
  client.connect().catch((error) => {
    if (globalForMongo.mongoClient === client) {
      globalForMongo.mongoClient = undefined;
    }

    globalForMongo.mongoClientPromise = undefined;

    throw error;
  });

globalForMongo.mongoClientPromise = clientPromise;

// Ensure MongoDB connects before initializing Better Auth.
await clientPromise;

const db = client.db("bazar-track_bd");

export const auth = betterAuth({
  baseURL: appUrl,

  trustedOrigins: [
    appUrl,
    ...(process.env.NEXT_PUBLIC_APP_URL
      ? [process.env.NEXT_PUBLIC_APP_URL]
      : []),
  ],

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      disableImplicitLinking: false,
      requireLocalEmailVerified: false,
    },
  },

  socialProviders: {
    ...(googleClientId && googleClientSecret
      ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      }
      : {}),

    ...(githubClientId && githubClientSecret
      ? {
        github: {
          clientId: githubClientId,
          clientSecret: githubClientSecret,
        },
      }
      : {}),
  },
});