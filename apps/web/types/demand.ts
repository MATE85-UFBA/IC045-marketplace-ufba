export type CreateDemand = {
  name: string;
  description: string;
  link?: string;
  public: boolean | string;
  keywords?: string[];
};
