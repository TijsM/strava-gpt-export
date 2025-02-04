import { getStravaCode } from "@/lib/strava-auth/auth-storage";
import { getStreamsForActivity } from "@/lib/strava/getStreamsForActivity";
import { Stream, StreamSeries } from "@/schemas/stream.schema";
import { create } from "zustand";

export type StreamWithId = StreamSeries & {
  activityId: string;
};

interface StreamsState {
  activityIdsWithStreams: string[];
  streams: StreamWithId[];
  loadStreamsForActivity: (activityId: string) => void;
  loading?: boolean;
}

export const useActivitiesStreamsStore = create<StreamsState>((set) => ({
  activityIdsWithStreams: [],
  streams: [],
  loadStreamsForActivity: async (id: string) => {
    set({ loading: true });
    const stravaAuthToken = getStravaCode()?.access_token;

    if (!stravaAuthToken) {
      set({ loading: false });
      return;
    }

    try {
      const streams = await getStreamsForActivity({
        activityId: id,
        token: stravaAuthToken,
      });

      console.log("streams response", streams);

      const streamsWithActivityId: StreamWithId[] = Object.keys(streams).map(
        (stream) => {
          return {
            ...streams[stream],
            activityId: id,
          } as StreamWithId;
        }
      );

      set((state) => ({
        streams: [...state.streams, ...streamsWithActivityId],
        activityIdsWithStreams: [...state.activityIdsWithStreams, id],
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching activities:", error);
      set({ loading: false });
    }
  },
}));
