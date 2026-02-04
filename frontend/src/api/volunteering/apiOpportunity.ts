import { apiCall } from "../axios";
import type { GetOpportunitiesParams, GetOpportunitiesResponse } from "@/types/volunteering/ViewOppUser.type";

export const getOpportunitiesData = ({ limit, cursor }: GetOpportunitiesParams) => {
  return apiCall<GetOpportunitiesResponse>("get", "/volunteering/opportunities/full", {
    limit,
    ...(cursor && { cursor }),
  });
};
