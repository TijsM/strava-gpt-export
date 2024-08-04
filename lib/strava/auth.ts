"use server";

const stravaClientId = process.env.strava_client_id;
const stravaClientSecret = process.env.strava_client_secret;
const stravaAccessToken = process.env.strava_access_token;
const stravaRefreshToken = process.env.strava_refresh_token;

export const envGuard = async () => {
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
  const envVars = await envGuard();

  const redirectUri = "http://localhost:3000/strava-auth/success";
  const responseType = "code";
  const approvalPrompt = "auto";
  const scope = "activity:read_all";

  url.searchParams.append("client_id", envVars.stravaClientId);
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("response_type", responseType);
  url.searchParams.append("approval_prompt", approvalPrompt);
  url.searchParams.append("scope", scope);

  return url.toString();
};

export const getBearerTokenForAuthCode = async (code: string) => {
  const url = new URL("https://www.strava.com/api/v3/oauth/token");
  const envVars = await envGuard();

  const data = {
    client_id: envVars.stravaClientId,
    client_secret: envVars.stravaClientSecret,
    code,
    grant_type: "authorization_code",
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);

  const jsonResponse = await response.json();

  return jsonResponse;
};
