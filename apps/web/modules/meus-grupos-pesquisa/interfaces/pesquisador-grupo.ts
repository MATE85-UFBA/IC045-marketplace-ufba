export type MyResearchGroup = {
	id: string;
	name :string;
	image?: string;
	leader: {
		userId:string;
	} }
	
export type PesquisadorGrupo = {
  id: string;
  groupsAsMember: MyResearchGroup[];
  groupsAsLeader: MyResearchGroup[];
}