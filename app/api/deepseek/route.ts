import { NextRequest } from "next/server";
import { getTrainingSchemaFromDeepseek } from "@/lib/deepseek/getTrainingSchemaFromDeepseek";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const stream = await getTrainingSchemaFromDeepseek(body);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
