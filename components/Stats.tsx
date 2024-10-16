import {
  ActivityType,
  StravaActivity,
  supportedActivityTypes,
} from "@/schemas/strava.schema";
import styled from "styled-components";
import { Stat } from "./Stat";
import html2canvas from "html2canvas";
import { useMemo, useRef, useState } from "react";
import { Filter } from "./Filter";
import {
  getAmountOfActivities,
  getAverageHeartRate,
  getAverageSpeed,
  getTotalDistance,
  getTotalElevationGain,
  getTotalKudos,
  getTotalTime,
} from "@/lib/calculateStats";
import { logEvent } from "@/lib/analytics/posthog";

type StatsProps = {
  activities: StravaActivity[];
  loading: boolean;
};

const supportedColors = ["black", "white"];

export const Stats = ({ activities, loading }: StatsProps) => {
  const frameRef = useRef<HTMLDivElement>(null);

  const [selectedActivity, setSelectedActivity] = useState<ActivityType>(
    supportedActivityTypes[0]
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    supportedColors[0]
  );

  const filteredActivities = useMemo(() => {
    if (!activities) {
      return [];
    }
    return activities.filter((activity) => activity.type === selectedActivity);
  }, [activities, selectedActivity]);

  if (loading) {
    return (
      <StStatContainer selectedTextColor={selectedColor}>
        Loading...
      </StStatContainer>
    );
  }

  if (!activities?.length) {
    return (
      <StStatContainer selectedTextColor={selectedColor}>
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
      });
      const link = document.createElement("a");
      link.download = "strava-2024.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <StStatContainer selectedTextColor={selectedColor}>
      <Filter
        activityTypes={supportedActivityTypes}
        onSelectActivityType={setSelectedActivity}
        selectedActivity={selectedActivity}
        supportedColors={supportedColors}
        onSelectColor={setSelectedColor}
        currentColor={selectedColor}
      />
      <StFrame ref={frameRef}>
        <Stat
          selectedTextColor={selectedColor}
          label="Distance"
          value={getTotalDistance(filteredActivities)}
        />
        <Stat
          selectedTextColor={selectedColor}
          label="Time"
          value={getTotalTime(filteredActivities)}
        />
        <Stat
          selectedTextColor={selectedColor}
          label="Average heart rate"
          value={getAverageHeartRate(filteredActivities)}
        />
        <Stat
          selectedTextColor={selectedColor}
          label="Activities"
          value={getAmountOfActivities(filteredActivities)}
        />
        <Stat
          selectedTextColor={selectedColor}
          label="Kudos"
          value={getTotalKudos(filteredActivities)}
        />
        <Stat
          selectedTextColor={selectedColor}
          label="Elevation gain"
          value={getTotalElevationGain(filteredActivities)}
        />
        <Stat
          selectedTextColor={selectedColor}
          label="Average speed"
          value={getAverageSpeed(filteredActivities, selectedActivity)}
        />
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

const StFrame = styled.div`
  display: grid;
  padding: 24px;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

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
