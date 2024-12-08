"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ContactResearchGroup = () => {
  return (
    <main className="p-8 w-full flex flex-col flex-grow items-center">
      <section className="max-w-7xl itens-center w-full flex flex-col">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:text-blue-strong"
                href="/encontrar-grupo-pesquisa"
              >
                Encontrar Grupo de Pesquisa
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-bold">
                Contactar Grupo de Pesquisa
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="text-3xl sm:text-4xl font-semibold text-blue-strong mb-3">
          Contactar Grupo de Pesquisa
        </h2>
      </section>
      <section className="flex flex-col lg:flex-row gap-6 max-w-7xl">
        <aside className=" lg:w-1/4 bg-white p-5 flex flex-col rounded-xl border gap-4 h-hull">
          <h3 className="text-2xl sm:text-2xl font-semibold text-blue-strong self-center">
            Grupo de Pesquisa
          </h3>

          <span className="text-sm text-blue-light mt-2">
            Publicado há 2 dias
          </span>
          <p className="text-blue-strong text-justify leading-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            commodo, nisi ut maximus porttitor, lacus mauris fermentum elit, sed
            aliquet orci eros vitae felis. Aliquam in massa vitae metus viverra
            volutpat nec sit amet libero. Vestibulum vel ligula tincidunt,
            faucibus est ac, rutrum lectus. Integer id odio consectetur,
            malesuada metus a, suscipit arcu.
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="bg-secondary rounded-full py-2 px-3 text-xs text-blue-strong text-center">
              Área de Pesquisa
            </div>
          </div>
        </aside>
        <section className="lg:w-3/4 bg-white shadow rounded-xl p-5">
          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-strong">
              Entre em contato
            </h2>
          </section>
          <hr className="my-4" />
          <section className="flex flex-col gap-4">
            <p className="text-xl">
              <span className="font-semibold">Grupo de Pesquisa: </span> Nome do
              Grupo de Pesquisa
            </p>
          </section>
          <hr className="my-4" />
          <section className="flex flex-col gap-3">
            <h4 className="font-semibold text-xl">Demanda</h4>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o Demanda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demanda1">Demanda1</SelectItem>
                <SelectItem value="demanda2">Demanda2</SelectItem>
                <SelectItem value="demanda3">Demanda3</SelectItem>
              </SelectContent>
            </Select>
            <h4 className="font-semibold text-xl">Mensagem</h4>
            <Textarea placeholder="Descreva para a empresa a sua demanda..." />
            <Button
              type="submit"
              className="rounded-full w-fit self-end py-2 px-8"
            >
              Enviar Mensagem
            </Button>
          </section>
        </section>
      </section>
    </main>
  );
};

export default ContactResearchGroup;
