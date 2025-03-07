import { redirect } from "next/navigation";

export const checkStravaResponseStatus = (response: Response) => {
  if (response.status === 401) {
    redirect("/strava-auth/login");
  }
};
