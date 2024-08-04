"use client";

import { getStravaCode } from "@/lib/strava/auth-storage";
import { getActivities } from "@/lib/strava/getActivities";
import { useEffect } from "react";

export const StartPage = () => {
  useEffect(() => {
    const startFetch = async () => {
      const stravaAuthToken = getStravaCode()?.access_token;

      if (!stravaAuthToken) {
        return;
      }

      const activities = await getActivities(stravaAuthToken);
      console.log("activities", activities);
    };

    startFetch();
  }, []);

  return <div>Start page</div>;
};

export default StartPage;
