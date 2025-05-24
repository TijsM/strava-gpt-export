"use client";

import { styled } from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { logEvent, useLogPageView } from "@/lib/analytics/posthog";
import { getAuthToken } from "@/lib/strava-auth/auth";

export const StravaButton = () => {
  const [authUrl, setAuthUrl] = useState("");
  useLogPageView();

  useEffect(() => {
    const getUrl = async () => {
      setAuthUrl(await getAuthToken(window.location.origin));
    };
    getUrl();
  });

  const onClickStrava = () => {
    window.location.href = authUrl;

    logEvent({
      action: "click",
      name: "authenticate_button",
    });
  };

  return (
    <StStravaButton onClick={onClickStrava}>
      <Image
        src="/strava-button.svg"
        width={200}
        height={100}
        alt="Connect with Strava"
      />
    </StStravaButton>
  );
};

const StStravaButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;
