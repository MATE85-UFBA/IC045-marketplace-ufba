import { ResearchGroupList } from "@/components/ResearchGroupList";
import { ResearchGroup } from "@/components/ResearchGroupList/type";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiSearch } from "react-icons/fi";

function EncontrarGrupoPesquisa() {
    const researchgroups = [
        {
            id: 1,
            name: "Lasid",
            description: "O Laboratório de Sistemas Distribuídos (LaSiD) foi criado em 09 de maio de 1995, sendo o primeiro grupo de pesquisa na área de computação na UFBA e um dos pioneiros na área de sistemas distribuídos no país. Desde 1997, realizamos o workshop do LaSiD (WoLa) para fomentar a troca de experiências e o conhecimento mútuo das pesquisas sendo realizadas no laboratório. Para a realização do WoLa 2024, fizemos uma chamada interna para apresentações de estudantes de graduação e pós-graduação envolvidos em atividades de pesquisa no laboratório. Teremos também apresentações de quatro pesquisadores do LaSiD, que são professores do Instituto de Computação, do Departamento de Computação Interdisciplinar, totalizando 23 apresentações. As palestras dos pesquisadores terão um caráter mais geral, focando em métodos de pesquisa, projetos e áreas temáticas específicas. As apresentações são todas abertas ao público, sem a necessidade de inscrição prévia, até o limite da capacidade do auditório",
            img: "",
            urlCNPQ: "",
            leader: "",
            members: [],
            projects: [],
            knowlegdeAreas: [ { id: 1, name: "Engenharia de software" } ]
        },
        {
            id: 2,
            name: "Onda Digital",
            description: "O Programa Onda Digital (POD) foi criado em 2004, sob a coordenação do Departamento de Ciência da Computação (DCC) do Instituto de Matemática e Estatística (IME), da Universidade Federal da Bahia (UFBA), como um programa permanente de extensão. Tendo como missão “contribuir com a inclusão sociodigital na Bahia, envolvendo a Universidade em ações educativas e de difusão da filosofia do Software Livre”, o POD atua de forma colaborativa, incentivando a interdisciplinaridade com o envolvimento de profissionais de computação, professores, funcionários e estudantes da UFBA de diferentes unidades de ensino da universidade atuando como estudantes-educadores.",
            img: "",
            urlCNPQ: "",
            leader: "",
            members: [],
            projects: [],
            knowlegdeAreas: [ { id: 1, name: "Ações afirmativas" }, { id: 2, name: "Inclusão Digital"} ]
        }
    ]

    return <main className='max-w-screen-xl px-8 m-auto grid grid-cols-[auto_1fr] md:gap-3'>
        <h1 className='font-semibold text-4xl mt-12 mb-8 col-span-2'>Encontrar grupo de pesquisa</h1>

        <aside className='bg-white h-fit border py-8 px-6 rounded-2xl min-w-60 lg:min-w-80 hidden md:flex md:flex-col md:gap-5 row-span-2'>
            <div>
                <Label className='font-semibold'>Área</Label>

                <ul className='pr-4 flex gap-2 flex-col mt-2'>
                    <li className='flex items-center gap-1'>
                        <Checkbox id="exatas" />
                        <Label htmlFor="exatas">Ciências Exatas e da Terra</Label>
                    </li>

                    <li className='flex items-center gap-1'>
                        <Checkbox id="biologicas" />
                        <Label htmlFor="biologicas">Ciências Biológicas</Label>
                    </li>

                    <li className='flex items-center gap-1'>
                        <Checkbox id="engenharia" />
                        <Label htmlFor="engenharia">Engenharia / Tecnologia</Label>
                    </li>

                    <li className='flex items-center gap-1'>
                        <Checkbox id="saude" />
                        <Label htmlFor="saude">Ciências da Saúde</Label>
                    </li>

                    <li className='flex items-center gap-1'>
                        <Checkbox id="agrarias" />
                        <Label htmlFor="saude">Ciências Agrárias</Label>
                    </li>

                    <li className='flex items-center gap-1'>
                        <Checkbox id="sociais" />
                        <Label htmlFor="saude">Ciências Sociais</Label>
                    </li>

                    <li className='flex items-center gap-1'>
                        <Checkbox id="humanas" />
                        <Label htmlFor="saude">Ciências Humanas</Label>
                    </li>

                    <li className='flex items-center gap-1'>
                        <Checkbox id="letras" />
                        <Label htmlFor="saude">Linguística, Letras e Artes</Label>
                    </li>
                </ul>
            </div>
        </aside>

        <div className='flex gap-2'>
            <Input className='bg-white h-12 rounded-lg' placeholder='Buscar grupo de pesquisa' />
            <Button className='h-12 rounded-lg'><FiSearch />Pesquisar</Button>
        </div>

        <ResearchGroupList researchgroups={researchgroups} />
    </main>
}

export default EncontrarGrupoPesquisa