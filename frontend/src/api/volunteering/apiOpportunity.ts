import { apiCall } from "../axios";
import type { GetOpportunitiesParams, GetOpportunitiesResponse } from "@/types/volunteering/ViewOppUser.type";

export const getOpportunitiesData = ({ userId }: GetOpportunitiesParams) => {
  return apiCall<GetOpportunitiesResponse>("get", "/volunteering/opportunities/full", {
      userId,
  });
};

export const getAppliedOpportunitiesData = ({ userId }: GetOpportunitiesParams) => {
  return apiCall<GetOpportunitiesResponse>("get", "/volunteering/opportunities/applied", {
    userId,
  });
};
