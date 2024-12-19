export type Reseacher = {
    id: number;
    name: string;
    email: string;
    typeReseacher: string;
}

export type Project = {
    id: number;
    name: string;
    status: string;
}

export type KnowlegdeAreas = {
    id: number;
    name: string;
}

export type ResearchGroup = {
    id: string;
    name: string;
    description: string;
    urlCNPQ?: string;
    image?: string;
    leader: Reseacher;
    members: Reseacher[];
    projects: Project[];
    knowlegdeAreas: KnowlegdeAreas[];
}