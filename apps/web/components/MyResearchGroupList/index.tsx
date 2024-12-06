import { Item } from "./Item"
import { ResearchGroup } from "./type"

type MyResearchGroupListProps = {
    researchgroups: ResearchGroup[]
}

function MyResearchGroupList({ researchgroups }: MyResearchGroupListProps) {
    console.log(typeof researchgroups)
    return <ul className="grid grid-cols-2 gap-3">
        {
            researchgroups.length
                ? researchgroups.map(researchgroup => <Item key={researchgroup.id} {...researchgroup} />)
                : <div>Você não participa de nenhum grupo de pesquisa no momento</div>
        }
    </ul>
}

export { MyResearchGroupList }