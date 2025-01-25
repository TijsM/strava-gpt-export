"use server";

import { checkStravaResponseStatus } from "../strava-auth/authGuard";
import { Zone } from "@/schemas/zone.schema";

type SearchActivitiesParams = {
  token: string;
  activityId: string;
};

export const getZonesForActivity = async ({
  activityId,
  token,
}: SearchActivitiesParams): Promise<Zone[]> => {
  const url = `https://www.strava.com/api/v3/activities/${activityId}/zones`;

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
