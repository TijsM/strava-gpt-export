"use server";

import { checkStravaResponseStatus } from "../strava-auth/authGuard";
import { Stream } from "@/schemas/stream.schema";

type SearchActivitiesParams = {
  token: string;
  activityId: string;
};

export const getStreamsForActivity = async ({
  activityId,
  token,
}: SearchActivitiesParams): Promise<Stream> => {
  const params = new URLSearchParams({
    key_by_type: "true",
    resolution: "low",
    keys: "altitude,heartrate,watts,velocity_smooth",
  });

  const url = `https://www.strava.com/api/v3/activities/${activityId}/streams?${params.toString()}`;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const options: RequestInit = {
    headers,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    checkStravaResponseStatus(response);
  }

  const json = await response.json();
  return json;
};
