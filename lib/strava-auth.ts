"use server";

const stravaClientId = process.env.strava_client_id;
const stravaClientSecret = process.env.strava_client_secret;
const stravaAccessToken = process.env.strava_access_token;
const stravaRefreshToken = process.env.strava_refresh_token;

const envGuard = () => {
  if (
    !stravaClientId ||
    !stravaClientSecret ||
    !stravaAccessToken ||
    !stravaRefreshToken
  ) {
    throw new Error("Missing Strava credentials");
  } else
    return {
      stravaClientId,
      stravaAccessToken,
      stravaRefreshToken,
      stravaClientSecret,
    };
};

export const getAuthToken = async () => {
  const url = new URL("https://www.strava.com/oauth/mobile/authorize");
  const { stravaClientId } = envGuard();

  const redirectUri = "http://localhost:3000/strava-auth";
  const responseType = "code";
  const approvalPrompt = "auto";
  const scope = "activity:write,read";

  url.searchParams.append("client_id", stravaClientId);
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("response_type", responseType);
  url.searchParams.append("approval_prompt", approvalPrompt);
  url.searchParams.append("scope", scope);

  return url.toString();
};
