"use client";

import { observer } from 'mobx-react-lite';
import { useParams } from 'next/navigation';
import useAddTeste from '@/api/use-add-teste';

const Teste = observer(() => {

  const params = useParams<{ id: string }>()

  const {mutate} = useAddTeste();

  mutate(params.id, {})
  return (
    <h1>teste {params.id}</h1>
  );
});

export default Teste;
