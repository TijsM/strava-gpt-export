import { create } from "zustand";
import { StravaActivity } from "@/schemas/activity.schema";
import { searchActivities } from "@/lib/strava/searchActivities";
import { getStravaCode } from "@/lib/strava-auth/auth-storage";

interface ActivitiesState {
  activities: StravaActivity[];
  filteredActivities: StravaActivity[];
  loading: boolean;
  fetchActivities: () => Promise<void>;
}

const isInPeriod = (dateStr: string, monthsAgo: number) => {
  const activityDate = new Date(dateStr);
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - monthsAgo);
  return activityDate > cutoff;
};

const getWeeklyStats = (
  activities: StravaActivity[],
  monthsAgo: number
): { hours: number; sessionsPerWeek: number } => {
  const filtered = activities.filter((a) =>
    isInPeriod(a.start_date, monthsAgo)
  );

  const totalHours = filtered.reduce(
    (acc, a) => acc + Number(a.moving_time) / 3600,
    0
  );
  const weeks = monthsAgo * 4.34524; // average weeks per month
  return {
    hours: totalHours,
    sessionsPerWeek: filtered.length / weeks,
  };
};

export const useActivitiesStore = create<ActivitiesState>((set) => ({
  activities: [],
  filteredActivities: [],
  loading: false,
  fetchActivities: async () => {
    set({ loading: true });
    const stravaAuthToken = getStravaCode()?.access_token;

    if (!stravaAuthToken) {
      set({ loading: false });
      return;
    }

    try {
      const activities = await searchActivities({
        token: stravaAuthToken,
        before: new Date(),
        after: new Date(2024, 0, 31),
      });
      const filteredActivities = activities.filter((activity) =>
        ["Run", "Ride", "Swim"].includes(activity.type)
      );
      set({ activities, filteredActivities, loading: false });
    } catch (error) {
      console.error("Error fetching activities:", error);
      set({ loading: false });
    }
  },
}));
