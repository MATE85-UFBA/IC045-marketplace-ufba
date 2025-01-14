export type Keyword = { id: string; name: string };
export type Competence = { id: string; name: string };
export interface Demanda {
  id: string;
  name: string;
  description: string;
  status: string; //todo fazer um enum
  createdAt: string;
  competences: Competence[];
  company: {
    image: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    address: {
      city: string;
      state: string;
      country: string;
    };
    user: {
      name: string;
    };
  };
  keywords: Keyword[];
  public: boolean;
  links: string[];
}
