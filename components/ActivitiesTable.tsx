import { StravaActivity } from "@/schemas/strava.schema";
import { useActivitiesStore } from "@/stores/selectedActivitiesStore";
import { styled } from "styled-components";

type ActivitiesTableProps = {
  activities: StravaActivity[];
  loading: boolean;
};

export const ActivitiesTable = ({
  activities,
  loading,
}: ActivitiesTableProps) => {
  const { selectedActivities, selectMany, unselectAll, toggleSelection } =
    useActivitiesStore();

  if (loading) {
    return "loading";
  }

  return (
    <div>
      <button onClick={unselectAll}>unselect all</button>
      <button
        onClick={() => selectMany(activities.map((a) => a.id.toString()))}
      >
        select all
      </button>{" "}
      <StTable>
        {(activities || []).map((activity) => {
          return (
            <StRow
              selected={selectedActivities.includes(activity.id.toString())}
              key={activity.id}
              onClick={() => toggleSelection(activity.id.toString())}
            >
              <StTd>{activity.type}</StTd>
              <StTd>{activity.name}</StTd>
              <StTd>{activity.distance}</StTd>
              <StTd>{activity.moving_time}</StTd>
            </StRow>
          );
        })}
      </StTable>
    </div>
  );
};

const StTable = styled.table`
  width: 100%;
`;

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
