import { useCallback } from "react";
import useRequest from "@/hooks/useRequest";
import { getOpportunitiesData } from "@/api";
import type { GetOpportunitiesParams, GetOpportunitiesResponse } from "@/types/volunteering/ViewOppUser";

export const useOpportunity = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getOpportunities = useCallback(
    ({ cursor, limit }: GetOpportunitiesParams) => {
      return run<GetOpportunitiesResponse>(() => getOpportunitiesData({ cursor, limit }));
    },
    [run],
  );

  return {
    isLoading,
    isError,
    error,
    getOpportunities,
  };
};
