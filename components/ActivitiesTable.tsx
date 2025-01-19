import { StravaActivity } from "@/schemas/strava.schema";

type ActivitiesTableProps = {
  activities: StravaActivity[];
  loading: boolean;
};

export const ActivitiesTable = ({
  activities,
  loading,
}: ActivitiesTableProps) => {
  if (loading) {
    return "loading";
  }

  return (
    <table>
      {activities.map((activity) => {
        return (
          <tr key={activity.id}>
            <td>{activity.type}</td>
            <td>{activity.name}</td>
            <td>{activity.distance}</td>
            <td>{activity.moving_time}</td>
          </tr>
        );
      })}
    </table>
  );
};
