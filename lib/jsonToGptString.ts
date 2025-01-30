type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

export function jsonToGptString(input: JsonValue, depth = 0): string {
  const indent = "  ".repeat(depth);

  if (input === null || input === undefined) return "";
  if (typeof input !== "object") return formatPrimitive(input);

  if (Array.isArray(input)) {
    return input
      .map((item, index) => {
        const value = jsonToGptString(item, depth + 1);
        return value ? `${indent}${index + 1}: ${value}` : "";
      })
      .filter(Boolean)
      .join("\n");
  }

  return Object.entries(input)
    .map(([key, value]) => {
      if (!value && value !== 0 && value !== false) return ""; // Skip empty values
      const formattedValue = jsonToGptString(value, depth + 1);

      // Special formatting for common patterns
      if (typeof value === "object") {
        return formattedValue ? `${indent}${key}:\n${formattedValue}` : "";
      }

      return `${indent}${key}: ${formattedValue}`;
    })
    .filter(Boolean)
    .join("\n");
}

function formatPrimitive(value: JsonPrimitive): string {
  if (typeof value === "string") {
    // Detect and format ISO dates
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) {
      return formatISODate(value);
    }
    return value.replace(/\s+/g, "_"); // Replace spaces for compactness
  }
  if (typeof value === "number") {
    // Remove unnecessary decimal points
    return value % 1 === 0 ? value.toString() : value.toFixed(2);
  }
  return value?.toString() ?? "";
}

function formatISODate(isoString: string): string {
  const date = new Date(isoString);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}
