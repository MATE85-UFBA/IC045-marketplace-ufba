//import { Reseacher } from "../ResearchGroupList/types";

type ResearchGroup = {
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