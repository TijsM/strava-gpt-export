import {
  StravaActivity,
  supportedActivityTypes,
} from "@/schemas/strava.schema";
import styled from "styled-components";
import { Stat } from "./Stat";
import html2canvas from "html2canvas";
import { useMemo, useRef } from "react";
import { Filter } from "./Filter";
import {
  getAmountOfActivities,
  getAverageHeartRate,
  getAverageSpeed,
  getTotalDistance,
  getTotalElevationGain,
  getTotalTime,
} from "@/lib/calculateStats";
import { logEvent } from "@/lib/analytics/posthog";
import { useDarkModeStore } from "@/stores/darkModeStore";
import { useFilterStore } from "@/stores/filterStore";

type StatsProps = {
  activities: StravaActivity[];
  loading: boolean;
};

export const Stats = ({ activities, loading }: StatsProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkModeStore((state) => state.isDark);

  const selectedActivity = useFilterStore((state) => state.selectedActivity);

  const filteredActivities = useMemo(() => {
    if (!activities) {
      return [];
    }
    return activities.filter((activity) => activity.type === selectedActivity);
  }, [activities, selectedActivity]);

  if (loading) {
    return (
      <StStatContainer selectedTextColor={isDark ? "white" : "black"}>
        Loading...
      </StStatContainer>
    );
  }

  if (!activities?.length) {
    return (
      <StStatContainer selectedTextColor={isDark ? "white" : "black"}>
        No activities loading
      </StStatContainer>
    );
  }

  const exportAsImage = async () => {
    logEvent({
      action: "click",
      name: "export_image",
    });

    if (frameRef.current) {
      const canvas = await html2canvas(frameRef.current, {
        backgroundColor: null,
        scale: 4,
      });
      const link = document.createElement("a");
      link.download = "strava-2024.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <StStatContainer selectedTextColor={isDark ? "white" : "black"}>
      <Filter activityTypes={supportedActivityTypes} />
      <StFrame ref={frameRef}>
        <StStats>
          <Stat label="Distance" value={getTotalDistance(filteredActivities)} />
          <Stat label="Time" value={getTotalTime(filteredActivities)} />
          <Stat
            label="Average heart rate"
            value={getAverageHeartRate(filteredActivities)}
          />
          <Stat
            label="Activities"
            value={getAmountOfActivities(filteredActivities)}
          />
          {/* <Stat label="Kudos" value={getTotalKudos(filteredActivities)} /> */}
          <Stat
            label="Elevation gain"
            value={getTotalElevationGain(filteredActivities)}
          />
          <Stat
            label="Average speed"
            value={getAverageSpeed(filteredActivities, selectedActivity)}
          />
        </StStats>
        <StDisclaimer>Get yours at tijsmartens.be/strava</StDisclaimer>
      </StFrame>
      <ExportButton onClick={exportAsImage}>Export as PNG</ExportButton>{" "}
    </StStatContainer>
  );
};

const StStatContainer = styled.div<{ selectedTextColor: string }>`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
  background-color: ${(props) =>
    props.selectedTextColor === "black" ? "white" : "black"};
`;

const StStats = styled.div`
  display: grid;
  padding: 24px;
  padding-bottom: 0px;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const StFrame = styled.div``;

const ExportButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #fc4c02;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #aa3300;
  }
`;

const StDisclaimer = styled.div`
  margin-top: 16px;
  font-size: 6px;
  color: #3d3d3d;
  text-align: center;
`;
