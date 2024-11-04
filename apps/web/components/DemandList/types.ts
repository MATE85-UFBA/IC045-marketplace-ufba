export type Keyword = {
    id: number;
    label: string;
}

export type Address = {
    city: string;
    state: string;
    country: string;
}

export type Company = {
    id: number;
    name: string;
    image?: string;
    address?: Address;
}

export type Demand = {
    id: number;
    title: string;
    description: string;
    keywords: Keyword[];
    company: Company;
    createdAt: Date;
}
