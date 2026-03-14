import { anthropic } from "@/lib/anthropic";
import { buildSystemPrompt } from "@/lib/sql-prompts";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teradata_sql, source_system = "Teradata", target_system = "Snowflake" } = body ?? {};
    const sourceSQL: string = teradata_sql ?? "";

    if (!sourceSQL.trim()) {
      return new Response(JSON.stringify({ error: "No SQL provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (sourceSQL.length > 50000) {
      return new Response(JSON.stringify({ error: "SQL too large (max 50,000 characters)" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: buildSystemPrompt(source_system, target_system),
      messages: [
        {
          role: "user",
          content: `Convert this ${source_system} SQL to ${target_system} SQL:\n\n${sourceSQL}`,
        },
      ],
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
