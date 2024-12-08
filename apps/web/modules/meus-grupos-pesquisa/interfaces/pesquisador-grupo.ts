type ResearchGroup = {
	id: string;
	name :string;
	image?: string;
	leader: {
		userId:string;
	} }
	
export interface PesquisadorGrupo {
  id: string;
	groupsAsMember: ResearchGroup[];
}