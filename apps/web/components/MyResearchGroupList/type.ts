import { Reseacher } from "../ResearchGroupList/types";

export type ResearchGroup = {
    id: number;
    name: string;
    image?: string;
    leader: Reseacher;
}