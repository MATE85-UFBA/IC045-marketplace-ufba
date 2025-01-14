export type Keyword = {
  id: number;
  name: string;
};

export type Reseacher = {
  id: number;
  name: string;
  email: string;
  typeReseacher: string;
};

export type Competence = {
  id: number;
  name: string;
  status: string;
};

export type ResearchGroup = {
  id: number;
  name: string;
  description: string;
  urlCNPQ: string;
  img: string;
  leader: Reseacher;
  members: Reseacher[];
  competences: Competence[];
  keywords: Keyword[];
};
