"use client";

import { logEvent, useLogPageView } from "@/lib/analytics/posthog";
import { getAuthToken } from "@/lib/strava-auth/auth";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function LoginPage() {
  const [authUrl, setAuthUrl] = useState("");
  useLogPageView();

  useEffect(() => {
    const getUrl = async () => {
      setAuthUrl(await getAuthToken(window.location.origin));
    };
    getUrl();
  });

  return (
    <StMain>
      <StButton
        onClick={() => {
          window.location.href = authUrl;
          logEvent({
            action: "click",
            name: "authenticate_button",
          });
        }}
      >
        Log in with strava
      </StButton>
    </StMain>
  );
}

const StMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #fc4c02;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #aa3300;
  }
`;
