"use client";

import { getBearerTokenForAuthCode } from "@/lib/strava/auth";
import { storeAuthResponse } from "@/lib/strava/auth-storage";
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
        console.log("response", response);

        storeAuthResponse(response);
        console.log();
        router.push("/");
      }
    };

    if (code) {
      getToken();
    }
  }, [code]);
};

export default StravaAuthPage;
