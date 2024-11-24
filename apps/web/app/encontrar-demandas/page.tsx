import { DemandList } from '@/components/DemandList'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FiSearch } from "react-icons/fi"

function EncontrarDemandas() {
    const demands = [
        {
            id: 1,
            title: "Demanda Nova 01",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident animi perspiciatis eveniet dolore maxime veniam similique praesentium at minima, minus excepturi quam repellendus aspernatur consequuntur ut numquam asperiores rerum porro totam saepe eligendi iusto? Distinctio quas consectetur facere, porro quae recusandae quia doloribus consequatur consequuntur fugit quibusdam nam itaque aperiam, amet dicta fugiat harum quo maxime totam accusamus eveniet impedit sit, possimus ipsum. Qui voluptatum iste dolorum eligendi autem placeat minus iusto consequuntur, voluptates accusantium ipsam assumenda? Tempore, at nisi!",
            keywords: [],
            company: {
                id: 1,
                name: "Empresa BA",
                image: "",
                address: {
                    city: "Salvador",
                    state: "Bahia",
                    country: "Brasil",
                },
            },
            createdAt: new Date(2024, 10, 4, 12, 30),
        },
        {
            id: 2,
            title: "Demanda Nova 02",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, iusto quos. Incidunt dignissimos enim aliquam assumenda et. Nihil iste omnis ipsum odit vel similique. Aliquid, sunt dolorem quam inventore tempora nihil vero repudiandae dolorum eaque iure sequi harum fugiat animi quos culpa quaerat placeat aut, sapiente, similique dolore labore perspiciatis maxime a distinctio! Fugiat veritatis, sit laborum, alias animi esse quod ipsam quibusdam eaque tempora eos, nostrum soluta ratione repellendus ea aut eveniet! Ex assumenda nemo amet neque molestiae rerum dolor sequi, obcaecati, facilis repellendus iure animi? Facilis saepe atque dignissimos possimus, rem itaque perspiciatis quibusdam non commodi adipisci et!",
            keywords: [{ id: 1, label: "machine learning" }, { id: 2, label: "python" }],
            company: {
                id: 1,
                name: "Empresa SP",
                image: "",
                address: {
                    city: "São Paulo",
                    state: "São Paulo",
                    country: "Brasil",
                },
            },
            createdAt: new Date(2024, 10, 3, 18, 45),
        },
    ]

    return <main className='max-w-screen-xl px-8 mx-auto mb-auto grid grid-cols-[auto_1fr] md:gap-3'>
        <h1 className='font-semibold text-4xl mt-12 mb-8 col-span-2'>Encontrar Demandas</h1>

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

            <div>
                <Label htmlFor='publishedDate' className='font-semibold'>Data de publicação</Label>
                <Select>
                    <SelectTrigger id='publishedDate' className='bg-white h-auto mt-2'>
                        <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='1'>Hoje</SelectItem>
                        <SelectItem value='2'>Esta semana</SelectItem>
                        <SelectItem value='3'>Últimas 2 semanas</SelectItem>
                        <SelectItem value='4'>Este mês</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </aside>

        <div className='flex gap-2'>
            <Input className='bg-white h-12 rounded-lg' placeholder='Buscar demanda' />
            <Button className='h-12 rounded-lg'><FiSearch /></Button>
        </div>

        <DemandList demands={demands} />
    </main>
}

export default EncontrarDemandas