import { client } from "@/lib/auth";

export async function GET() {
  try {
    await client.db("bazar-track_bd").command({ ping: 1 });

    return Response.json({
      ok: true,
      database: "reachable",
    });
  } catch (error) {
    console.error("MongoDB diagnostic failed:", error);

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
  }
}