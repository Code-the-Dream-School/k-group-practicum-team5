export type OpportunityRow = {
  id: string;
  createdAt: string;
  category: string;
  description: string;
  schedulesCount: number;
  slotsAvailableCount: number;
  pendingApplicantsCount: number;
  approvedApplicantsCount: number;
  applicants: number;
};

export type OpportunityApiItem = Omit<OpportunityRow, "id"> & {
  _id: string;
};

export type OpportunitiesResponse = {
  opportunities: OpportunityApiItem[];
};

export type ApplicantStatus = "Pending" | "Approved" | "Rejected";

export type ApplicantUser = {
  first_name: string;
  last_name: string;
  email: string;
};

export type OpportunityApplicant = {
  userId: string;
  status: ApplicantStatus;
  user: ApplicantUser | null;
};

export type OpportunitySchedule = {
  _id: string;
  timeFrom: string;
  timeTo: string;
  slotsAvailable: number;
  applicants: OpportunityApplicant[];
};

export type OpportunityApplicantsDetails = {
  _id: string;
  category: string;
  description: string;
  schedules: OpportunitySchedule[];
};

export type OpportunityApplicantsResponse = {
  opportunity: OpportunityApplicantsDetails;
};
