import { Item } from "./Item"
import { ResearchGroup } from "./type"

type ResearchGroupListProps = {
    researchGroups: ResearchGroup[]
}

function ResearchGroupList({ researchgroups }: ResearchGroupListProps) {
    console.log(typeof researchgroups)
    return <ul className="flex flex-container flex-col gap-6">
        {
            researchgroups.length
                ? researchgroups.map(researchgroup => <Item key={researchgroup.id} {...researchgroup} />)
                : <div>No momento não há grupos de pesquisa cadastrado</div>
        }
    </ul>
}

export { ResearchGroupList }