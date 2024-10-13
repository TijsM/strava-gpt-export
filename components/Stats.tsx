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
  getTotalDistance,
  getTotalElevationGain,
  getTotalKudos,
  getTotalTime,
} from "@/lib/calculateStats";

type StatsProps = {
  activities: StravaActivity[];
  loading: boolean;
};

export const Stats = ({ activities, loading }: StatsProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>(
    supportedActivityTypes[0]
  );
  const filteredActivities = useMemo(() => {
    if (!activities) {
      return [];
    }
    return activities.filter((activity) => activity.type === selectedActivity);
  }, [activities, selectedActivity]);

  if (loading) {
    return <StStatContainer>Loading...</StStatContainer>;
  }

  if (!activities?.length) {
    return <StStatContainer>No activities loading</StStatContainer>;
  }

  const exportAsImage = async () => {
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
    <StStatContainer>
      <Filter
        activityTypes={supportedActivityTypes}
        onSelecct={setSelectedActivity}
      />
      <StFrame ref={frameRef}>
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
        <Stat label="Kudos" value={getTotalKudos(filteredActivities)} />
        <Stat
          label="Elevation gain"
          value={getTotalElevationGain(filteredActivities)}
        />
      </StFrame>
      <ExportButton onClick={exportAsImage}>Export as PNG</ExportButton>{" "}
    </StStatContainer>
  );
};

const StStatContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StFrame = styled.div`
  border: 1px solid black;
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
