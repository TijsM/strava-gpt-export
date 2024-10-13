"use client";

import { getBearerTokenForAuthCode } from "@/lib/strava-auth/auth";
import { storeAuthResponse } from "@/lib/strava-auth/auth-storage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const StravaAuthPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();

  const code = searchParams?.code;

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
