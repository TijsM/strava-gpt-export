"use client";

import { jsonToGptStringv2 } from "@/lib/jsonToGptStringv2";
import { EnrichedActivity } from "@/schemas/enrichedActivity.schema";
import { useActivitiesLapStore } from "@/stores/activitiesLapStore";
import { useActivitiesStore } from "@/stores/activitiesStore";
import { useActivitiesStreamsStore } from "@/stores/activitiesStreamsStore";
import { useActivitiesZonesStore } from "@/stores/activitiesZonesStore";
import { useSelectedActivities } from "@/stores/selectedActivitiesStore";
import { styled } from "styled-components";

const convertMeterPerSecondToKmAnHour = (ms: number | string) => {
  if (typeof ms === "string") {
    return ms;
  }
  return `${ms / 3.6}km/h`;
};

const formatTime = (time: number | string) => {
  if (typeof time === "string") {
    return time;
  }
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return `${hours}:${minutes}:${seconds}`;
};

export const ExportSection = () => {
  const { selectedActivities } = useSelectedActivities();
  const { laps } = useActivitiesLapStore();
  const { zones } = useActivitiesZonesStore();
  const { activities, loading } = useActivitiesStore();
  const { streams } = useActivitiesStreamsStore();

  const onClickExport = () => {
    const selectedFullActivities: EnrichedActivity[] = activities
      .filter((activity) => selectedActivities.includes(activity.id.toString()))
      .map((activity) => {
        return {
          name: activity.name,
          distance: activity.distance,
          moving_time: formatTime(activity.moving_time),
          elapsed_time: formatTime(activity.elapsed_time),
          sport_type: activity.sport_type,
          start_date_local: activity.start_date_local,
          average_speed: convertMeterPerSecondToKmAnHour(
            activity.average_speed
          ),
          max_speed: convertMeterPerSecondToKmAnHour(activity.max_speed),
          average_cadence: activity.average_cadence,
          average_watts: activity.average_watts,
          kilojoules: activity.kilojoules,
          average_heartrate: activity.average_heartrate,
          max_heartrate: activity.max_heartrate,
          suffer_score: activity.suffer_score,
          laps: laps
            .filter((lap) => lap.activity.id === activity.id)
            .map((lap) => ({
              name: lap.name,
              elapsed_time: formatTime(lap.elapsed_time),
              moving_time: formatTime(lap.moving_time),
              distance: lap.distance,
              average_speed: convertMeterPerSecondToKmAnHour(lap.average_speed),
              max_speed: convertMeterPerSecondToKmAnHour(lap.max_speed),
              total_elevation_gain: lap.total_elevation_gain,
              average_heartrate: lap.average_heartrate,
              max_heartrate: lap.max_heartrate,
            })),
          zones: zones
            .filter((zone) => zone.activityId === activity.id.toString())
            .map((zone) => ({
              score: zone.score,
              distribution_buckets: zone.distribution_buckets,
              type: zone.type,
              sensor_based: zone.sensor_based,
            })),
          streams: streams
            .filter((stream) => stream.activityId === activity.id.toString())
            .map((stream) => ({
              data: stream.data,
              series_type: stream.series_type,
              resolution: stream.resolution,
            })),
        };
      });

    navigator.clipboard.writeText(jsonToGptStringv2(selectedFullActivities));
  };

  return (
    <StContainer>
      <StButton onClick={onClickExport} disabled={loading}>
        Export
      </StButton>
    </StContainer>
  );
};

const StContainer = styled.div`
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 100%;
  height: 50px;
`;

const StButton = styled.button``;
