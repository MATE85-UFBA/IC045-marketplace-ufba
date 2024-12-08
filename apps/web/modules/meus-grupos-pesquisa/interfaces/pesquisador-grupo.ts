type ResearchGroup = {id: string, name :string }
export interface PesquisadorGrupo {
  id: string;
	groupsAsLeader: ResearchGroup[],
	groupsAsMember: ResearchGroup[];
}