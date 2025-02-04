import { useActivitiesLapStore } from "@/stores/activitiesLapStore";
import { useActivitiesStore } from "@/stores/activitiesStore";
import { useActivitiesStreamsStore } from "@/stores/activitiesStreamsStore";
import { useActivitiesZonesStore } from "@/stores/activitiesZonesStore";
import { useSelectedActivities } from "@/stores/selectedActivitiesStore";
import { styled } from "styled-components";

export const ActivitiesTable = () => {
  const { activities, loading } = useActivitiesStore();

  const { loadLapsForActivity, activityIdsWithLaps } = useActivitiesLapStore();

  const { loadZonesForActivity, activityIdsWithZones } =
    useActivitiesZonesStore();

  const { loadStreamsForActivity, activityIdsWithStreams } =
    useActivitiesStreamsStore();

  const { selectedActivities, selectMany, unselectAll, toggleSelection } =
    useSelectedActivities();

  if (loading) {
    return "loading";
  }

  const onClickLoadLapsForActivity = (activityId: string) => {
    loadLapsForActivity(activityId);
    if (!selectedActivities.includes(activityId)) {
      toggleSelection(activityId);
    }
  };

  const onClickLoadZonesForActivity = (activityId: string) => {
    loadZonesForActivity(activityId);
    if (!selectedActivities.includes(activityId)) {
      toggleSelection(activityId);
    }
  };

  const onClickLoadStreamsForActivity = (activityId: string) => {
    loadStreamsForActivity(activityId);
    if (!selectedActivities.includes(activityId)) {
      toggleSelection(activityId);
    }
  };

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
            <th>include zones data</th>
            <th>include streams data</th>
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
                {activityIdsWithLaps.includes(activity.id.toString()) ? (
                  "loaded"
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickLoadLapsForActivity(activity.id.toString());
                    }}
                  >
                    load laps
                  </button>
                )}
              </StTd>
              <StTd>
                {activityIdsWithZones.includes(activity.id.toString()) ? (
                  "loaded"
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickLoadZonesForActivity(activity.id.toString());
                    }}
                  >
                    load zones
                  </button>
                )}
              </StTd>
              <StTd>
                {activityIdsWithStreams.includes(activity.id.toString()) ? (
                  "loaded"
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickLoadStreamsForActivity(activity.id.toString());
                    }}
                  >
                    load streams
                  </button>
                )}
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
