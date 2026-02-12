import { useCallback } from "react";
import useRequest from "@/hooks/useRequest";
import { getAppliedOpportunitiesData, getOpportunitiesData } from "@/api";
import type { GetOpportunitiesParams, GetOpportunitiesResponse } from "@/types/volunteering/ViewOppUser.type";

export const useOpportunity = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getOpportunities = useCallback(
    ({ userId }: GetOpportunitiesParams) => {
      return run<GetOpportunitiesResponse>(() => getOpportunitiesData({ userId }));
    },
    [run],
  );

  const getAppliedOpportunities = useCallback(
    ({ userId }: GetOpportunitiesParams) => {
      return run<GetOpportunitiesResponse>(() => getAppliedOpportunitiesData({ userId }));
    },
    [run],
  );

  return {
    isLoading,
    isError,
    error,
    getOpportunities,
    getAppliedOpportunities,
  };
};
