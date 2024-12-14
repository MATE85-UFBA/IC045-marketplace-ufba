import { MyResearchGroup } from "@/modules/meus-grupos-pesquisa/interfaces/pesquisador-grupo";
import { Item } from "./Item"
import { PesquisadorGrupo } from "./type"

interface MyResearchGroupListProps  {
    pesquisador: PesquisadorGrupo;
}

function MyResearchGroupList({ pesquisador }: MyResearchGroupListProps) {
    const data  : MyResearchGroup[] =  pesquisador.groupsAsMember;

    return <ul className="grid grid-cols-2 gap-3">
        {
            
            data.length > 0 
                ? data.map(pesquisador => <Item key={pesquisador.name} {...pesquisador} />)
                : <div>Você não participa de nenhum grupo de pesquisa no momento</div>
                
        }
    </ul>
}

export { MyResearchGroupList }