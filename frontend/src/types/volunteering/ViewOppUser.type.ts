export interface GetOpportunitiesParams {
  userId: string | null;
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
  applicants: OpportunityApplicant[];
}
interface OpportunitySchedule {
  date: string;
  timeFrom: string;
  timeTo: string;
  slotsAvailable: number;
  applicants: OpportunityApplicant[];
  applicationStatus?: string;
  _id: string;
}

interface OpportunityApplicant {
  userId: string;
  scheduleId: string;
  status: string;
}
