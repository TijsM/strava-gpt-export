"use server";

import { Lap } from "@/schemas/lap.schema";
import { checkStravaResponseStatus } from "../strava-auth/authGuard";

type SearchActivitiesParams = {
  token: string;
  activityId: string;
};

export const getLapsForActivity = async ({
  activityId,
  token,
}: SearchActivitiesParams): Promise<Lap[]> => {
  const url = `https://www.strava.com/api/v3/activities/${activityId}/laps`;

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
