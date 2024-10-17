import { ActivityType } from "@/schemas/strava.schema";
import { useDarkModeStore } from "@/stores/darkMode";
import React from "react";
import { styled } from "styled-components";

const supportedColors = ["black", "white"];

type FilterProps = {
  activityTypes: ActivityType[];
  onSelectActivityType: (activityType: ActivityType) => void;
  selectedActivity: ActivityType;
};

export const Filter = ({
  activityTypes,
  onSelectActivityType,
  selectedActivity,
}: FilterProps) => {
  const changeDarkMode = useDarkModeStore((state) => state.changeDarkMode);
  const isDark = useDarkModeStore((state) => state.isDark);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectActivityType(event.target.value as ActivityType);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("click", event.target.value);
    changeDarkMode(event.target.value === "white");
  };

  return (
    <StContainer selectedTextColor={isDark ? "white" : "black"}>
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
          value={isDark ? "white" : "black"}
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
