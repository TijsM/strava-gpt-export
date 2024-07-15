"use client";

import { getAuthToken } from "@/lib/strava-auth";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [authUrl, setAuthUrl] = useState("");

  useEffect(() => {
    const getUrl = async () => {
      setAuthUrl(await getAuthToken());
    };
    getUrl();
  });

  return (
    <main className={styles.main}>
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
