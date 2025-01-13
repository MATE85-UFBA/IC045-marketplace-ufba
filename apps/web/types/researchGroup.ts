export type CreateResearchGroup = {
  name: string;
  description: string;
  urlCNPQ?: string;
  researcherId: string;
  knowledgeArea: string;
  knowledgeAreas?: string[];
  members?: string[];
  img?: string;
};
