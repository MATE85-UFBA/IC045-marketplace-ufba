export type CreateProject = {
  researchGroupId: string;
  name: string;
  description: string;
  started_at: Date;
  finished_at?: Date;
  keywords: string[];
};
