"use client";

import { ActivitiesTable } from "@/components/ActivitiesTable";
import { ExportSection } from "@/components/ExportSection";
import { useLogPageView } from "@/lib/analytics/posthog";
import { getStravaCode } from "@/lib/strava-auth/auth-storage";
import { searchActivities } from "@/lib/strava/searchActivities";
import { StravaActivity } from "@/schemas/strava.schema";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

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
        before: new Date(),
        after: new Date(2024, 0, 31),
      });

      setLoading(false);
      setActivities(activities);
    };

    startFetch();
  }, []);

  return (
    <StContainer>
      <ActivitiesTable loading={loading} activities={activities} />
      <ExportSection loading={loading} activities={activities} />
    </StContainer>
  );
};

export default StartPage;

const StContainer = styled.div`
  overflow: scroll;
  max-height: 100vh;
`;
