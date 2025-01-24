export type MyResearchGroup = {
	id: string;
	name :string;
	img?: string;
	leader: {
		userId:string;
	} }
	
export type PesquisadorGrupo = {
  id: string;
  groupsAsMember: MyResearchGroup[];
}