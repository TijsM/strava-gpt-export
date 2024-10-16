import { ActivityType } from "@/schemas/strava.schema";
import React from "react";
import { styled } from "styled-components";

type FilterProps = {
  activityTypes: ActivityType[];
  onSelectActivityType: (activityType: ActivityType) => void;
  selectedActivity: ActivityType;

  supportedColors: string[];
  onSelectColor: (color: string) => void;
  currentColor: string;
};

export const Filter = ({
  activityTypes,
  onSelectActivityType,
  selectedActivity,
  supportedColors,
  onSelectColor,
  currentColor,
}: FilterProps) => {
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectActivityType(event.target.value as ActivityType);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectColor(event.target.value);
  };

  return (
    <StContainer selectedTextColor={currentColor}>
      <div>
        <label htmlFor="activity-type">Choose an activity: </label>
        <select
          name="activity-type"
          id="activity-type"
          value={selectedActivity}
          onChange={handleTypeChange}
        >
          {activityTypes.map((activityType) => (
            <option key={activityType} value={activityType}>
              {activityType}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="color">Choose a text color: </label>
        <select
          name="color"
          id="color"
          value={currentColor}
          onChange={handleColorChange}
        >
          {supportedColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </StContainer>
  );
};

const StContainer = styled.div<{ selectedTextColor: string }>`
  margin-bottom: 16px;
  color: ${(props) => props.selectedTextColor};
`;
