"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export type AnalyticsData = {
  action: "click" | "view";
  name: string;
  properties?: { [data: string]: any };
};

export const logPageView = () => {
  posthog.capture("view_page", { pageName: window.location.pathname });
};

export const logEvent = (data: AnalyticsData) => {
  posthog.capture(data.action + "_" + data.name, { ...data.properties });
};

export const useLogPageView = () => {
  useEffect(() => {
    logPageView();
  }, []);
};
