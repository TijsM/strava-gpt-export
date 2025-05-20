import { NextRequest } from "next/server";
import { getTrainingSchemaFromOpenAI } from "@/lib/openAi/getTrainingSchemaFromOpenAi";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const stream = await getTrainingSchemaFromOpenAI(body);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
