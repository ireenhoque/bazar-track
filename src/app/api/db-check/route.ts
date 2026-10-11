
import { MongoClient } from "mongodb";

export async function GET() {
  const uri = process.env.MONGODB_STANDARD_URL;

  if (!uri) {
    return Response.json(
      { ok: false, error: "MONGODB_STANDARD_URL is missing" },
      { status: 500 }
    );
  }

  const testClient = new MongoClient(uri);

  try {
    await testClient.connect();
    await testClient.db("bazar-track_bd").command({ ping: 1 });

    return Response.json({
      ok: true,
      database: "reachable",
    });
  } catch (error) {
    console.error("Fresh MongoDB connection test failed:", error);

    return Response.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown MongoDB error",
      },
      { status: 500 }
    );
  } finally {
    await testClient.close().catch(() => {});
  }
}
