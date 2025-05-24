import { StravaActivity } from "@/schemas/activity.schema";

const isInPeriod = (dateStr: string, monthsAgo: number) => {
  const activityDate = new Date(dateStr);
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - monthsAgo);
  return activityDate > cutoff;
};

const getWeeklyStats = (
  activities: StravaActivity[],
  monthsAgo: number
): { hours: string; sessionsPerWeek: string } => {
  const filtered = activities.filter((a) =>
    isInPeriod(a.start_date, monthsAgo)
  );

  const totalHours = filtered.reduce(
    (acc, a) => acc + Number(a.moving_time) / 3600,
    0
  );
  const weeks = monthsAgo * 4.34524; // average weeks per month
  return {
    hours: `${parseFloat(totalHours.toString()).toFixed(2)} hours`,
    sessionsPerWeek: `${Math.round(filtered.length / weeks)} sessions`,
  };
};

const getLastActivities = (
  activities: StravaActivity[],
  sport: "Run" | "Ride" | "Swim",
  count = 10
) => {
  return activities
    .filter((a) => a.sport_type === sport)
    .sort(
      (a, b) =>
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    )
    .slice(0, count);
};

type PBSpec = {
  label: string;
  minMeters: number;
  maxMeters: number;
};

const pbSpecs: Record<"Run" | "Ride" | "Swim", PBSpec[]> = {
  Run: [
    { label: "5km", minMeters: 0, maxMeters: 6000 },
    { label: "10km", minMeters: 6000, maxMeters: 14000 },
    { label: "half marathon", minMeters: 17000, maxMeters: 28000 },
    { label: "full marathon", minMeters: 28000, maxMeters: 50000 },
  ],
  Ride: [
    { label: "25km", minMeters: 0, maxMeters: 30000 },
    { label: "50km", minMeters: 30000, maxMeters: 60000 },
    { label: "75km", minMeters: 60000, maxMeters: 90000 },
    { label: "100km", minMeters: 90000, maxMeters: 120000 },
    { label: "150km", minMeters: 120000, maxMeters: 165000 },
    { label: "180km", minMeters: 165000, maxMeters: 200000 },
  ],
  Swim: [
    { label: "100m", minMeters: 0, maxMeters: 200 },
    { label: "400m", minMeters: 200, maxMeters: 600 },
    { label: "800m", minMeters: 600, maxMeters: 900 },
    { label: "1km", minMeters: 900, maxMeters: 1200 },
    { label: "1.5km", minMeters: 1200, maxMeters: 1700 },
    { label: "2km", minMeters: 1700, maxMeters: 2200 },
  ],
};

const formatDuration = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
};

type BestEffort = {
  distance: string; // e.g. "5050m"
  moving_time: string; // formatted duration
  date: string;
};

const getPBs = (
  activities: StravaActivity[],
  sport: "Run" | "Ride" | "Swim"
): BestEffort[] => {
  const specs = pbSpecs[sport];
  const filtered = activities.filter((a) => a.sport_type === sport);

  const results: BestEffort[] = [];

  for (const { minMeters, maxMeters } of specs) {
    const candidates = filtered.filter((a) => {
      const distance = Number(a.distance);
      return distance >= minMeters && distance <= maxMeters;
    });

    if (candidates.length === 0) continue;

    const best = candidates.reduce((best, curr) => {
      const bestPace = Number(best.moving_time) / Number(best.distance);
      const currPace = Number(curr.moving_time) / Number(curr.distance);
      return currPace < bestPace ? curr : best;
    });

    results.push({
      distance: `${Math.round(Number(best.distance))}m`,
      moving_time: formatDuration(Number(best.moving_time)),
      date: best.start_date,
    });
  }

  return results;
};

type TimeStats = {
  hours: string;
  sessionsPerWeek: string;
};

export type ActivitiesSummary = {
  last10Runs: StravaActivity[];
  last10Rides: StravaActivity[];
  last10Swims: StravaActivity[];
  pbs: {
    run: BestEffort[];
    ride: BestEffort[];
    swim: BestEffort[];
  };
  timeStats: {
    run: {
      month: TimeStats;
      quarter: TimeStats;
      year: TimeStats;
    };
    ride: {
      month: TimeStats;
      quarter: TimeStats;
      year: TimeStats;
    };
    swim: {
      month: TimeStats;
      quarter: TimeStats;
      year: TimeStats;
    };
  };
};

export const getActivitiesSummary = (
  activities: StravaActivity[]
): ActivitiesSummary => {
  return {
    last10Runs: getLastActivities(activities, "Run"),
    last10Rides: getLastActivities(activities, "Ride"),
    last10Swims: getLastActivities(activities, "Swim"),

    pbs: {
      run: getPBs(activities, "Run"),
      ride: getPBs(activities, "Ride"),
      swim: getPBs(activities, "Swim"),
    },

    timeStats: {
      run: {
        month: getWeeklyStats(
          activities.filter((a) => a.sport_type === "Run"),
          1
        ),
        quarter: getWeeklyStats(
          activities.filter((a) => a.sport_type === "Run"),
          3
        ),
        year: getWeeklyStats(
          activities.filter((a) => a.sport_type === "Run"),
          12
        ),
      },
      ride: {
        month: getWeeklyStats(
          activities.filter((a) => a.sport_type === "Ride"),
          1
        ),
        quarter: getWeeklyStats(
          activities.filter((a) => a.sport_type === "Ride"),
          3
        ),
        year: getWeeklyStats(
          activities.filter((a) => a.sport_type === "Ride"),
          12
        ),
      },
      swim: {
        month: getWeeklyStats(
          activities.filter((a) => a.sport_type === "Swim"),
          1
        ),
        quarter: getWeeklyStats(
          activities.filter((a) => a.sport_type === "Swim"),
          3
        ),
        year: getWeeklyStats(
          activities.filter((a) => a.sport_type === "Swim"),
          12
        ),
      },
    },
  };
};
