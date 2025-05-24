"use client";

import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import { hasStravaCode } from "@/lib/strava-auth/auth-storage";
import Image from "next/image";

export const StravaButton = () => {
  const router = useRouter();
  const onClickStrava = () => {
    const hastAuthCode = hasStravaCode();
    if (hastAuthCode) {
      return router.push("/start");
    } else {
      return router.push("/strava-auth/login");
    }
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
