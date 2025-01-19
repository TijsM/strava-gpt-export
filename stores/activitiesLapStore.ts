import { getStravaCode } from "@/lib/strava-auth/auth-storage";
import { getLapsForActivity } from "@/lib/strava/getLapsForActivity";
import { Lap } from "@/schemas/lap.schema";
import { create } from "zustand";

interface ActivitiesState {
  activityIdsWithLaps: string[];
  laps: Lap[];
  loadLapsForActivity: (activityId: string) => void;
  loading?: boolean;
}

export const useActivitiesLapStore = create<ActivitiesState>((set) => ({
  activityIdsWithLaps: [],
  laps: [],
  loadLapsForActivity: async (id: string) => {
    set({ loading: true });
    const stravaAuthToken = getStravaCode()?.access_token;

    if (!stravaAuthToken) {
      set({ loading: false });
      return;
    }

    try {
      const laps = await getLapsForActivity({
        activityId: id,
        token: stravaAuthToken,
      });

      set((state) => ({
        laps: [...state.laps, ...laps],
        activityIdsWithLaps: [...state.activityIdsWithLaps, id],
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching activities:", error);
      set({ loading: false });
    }
  },
}));
