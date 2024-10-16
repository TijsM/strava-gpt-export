import { StravaActivity } from "@/schemas/strava.schema";

export const getTotalDistance = (activities: StravaActivity[]) => {
  const totalDistanceInM = activities.reduce(
    (acc, curr) => acc + curr.distance,
    0
  );

  return `${(totalDistanceInM / 1000).toFixed(2).toString()} km`;
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
export const getAverageSpeed = (
  activities: StravaActivity[],
  activityType: "Run" | "Swim" | "Ride"
) => {
  const filteredActivities = activities.filter(
    (activity) => activity.sport_type === activityType
  );

  const totalWeightedSpeed = filteredActivities.reduce(
    (acc, curr) => acc + curr.average_speed * curr.distance,
    0
  );

  const totalDistance = filteredActivities.reduce(
    (acc, curr) => acc + curr.distance,
    0
  );

  if (totalDistance === 0) {
    return "0";
  }

  switch (activityType) {
    case "Run": {
      // Average speed (m/s) to pace (min/km)
      const averageSpeedRun = totalWeightedSpeed / totalDistance; // m/s
      const pacePerKm = 1000 / averageSpeedRun / 60; // min/km
      const minutes = Math.floor(pacePerKm);
      const seconds = Math.round((pacePerKm - minutes) * 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} min/km`;
    }
    case "Swim": {
      // Average speed (m/s) to pace (min/100m)
      const averageSpeedSwim = totalWeightedSpeed / totalDistance; // m/s
      const pacePer100m = 100 / averageSpeedSwim / 60; // min/100m
      const swimMinutes = Math.floor(pacePer100m);
      const swimSeconds = Math.round((pacePer100m - swimMinutes) * 60);
      return `${swimMinutes}:${
        swimSeconds < 10 ? "0" : ""
      }${swimSeconds} min/100m`;
    }
    case "Ride": {
      // Average speed (m/s) to km/h
      const averageSpeedRide = (totalWeightedSpeed / totalDistance) * 3.6; // km/h
      return `${averageSpeedRide.toFixed(2)} km/h`;
    }
    default:
      return "Invalid activity type";
  }
};
