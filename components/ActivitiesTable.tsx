import { useActivitiesStore } from "@/stores/activitiesStore";
import { useSelectedActivities } from "@/stores/selectedActivitiesStore";
import { styled } from "styled-components";

export const ActivitiesTable = () => {
  const { selectedActivities, selectMany, unselectAll, toggleSelection } =
    useSelectedActivities();

  const { activities, loading } = useActivitiesStore();

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
      </button>
      <StTable>
        <thead>
          <StRow selected={false}>
            <th>type</th>
            <th>name</th>
            <th>distance</th>
            <th>moving time</th>
            <th>elevation gain</th>
            <th>include lap data</th>
          </StRow>
        </thead>
        <tbody>
          {(activities || []).map((activity) => (
            <StRow
              selected={selectedActivities.includes(activity.id.toString())}
              key={activity.id}
              onClick={() => toggleSelection(activity.id.toString())}
            >
              <StTd>{activity.type}</StTd>
              <StTd>{activity.name}</StTd>
              <StTd>{activity.distance}</StTd>
              <StTd>{activity.moving_time}</StTd>
              <StTd>{activity.total_elevation_gain}</StTd>
              <StTd>
                <button>load laps of activity</button>
              </StTd>
            </StRow>
          ))}
        </tbody>
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
