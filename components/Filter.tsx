import { ActivityType } from "@/schemas/strava.schema";
import React from "react";

type FilterProps = {
  activityTypes: ActivityType[];
  onSelecct: (activityType: ActivityType) => void;
  selectedActivity?: ActivityType;
};

export const Filter = ({
  activityTypes,
  onSelecct,
  selectedActivity,
}: FilterProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelecct(event.target.value as ActivityType);
  };

  return (
    <div>
      <label htmlFor="activity-type">Choose an activity: </label>
      <select
        name="activity-type"
        id="activity-type"
        value={selectedActivity}
        onChange={handleChange}
      >
        {activityTypes.map((activityType) => (
          <option key={activityType} value={activityType}>
            {activityType}
          </option>
        ))}
      </select>
    </div>
  );
};
