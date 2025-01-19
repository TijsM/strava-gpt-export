import { StravaActivity } from "@/schemas/strava.schema";
import { useState } from "react";
import { styled } from "styled-components";

type ActivitiesTableProps = {
  activities: StravaActivity[];
  loading: boolean;
};

export const ActivitiesTable = ({
  activities,
  loading,
}: ActivitiesTableProps) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const onClickRow = (id: string) => {
    if (selectedActivities.includes(id)) {
      setSelectedActivities((prev) =>
        prev.filter((activityId) => activityId !== id)
      );
    } else {
      setSelectedActivities((prev) => [...prev, id]);
    }
  };

  const selectAll = () => {
    setSelectedActivities(activities.map((activity) => activity.id.toString()));
  };
  const unselectAll = () => {
    setSelectedActivities([]);
  };

  if (loading) {
    return "loading";
  }

  return (
    <table>
      <button onClick={unselectAll}>unselect all</button>
      <button onClick={selectAll}>select all</button>
      {(activities || []).map((activity) => {
        return (
          <StRow
            selected={selectedActivities.includes(activity.id.toString())}
            key={activity.id}
            onClick={() => onClickRow(activity.id.toString())}
          >
            <StTd>{activity.type}</StTd>
            <StTd>{activity.name}</StTd>
            <StTd>{activity.distance}</StTd>
            <StTd>{activity.moving_time}</StTd>
          </StRow>
        );
      })}
    </table>
  );
};

const StRow = styled.tr<{ selected: boolean }>`
  margin: 8px;
  background-color: ${(props) => (props.selected ? "lightgray" : "white")};
  cursor: pointer;
`;

const StTd = styled.td`
  padding: 8px;
  margin: 2px 0px;
  border: 2px solid white;
  padding: 5px;
`;
