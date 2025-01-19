import { z } from "zod";

const LapSchema = z.object({
  id: z.number(),
  resource_state: z.number(),
  name: z.string(),
  activity: z.object({
    id: z.number(),
    visibility: z.enum(["everyone", "followers", "only_me"]),
    resource_state: z.number(),
  }),
  athlete: z.object({
    id: z.number(),
    resource_state: z.number(),
  }),
  elapsed_time: z.number(),
  moving_time: z.number(),
  start_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start date",
  }),
  start_date_local: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start date local",
  }),
  distance: z.number(),
  average_speed: z.number(),
  max_speed: z.number(),
  lap_index: z.number(),
  split: z.number(),
  start_index: z.number(),
  end_index: z.number(),
  total_elevation_gain: z.number(),
  average_cadence: z.number(),
  device_watts: z.boolean(),
  average_watts: z.number(),
  average_heartrate: z.number(),
  max_heartrate: z.number(),
  pace_zone: z.number(),
});

export type Lap = z.infer<typeof LapSchema>;
