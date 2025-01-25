import { getStravaCode } from "@/lib/strava-auth/auth-storage";
import { getZonesForActivity } from "@/lib/strava/getZonesForActivity";
import { Zone } from "@/schemas/zone.schema";
import { create } from "zustand";

export type ZoneWithId = Zone & {
  activityId: string;
};

interface ZonesState {
  activityIdsWithZones: string[];
  zones: ZoneWithId[];
  loadZonesForActivity: (activityId: string) => void;
  loading?: boolean;
}

export const useActivitiesZonesStore = create<ZonesState>((set) => ({
  activityIdsWithZones: [],
  zones: [],
  loadZonesForActivity: async (id: string) => {
    set({ loading: true });
    const stravaAuthToken = getStravaCode()?.access_token;

    if (!stravaAuthToken) {
      set({ loading: false });
      return;
    }

    try {
      const zones = await getZonesForActivity({
        activityId: id,
        token: stravaAuthToken,
      });

      const zonesWithActivityId: ZoneWithId[] = zones.map((zone) => {
        return {
          ...zone,
          activityId: id,
        };
      });

      set((state) => ({
        zones: [...state.zones, ...zonesWithActivityId],
        activityIdsWithZones: [...state.activityIdsWithZones, id],
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching activities:", error);
      set({ loading: false });
    }
  },
}));
