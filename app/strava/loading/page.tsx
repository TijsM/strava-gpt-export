"use client";

import { H1 } from "@/components/Text";
import { colors } from "@/lib/theme/theme";
import { useActivitiesStore } from "@/stores/activitiesStore";
import { useEffect, useState, useRef, useCallback } from "react";
import { styled } from "styled-components";
import { gsap } from "gsap";
import {
  ActivitiesSummary,
  getActivitiesSummary,
} from "@/lib/strava/getActivitiesSummary";
import { useRouter } from "next/navigation";

const LOADING_MESSAGES = [
  "Loading your activities...",
  "Calculating your load and mileage...",
  "Diving into your latest workouts...",
  "Analyzing your best efforts of the last year...",
] as const;

const TRANSITION_DURATION = 2500;
const FADE_DURATION = 0.5;
const FADE_IN_DURATION = 0.8;

export default function StravaLoading() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [summary, setSummary] = useState<ActivitiesSummary | null>(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const router = useRouter();

  const { fetchActivities, activities } = useActivitiesStore();

  const textRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onDone = () => {
    localStorage.setItem("stravaSummary", JSON.stringify(summary));
    router.push("/Questionnaire");
    console.log("Strava summary data is ready:", summary);
  };

  const animateTextIn = useCallback(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: FADE_IN_DURATION, ease: "power2.out" }
    );
  }, []);

  const animateTextOut = useCallback((onComplete: () => void) => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: FADE_DURATION,
      ease: "power2.in",
      onComplete,
    });
  }, []);

  const scheduleNextTransition = useCallback(() => {
    // Don't transition beyond the last loading message
    if (currentMessageIndex >= LOADING_MESSAGES.length - 1) return;

    timeoutRef.current = setTimeout(() => {
      animateTextOut(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      });
    }, TRANSITION_DURATION);
  }, [currentMessageIndex, animateTextOut]);

  // Initialize: fetch activities and animate in first message
  useEffect(() => {
    fetchActivities();
    animateTextIn();
  }, [fetchActivities, animateTextIn]);

  // Handle message transitions
  useEffect(() => {
    if (currentMessageIndex === 0) return; // Skip initial load

    animateTextIn();
    scheduleNextTransition();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [currentMessageIndex, animateTextIn, scheduleNextTransition]);

  // Schedule first transition
  useEffect(() => {
    scheduleNextTransition();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [scheduleNextTransition]);

  // Handle activities loading and summary generation
  useEffect(() => {
    if (activities.length === 0) return;

    const summaryData = getActivitiesSummary(activities);
    setSummary(summaryData);
    setIsDataReady(true);
  }, [activities]);

  // Trigger final transition when data is ready and we've gone through all loading messages
  useEffect(() => {
    if (!isDataReady || currentMessageIndex < LOADING_MESSAGES.length - 1)
      return;

    // Wait a bit after the last loading message, then show "Data is summarized"
    const finalTimeout = setTimeout(() => {
      animateTextOut(() => {
        setCurrentMessageIndex(LOADING_MESSAGES.length); // This will be the "Data is summarized" index
      });
    }, TRANSITION_DURATION);

    return () => clearTimeout(finalTimeout);
  }, [isDataReady, currentMessageIndex, animateTextOut]);

  // Call onDone after "Data is summarized" message appears
  useEffect(() => {
    if (currentMessageIndex === LOADING_MESSAGES.length) {
      // Wait for the animation to complete and a brief pause, then call onDone
      const doneTimeout = setTimeout(() => {
        onDone();
      }, FADE_IN_DURATION * 1000 + 1000); // Animation duration + 1 second pause

      return () => clearTimeout(doneTimeout);
    }
  }, [currentMessageIndex, onDone]);

  return (
    <StMain>
      <div ref={textRef}>
        <H1 white>
          {currentMessageIndex < LOADING_MESSAGES.length
            ? LOADING_MESSAGES[currentMessageIndex]
            : "We've got it!"}
        </H1>
      </div>
    </StMain>
  );
}

const StMain = styled.main`
  min-height: 100vh;
  background-color: ${colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;
