import { z } from "zod";

const athleteSchema = z.object({
  id: z.number(),
  username: z.string(),
  resource_state: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  country: z.string().nullable(),
  sex: z.string(),
  premium: z.boolean(),
  summit: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  badge_type_id: z.number(),
  weight: z.number(),
  profile_medium: z.string().url(),
  profile: z.string().url(),
  friend: z.any().nullable(),
  follower: z.any().nullable(),
});

export const authResponseSchema = z.object({
  token_type: z.string(),
  expires_at: z.number(),
  expires_in: z.number(),
  refresh_token: z.string(),
  access_token: z.string(),
  athlete: athleteSchema,
});

export type StravaAuthResponse = z.infer<typeof authResponseSchema>;
