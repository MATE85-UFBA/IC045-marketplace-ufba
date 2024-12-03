export type CreateProject = {
  name: string;
  description: string;
  started_at: string;
  finished_at?: string;
  keywords: string[];
};
