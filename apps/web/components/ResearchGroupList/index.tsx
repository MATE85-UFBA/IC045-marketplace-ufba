import { Item } from "./Item"
import { ResearchGroup } from "./type"

type ResearchGroupListProps = {
    researchgroups: ResearchGroup[]
}

function ResearchGroupList({ researchgroups }: ResearchGroupListProps) {
    console.log(typeof researchgroups)
    return <ul className="grid grid-cols-2 gap-3">
        {
            researchgroups.length
                ? researchgroups.map(researchgroup => <Item key={researchgroup.id} {...researchgroup} />)
                : <div>No momento não há grupos de pesquisa cadastrado</div>
        }
    </ul>
}

export { ResearchGroupList }