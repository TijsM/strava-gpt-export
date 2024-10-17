import { ActivityType } from "@/schemas/strava.schema";
import { create } from "zustand";

interface FilterState {
  selectedActivity: ActivityType;
  changeSelectedActivity: (activityType: ActivityType) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedActivity: "Run",
  changeSelectedActivity: (activityType) => {
    set({ selectedActivity: activityType });
  },
}));
