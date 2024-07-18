export const storeStravaCode = (code: string) => {
  localStorage.setItem("stravaCode", code);
};

export const hasStravaCode = () => {
  return localStorage.getItem("stravaCode") !== null;
};

export const getStravaCode = () => {
  return localStorage.getItem("stravaCode");
};
