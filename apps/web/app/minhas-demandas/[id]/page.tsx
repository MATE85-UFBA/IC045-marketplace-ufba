"use client";

import { observer } from 'mobx-react-lite';
import { useParams } from 'next/navigation';

const Demanda = observer(() => {
  const params = useParams<{ id: string }>()



  return (
    <h1>Essa é a demanda de id {params.id}</h1>
  );
});

export default Demanda;
