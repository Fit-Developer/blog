import React from "react";
import { useRouter } from "next/router";

export default function useRefresh() {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  return { refreshData, router };
}
