import { ActivityType } from "@/schemas/strava.schema";
import { useDarkModeStore } from "@/stores/darkModeStore";
import React from "react";
import { styled } from "styled-components";
import { SettingsCard } from "./SettingsCard";
import { FaBicycle, FaRunning, FaSwimmer } from "react-icons/fa";
import { useFilterStore } from "@/stores/filterStore";

const supportedColors = ["black", "white"];

type FilterProps = {
  activityTypes: ActivityType[];
};

export const Filter = ({ activityTypes }: FilterProps) => {
  const isDark = useDarkModeStore((state) => state.isDark);
  const changeDarkMode = useDarkModeStore((state) => state.changeDarkMode);

  const selectedActivity = useFilterStore((state) => state.selectedActivity);
  const changeSelectedActivity = useFilterStore(
    (state) => state.changeSelectedActivity
  );

  const handleTypeChange = (activityType: ActivityType) => {
    changeSelectedActivity(activityType);
  };

  const handleColorChange = (color: "black" | "white") => {
    changeDarkMode(color === "black");
  };

  const textColor = isDark ? "white" : "black";

  return (
    <StContainer selectedTextColor={textColor}>
      <StFilterRow>
        {activityTypes.map((activityType) => {
          if (activityType === "Run") {
            return (
              <SettingsCard
                key={activityType}
                icon={<FaRunning color={textColor} />}
                title={activityType}
                selected={activityType === selectedActivity}
                onSelect={() => handleTypeChange(activityType)}
              />
            );
          }
          if (activityType === "Swim") {
            return (
              <SettingsCard
                key={activityType}
                icon={<FaSwimmer color={textColor} />}
                title={activityType}
                selected={activityType === selectedActivity}
                onSelect={() => handleTypeChange(activityType)}
              />
            );
          }
          if (activityType === "Ride") {
            return (
              <SettingsCard
                key={activityType}
                icon={<FaBicycle color={textColor} />}
                title={activityType}
                selected={activityType === selectedActivity}
                onSelect={() => handleTypeChange(activityType)}
              />
            );
          }
        })}
      </StFilterRow>

      <StFilterRow>
        {supportedColors.map((color) => {
          if (color === "black") {
            return (
              <SettingsCard
                key={color}
                title={"White text"}
                selected={isDark}
                onSelect={() => handleColorChange("black")}
              />
            );
          }
          return (
            <SettingsCard
              key={color}
              title={"Black text"}
              selected={!isDark}
              onSelect={() => handleColorChange("white")}
            />
          );
        })}
      </StFilterRow>
    </StContainer>
  );
};

const StContainer = styled.div<{ selectedTextColor: string }>`
  margin-bottom: 16px;
  color: ${(props) => props.selectedTextColor};
`;

const StFilterRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;
