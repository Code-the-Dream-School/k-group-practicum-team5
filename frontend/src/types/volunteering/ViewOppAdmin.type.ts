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
