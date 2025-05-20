"use server";

import { AiForm } from "@/components/AiForm";

export default async function Page() {
  return <AiForm url="/api/openai" />;
}
