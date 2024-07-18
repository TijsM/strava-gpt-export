"use client";
import { hasStravaCode } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Home() {
  const hastAuthCode = hasStravaCode();

  if (hastAuthCode) {
    return redirect("/start");
  } else {
    return redirect("/strava-auth/login");
  }
}
