export interface GrupoPesquisa {
  id: string;
  name: string;
  status: string; //todo fazer um enum
  createdAt: string;
  description: string;
  company: {
    image: string
    name: string
    address: {
      city: string
      state: string
      country: string
    }
  }
}