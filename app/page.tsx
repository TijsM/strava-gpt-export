"use client";

import { StravaButton } from "@/components/home/StravaButton";
import { HowItWorks } from "@/components/HowItWorks";
import { H1, H2 } from "@/components/Text";
import { colors } from "@/lib/theme/theme";

import { styled } from "styled-components";

export default function Home() {
  return (
    <StMain>
      <H1>Level up your triathlon game with Trai</H1>
      <H2>Your personalized training plan</H2>
      <HowItWorks />
      <StravaButton />
    </StMain>
  );
}

const StMain = styled.main`
  min-height: 100vh;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;
