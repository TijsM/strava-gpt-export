"use client";

import { getTrainingSchema } from "@/lib/deepseek/getTrainingSchema";
import React, { useState } from "react";
import { keyframes, styled } from "styled-components";

export const DeepseekForm = () => {
  const [formData, setFormData] = useState({
    goal: "",
    duration: "",
    intensity: "",
    activitiesExport: "",
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const responseFromDeepseek = await getTrainingSchema({
      activityString: formData.activitiesExport,
      goal: formData.goal,
      duration: formData.duration,
      intensity: formData.intensity,
    });

    setLoading(false);
    setResponse(responseFromDeepseek as string);
  };

  return (
    <form>
      <div>
        <label htmlFor="goal">Goal</label>
        <input
          type="text"
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          placeholder="e.g. sub 6 hour half iron man"
        />
      </div>
      <div>
        <label htmlFor="duration">Training plan duration</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="12 weeks"
        />
      </div>
      <div>
        <label htmlFor="intensity">
          How many hours do you want to train per week on average
        </label>
        <input
          type="text"
          id="intensity"
          name="intensity"
          value={formData.intensity}
          onChange={handleChange}
          placeholder="10 hours"
        />
      </div>
      <div>
        <label htmlFor="activitiesExport">
          Paste the activities export from Strava
        </label>
        <input
          type="text"
          id="activitiesExport"
          name="activitiesExport"
          value={formData.activitiesExport}
          onChange={handleChange}
          placeholder="10 hours"
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>

      {loading && <StSpinner />}
      <p>{response}</p>
    </form>
  );
};
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StSpinner = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  animation: ${spin} 1s linear infinite;
`;
