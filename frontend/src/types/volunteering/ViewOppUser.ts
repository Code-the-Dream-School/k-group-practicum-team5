export interface GetOpportunitiesParams {
  cursor?: string | null;
  limit?: number | null;
}

export interface GetOpportunitiesResponse {
  opportunities: Opportunity[];
  total: number;
  nextCursor?: string | null;
}

interface Opportunity {
  _id: string;
  category: string;
  description: string;
  createdAt: string;
  schedules: OpportunitySchedule[];
  schedulesCount: number;
  slotsAvailableCount: number;
  applicantsCount: number;
}
interface OpportunitySchedule {
  _id: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  slotsAvailable: number;
  applicants: unknown[];
  applicantsCount: number;
}
