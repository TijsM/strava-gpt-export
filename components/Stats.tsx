import { StravaActivity } from "@/schemas/strava.schema";
import styled from "styled-components";
import { Stat } from "./Stat";

type StatsProps = {
  activities: StravaActivity[];
  loading: boolean;
};

export const Stats = ({ activities, loading }: StatsProps) => {
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

  return (
    <StStatContainer>
      <StFrame>
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
    </StStatContainer>
  );
};

const StStatContainer = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const StFrame = styled.div`
  border: 1px solid black;
  display: grid;
  padding: 24px;
  grid-template-columns: repeat(2, 1fr);
`;
