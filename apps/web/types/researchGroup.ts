export type CreateResearchGroup = {
  name: string;
  description: string;
  urlCNPQ?: string;
  researcherId: string;
  knowledgeArea: string;
  img?: string;
};
