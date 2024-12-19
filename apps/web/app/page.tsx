import { Button } from '@/components/ui/button';
import homeBanner from '@/public/home-banner.png';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto px-8 pb-8">
      <section className="flex flex-col lg:flex-row items-center py-8">
        <div className="relative w-full max-lg:text-center">
          <h2 className="font-semibold text-3xl sm:text-4xl leading-snug max-w-[40rem] mx-auto lg:mx-0">
            Transforme sua ideia em realidade com a parceria certa!
          </h2>
          <p className="text-blue-light mt-4 mb-8 max-w-[25rem] mx-auto lg:mx-0">
            Cadastre seu projeto e descubra grupos de pesquisa prontos para
            desenvolver soluções de impacto!
          </p>
          <div className="flex gap-4 flex-col sm:flex-row max-lg:justify-center">
            <Button className="rounded-full text-base px-9 py-2.5" asChild>
              <Link href="/cadastro-demandas">Cadastre sua ideia</Link>
            </Button>
            <Button
              variant={"outline"}
              className="rounded-full text-base px-9 py-2.5"
              asChild
            >
              <Link href="/encontrar-grupo-pesquisa">
                Conecte-se com especialistas
              </Link>
            </Button>
          </div>
        </div>
        <Image
          src={homeBanner}
          alt="Banner da página inicial"
          className="relative xl:-right-8 max-lg:my-8 lg lg:max-xl:h-80"
        />
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-medium">Como funciona?</h2>

        <ul className="grid md:grid-cols-8 lg:grid-cols-3 gap-6">
          <li className="px-8 py-12 rounded-2xl bg-white shadow-lg md:max-lg:col-span-4">
            <h3 className="font-medium text-xl text-center mb-8">
              1. Publique sua demanda
            </h3>
            <p className="text-blue-light font-medium text-xl text-center">
              Explique o que você precisa de forma detalhada. Inclua todas as
              especificações e requisitos para que os profissionais possam
              enviar propostas adequadas às suas necessidades.
            </p>
          </li>

          <li className="px-8 py-12 rounded-2xl bg-white shadow-lg md:max-lg:col-span-4">
            <h3 className="font-medium text-xl text-center mb-8">
              2. Receba sugestões de Grupos de Pesquisa
            </h3>
            <p className="text-blue-light font-medium text-xl text-center">
              Com base na descrição do seu projeto, nossa plataforma sugerirá
              grupos de pesquisa qualificados e aptos a desenvolvê-lo.
            </p>
          </li>

          <li className="px-8 py-12 rounded-2xl bg-white shadow-lg md:max-lg:col-span-4 md:max-lg:col-start-3">
            <h3 className="font-medium text-xl text-center mb-8">
              3. Selecione os pesquisadores
            </h3>
            <p className="text-blue-light font-medium text-xl text-center">
              Escolha o grupo de pesquisa que melhor atende às suas
              necessidades. Negocie os detalhes do projeto diretamente com o
              grupo escolhido e acompanhe o progresso conforme o trabalho é
              desenvolvido.{" "}
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
