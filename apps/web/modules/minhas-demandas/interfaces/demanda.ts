type Keyword = { id: string, name: string }
export interface Demanda {
  id: string;
  name: string;
  public: boolean;
  status: string; //todo fazer um enum
  createdAt: string;
  description: string;
  keywords: Keyword[];
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
