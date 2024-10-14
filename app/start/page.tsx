"use client";

import { Stats } from "@/components/Stats";
import { useLogPageView } from "@/lib/analytics/posthog";
import { getStravaCode } from "@/lib/strava-auth/auth-storage";
import { searchActivities } from "@/lib/strava/searchActivities";
import { StravaActivity } from "@/schemas/strava.schema";
import { useEffect, useState } from "react";

const StartPage = () => {
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [loading, setLoading] = useState(false);

  useLogPageView();

  useEffect(() => {
    const startFetch = async () => {
      setLoading(true);
      const stravaAuthToken = getStravaCode()?.access_token;

      if (!stravaAuthToken) {
        setLoading(false);
        return;
      }

      const activities = await searchActivities({
        token: stravaAuthToken,
        before: new Date(2024, 11, 31),
        after: new Date(2024, 0, 31),
      });

      setLoading(false);
      setActivities(activities);
    };

    startFetch();
  }, []);

  return <Stats activities={activities} loading={loading} />;
};

export default StartPage;
