import { create } from "zustand";

interface ActivitiesState {
  selectedActivities: string[];
  selectMany: (activities: string[]) => void;
  unselectAll: () => void;
  toggleSelection: (id: string) => void;
}

export const useActivitiesStore = create<ActivitiesState>((set) => ({
  selectedActivities: [],
  selectMany: (activities) => {
    set({
      selectedActivities: activities,
    });
  },
  unselectAll: () => {
    set({ selectedActivities: [] });
  },
  toggleSelection: (id) => {
    set((state) => {
      const isSelected = state.selectedActivities.includes(id);
      return {
        selectedActivities: isSelected
          ? state.selectedActivities.filter((activityId) => activityId !== id)
          : [...state.selectedActivities, id],
      };
    });
  },
}));
