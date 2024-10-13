"use server";

import { checkStravaResponseStatus } from "../strava-auth/authGuard";

export const getActivities = async (token: string) => {
  const params = new URLSearchParams();

  const url = `https://www.strava.com/api/v3/activities?${params.toString()}`;

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
