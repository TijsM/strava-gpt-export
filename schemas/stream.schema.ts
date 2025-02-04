import { z } from "zod";

const streamSeriesSchema = z.object({
  data: z.array(z.number()),
  series_type: z.literal("distance"),
  original_size: z.number(),
  resolution: z.literal("low"),
});

const schema = z.record(z.string(), streamSeriesSchema);

export type Stream = z.infer<typeof schema>;
export type StreamSeries = z.infer<typeof streamSeriesSchema>;  
