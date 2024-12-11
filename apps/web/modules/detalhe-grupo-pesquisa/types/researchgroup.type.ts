type EResearcherType = "TEACHER" | "STUDENT";

export type TLeader = {
  userId: string;
  urlLattes: string | null;
  researcherType: EResearcherType;
  createdAt: string;
  updatedAt: string;
};

export type TMember = {
  userId: string;
  urlLattes: string | null;
  researcherType: EResearcherType;
  createdAt: string;
  updatedAt: string;
};

export type TResearchGroup = {
  id: string;
  name: string;
  description: string;
  urlCNPQ: string;
  img: string | null;
  researcherId: string;
  leader: TLeader;
  members: TMember[];
};
