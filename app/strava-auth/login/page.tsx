"use client";

import { getAuthToken } from "@/lib/strava/auth";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [authUrl, setAuthUrl] = useState("");

  useEffect(() => {
    const getUrl = async () => {
      setAuthUrl(await getAuthToken());
    };
    getUrl();
  });

  return (
    <main>
      <button
        onClick={() => {
          window.location.href = authUrl;
        }}
      >
        button to auth
      </button>
    </main>
  );
}
