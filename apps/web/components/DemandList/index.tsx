import { Item } from "./Item"
import { Demand } from "./types"

type DemandListProps = {
    demands: Demand[]
}

function DemandList({ demands }: DemandListProps) {
    console.log(typeof demands)
    return <ul className="flex flex-col gap-6">
        {
            demands.length
                ? demands.map(demand => <Item key={demand.id} {...demand} />)
                : <div>Não há demandas no momento</div>
        }
    </ul>
}

export { DemandList }