type Keyword = {id: string, name :string }
export interface Demanda {
  id: number;
  name: string;
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
