"use client";

import { useParams } from "next/navigation";

function EditarGrupoDePesquisaPage() {
  const params = useParams();

  return(
    <h1>Hello Editar Grupo de Pesquisa {params.id}</h1>
  )
}

export { EditarGrupoDePesquisaPage }