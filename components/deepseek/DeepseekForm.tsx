"use client";

import { getTrainingSchema } from "@/lib/deepseek/getTrainingSchema";
import React, { useState } from "react";

export const DeepseekForm = () => {
  const [formData, setFormData] = useState({
    goal: "",
    duration: "",
    intensity: "",
    activitiesExport: "",
  });

  const [response, setResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const responseFromDeepseek = await getTrainingSchema({
      activityString: formData.activitiesExport,
      goal: formData.goal,
      duration: formData.duration,
      intensity: formData.intensity,
    });

    setResponse(responseFromDeepseek as string);
    console.log(formData);
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

      <p>{response}</p>
    </form>
  );
};
