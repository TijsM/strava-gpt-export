import { ActivityType } from "@/schemas/strava.schema";
import React from "react";
import { styled } from "styled-components";

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
    <StContainer>
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
    </StContainer>
  );
};

const StContainer = styled.div`
  margin-bottom: 16px;
`;
