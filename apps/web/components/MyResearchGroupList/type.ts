//import { Reseacher } from "../ResearchGroupList/types";

export type ResearchGroup = {
	id: string;
	name :string;
	img?: string;
	leader: {
		userId:string;
	} }

export type PesquisadorGrupo = {
    id: string;
    groupsAsMember: ResearchGroup[];
}

export type EditResearchGroup = {
	name: string;
	description: string;
	urlCNPQ: string | undefined;
	img?: string;
	knowledgeArea: string[];
}