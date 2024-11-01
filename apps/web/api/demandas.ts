
export type CreateDemanda = {
    titulo:string,
    links?: string,
    descricao: string
};

export async function addDemanda(input: CreateDemanda){
    return await fetch('http://localhost:3000/demand', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(input)})
}