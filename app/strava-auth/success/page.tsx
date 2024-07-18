"use client";

import { redirect } from "next/navigation";

const StravaAuthPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams?.code;

  console.log("setting token", token);
  localStorage.setItem("stravaCode", token as string);

  redirect("/");
};

export default StravaAuthPage;
