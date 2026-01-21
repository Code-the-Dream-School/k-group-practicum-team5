  export type OpportunityRow = {
    id: string;
    date?: string;
    timeFrom: string;
    timeTo: string;
    category: string;
    description: string;
    totalApplicants: number;

    totalAssignees: number;
  };