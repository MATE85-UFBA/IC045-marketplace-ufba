//import { Reseacher } from "../ResearchGroupList/types";

export type ResearchGroup = {
	id: string;
	name :string;
	image?: string;
	leader: {
		userId:string;
	} }

export type PesquisadorGrupo = {
    id: string;
    groupsAsMember: ResearchGroup[];
}