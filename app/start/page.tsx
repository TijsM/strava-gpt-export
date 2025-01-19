"use client";

import { ActivitiesTable } from "@/components/ActivitiesTable";
import { ExportSection } from "@/components/ExportSection";
import { useLogPageView } from "@/lib/analytics/posthog";
import { useActivitiesStore } from "@/stores/activitiesStore";
import { useEffect } from "react";

import { styled } from "styled-components";

const StartPage = () => {
  useLogPageView();

  const { fetchActivities } = useActivitiesStore();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <StContainer>
      <ActivitiesTable />
      <ExportSection />
    </StContainer>
  );
};

export default StartPage;

const StContainer = styled.div`
  overflow: scroll;
  max-height: 100vh;
`;
