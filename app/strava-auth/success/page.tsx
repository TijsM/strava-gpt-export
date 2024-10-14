"use client";

import { getBearerTokenForAuthCode } from "@/lib/strava-auth/auth";
import { storeAuthResponse } from "@/lib/strava-auth/auth-storage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogPageView } from "@/lib/analytics/posthog";

const StravaAuthPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const code = searchParams?.code;
  useLogPageView();

  useEffect(() => {
    const getToken = async () => {
      const response = await getBearerTokenForAuthCode(code as string);

      if (response) {
        storeAuthResponse(response);
        router.push("/");
      }
    };

    if (code) {
      getToken();
    }
  }, [code, router]);
};

export default StravaAuthPage;
