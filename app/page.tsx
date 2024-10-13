"use client";

import { hasStravaCode } from "@/lib/strava-auth/auth-storage";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const hastAuthCode = hasStravaCode();

    if (hastAuthCode) {
      return redirect("/start");
    } else {
      return redirect("/strava-auth/login");
    }
  }, []);
}
