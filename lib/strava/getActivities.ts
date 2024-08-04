"use server";

import { checkStravaResponseStatus } from "./authGuard";

export const getActivities = async (token: string) => {
  const params = new URLSearchParams();
  //   {
  //   before: "2024-08-04T06:30:00Z",
  //   after: "2022-08-04T06:30:00Z",
  // }

  const url = `https://www.strava.com/api/v3/activities?${params.toString()}`;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const options: RequestInit = {
    headers,
  };

  const response = await fetch(url, options);

  // if (!response.ok) {
  //   checkStravaResponseStatus(response);
  // }

  const json = await response.json();
  console.log("json", json);
  return json;
};
