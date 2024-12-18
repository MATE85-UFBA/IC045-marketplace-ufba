'use client';

import { useParams } from "next/navigation";

function EditarDemandaPage() {
  const params = useParams();

  return (
    <h1>Hello Editar Demanda {params.id}</h1>
  )
}

export { EditarDemandaPage }