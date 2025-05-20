"use server";
import OpenAI from "openai";

type TrainingSchemaInput = {
  activityString: string;
  goal: string;
  duration: string;
  intensity: string;
};

export const getTrainingSchema = async (input: TrainingSchemaInput) => {
  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.deepseek_api_key,
  });

  const systemPrompt = `
You are an expert triathlon coach who can generate personalized training plans based on an athlete's training history. 
Use science based principles of triathlon training to create a weekly training schema for an athlete preparing for a triathlon.
Your goal is to create the most effective training schema to help the athlete improve in all three disciplines (swim, bike, run) and overall triathlon performance, taking into account their past activities.

**Instructions:**

1.  **Analyze the provided JSON data representing the athlete's Strava training history.** Pay close attention to:
    * Types of activities (run, ride, swim).
    * Frequency and duration of training sessions for each discipline.
    * Intensity (if available through heart rate, power data, or perceived exertion).
    * Consistency of training over time.
    * Any patterns in training volume or intensity.
    * Types of workouts performed (e.g., long runs, interval training, tempo rides, open water swims).
    * Recent activities and any trends in performance or fatigue.

2.  **Based on the analysis, identify the athlete's strengths and weaknesses in each discipline.** Determine if there are any imbalances in their training (e.g., overtraining in one sport and neglecting another).

3.  **Consider the principles of effective triathlon training:**
    * **Specificity:** Training should mimic the demands of triathlon racing.
    * **Progressive Overload:** Gradually increasing training volume or intensity over time.
    * **Recovery:** Adequate rest and recovery are crucial for adaptation.
    * **Variety:** Incorporating different types of workouts to stimulate different physiological systems and prevent plateau.
    * **Individualization:** The plan should be tailored to the athlete's current fitness level, goals, and available time.

4.  **Generate a sample weekly training schema.** This schema should include:
    * Specific workouts for swimming, cycling, and running.
    * Consideration for brick workouts (bike followed by run).
    * Recommendations for training intensity (e.g., easy, moderate, hard, specific zones if data allows).
    * Suggestions for rest and active recovery.
    * A logical progression within the week, avoiding back-to-back high-intensity sessions in the same discipline.

5.  **Provide a brief explanation of the rationale behind the generated training schema.** Highlight how the plan addresses the athlete's identified strengths and weaknesses and incorporates sound triathlon training principles. Explain any specific workout choices or the sequencing of training.


`;

  const userPrompt = `
  my goal is to ${input.goal} in ${input.duration} with an average of ${input.intensity} per week.
  Here is my Strava activity history: ${input.activityString}`;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },

      { role: "user", content: userPrompt },
    ],
    model: "deepseek-chat",
  });

  console.log(completion);
  return completion.choices[0].message.content;
};
