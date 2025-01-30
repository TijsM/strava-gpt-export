import { StravaActivity } from "./activity.schema";
import { Zone } from "./zone.schema";

export type EnrichedActivity = Partial<StravaActivity> & {
  laps: Partial<StravaActivity>[];
  zones: Partial<Zone>[];
};
