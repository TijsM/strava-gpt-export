"use client";

import { getStravaCode } from "@/lib/strava/auth-storage";
import { getActivities } from "@/lib/strava/getActivities";
import { searchActivities } from "@/lib/strava/searchActivities";
import { useEffect } from "react";

export const StartPage = () => {
  useEffect(() => {
    const startFetch = async () => {
      const stravaAuthToken = getStravaCode()?.access_token;

      if (!stravaAuthToken) {
        return;
      }

      const activities = await searchActivities({
        token: stravaAuthToken,
        before: new Date(2024, 11, 31),
        after: new Date(2024, 0, 31),
      });

      console.log("activities", activities);
    };

    startFetch();
  }, []);

  return <div>Start page</div>;
};

export default StartPage;
