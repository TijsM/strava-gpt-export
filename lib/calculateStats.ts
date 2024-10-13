import { StravaActivity } from "@/schemas/strava.schema";

export const getTotalDistance = (activities: StravaActivity[]) => {
  const totalDistanceInM = activities.reduce(
    (acc, curr) => acc + curr.distance,
    0
  );

  return (totalDistanceInM / 1000).toFixed(2).toString();
};

export const getTotalTime = (activities: StravaActivity[]) => {
  const totalTimeInSeconds = activities.reduce(
    (acc, curr) => acc + curr.moving_time,
    0
  );
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
  const seconds = totalTimeInSeconds % 60;

  return `${hours}:${minutes}:${seconds}`;
};

export const getAverageHeartRate = (activities: StravaActivity[]) => {
  const validActivities = activities.filter(
    (activity) => activity.average_heartrate !== undefined
  );

  const totalHeartRate = validActivities.reduce(
    (acc, curr) => acc + (curr.average_heartrate as number),
    0
  );

  return `${
    validActivities.length > 0
      ? (totalHeartRate / validActivities.length).toFixed(0)
      : 0
  } bpm`;
};

export const getAmountOfActivities = (activities: StravaActivity[]) => {
  return activities.length.toString();
};

export const getTotalKudos = (activities: StravaActivity[]) => {
  return activities.reduce((acc, curr) => acc + curr.kudos_count, 0).toString();
};

export const getTotalElevationGain = (activities: StravaActivity[]) => {
  const totalElevationGain = activities
    .reduce((acc, curr) => acc + curr.total_elevation_gain, 0)
    .toFixed(0);

  return `${totalElevationGain} m`;
};
