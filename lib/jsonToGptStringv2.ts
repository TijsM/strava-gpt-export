type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

export function jsonToGptStringv2(data: any): string {
  if (typeof data === "string") return data;
  if (typeof data === "number" || typeof data === "boolean")
    return String(data);
  if (Array.isArray(data)) return `[${data.map(jsonToGptStringv2).join(",")}]`;

  if (typeof data === "object" && data !== null) {
    return `{${Object.entries(data)
      .map(([key, value]) => `${key}:${jsonToGptStringv2(value)}`)
      .join(",")}}`;
  }

  return ""; // Handle null or undefined
}
