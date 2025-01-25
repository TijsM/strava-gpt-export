import { z } from "zod";

const DistributionBucketSchema = z.object({
  min: z.number(),
  max: z.number(),
  time: z.number(),
});

const ZoneSchema = z.object({
  score: z.number().optional(),
  distribution_buckets: z.array(DistributionBucketSchema),
  type: z.string(),
  resource_state: z.number(),
  sensor_based: z.boolean(),
  points: z.number().optional(),
  custom_zones: z.boolean().optional(),
});

export type Zone = z.infer<typeof ZoneSchema>;
