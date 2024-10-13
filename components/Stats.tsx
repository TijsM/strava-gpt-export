import { StravaActivity } from "@/schemas/strava.schema";
import styled from "styled-components";
import { Stat } from "./Stat";
import html2canvas from "html2canvas"; // Import html2canvas
import { useRef } from "react"; // Import useRef to reference the component

type StatsProps = {
  activities: StravaActivity[];
  loading: boolean;
};

export const Stats = ({ activities, loading }: StatsProps) => {
  const frameRef = useRef<HTMLDivElement>(null); // Create a ref to the StFrame div

  if (loading) {
    return <StStatContainer>Loading...</StStatContainer>;
  }

  if (!activities.length) {
    return <StStatContainer>No activities loading</StStatContainer>;
  }

  const totalDistance = activities.reduce(
    (acc, curr) => acc + curr.distance,
    0
  );

  const totalTime = activities.reduce((acc, curr) => acc + curr.moving_time, 0);

  const averageHeartRate = activities.reduce(
    (acc, curr) => acc + (curr?.average_heartrate ?? 0),
    0
  );

  const amountOfActivities = activities.length;

  const totalMovingTime = activities.reduce(
    (acc, curr) => acc + curr.moving_time,
    0
  );

  const totalKudos = activities.reduce(
    (acc, curr) => acc + curr.kudos_count,
    0
  );

  const exportAsImage = async () => {
    if (frameRef.current) {
      const canvas = await html2canvas(frameRef.current, {
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = "stats.png"; // Name the image
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <StStatContainer>
      <StFrame ref={frameRef}>
        <Stat label="Total distance" value={totalDistance.toFixed(2)} />
        <Stat label="Total time" value={totalTime.toFixed(2)} />
        <Stat label="Average heart rate" value={averageHeartRate.toFixed(2)} />
        <Stat
          label="Amount of activities"
          value={amountOfActivities.toString()}
        />
        <Stat label="Total moving time" value={totalMovingTime.toFixed(2)} />
        <Stat label="Total kudos" value={totalKudos.toString()} />
      </StFrame>
      <ExportButton onClick={exportAsImage}>Export as PNG</ExportButton>{" "}
      {/* Add a button to export */}
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
`;

const ExportButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
