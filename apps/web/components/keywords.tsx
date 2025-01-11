import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { MultiSelect } from '@/components/ui/multi-select';
import { toast } from '@/hooks/use-toast';
import useAddKeyword from '../api/keywords/use-add-keyword';
import useGetKeywords from '../api/keywords/use-get-keywords';


function Keywords({ onChange, defaultValue = []  }: {onChange: Dispatch<SetStateAction<string[]>>, defaultValue: string[]}) {
  const {data: keywords = [], refetch} = useGetKeywords();
  const mappedKeywords = keywords.map(({name, id}) => ({label: name, value:id}))

  async function handleKeyword(name: string){
    keywordMutate(name);
    await refetch();
  }

  const { mutate: keywordMutate } = useAddKeyword(
    () => {
      toast({
        variant: "success",
        title: "Sucesso",
        description: "A palavra-chave foi cadastrada com sucesso.",
      });
    },
    () => {
      toast({
        variant: "destructive",
        title: "Ocorreu um error",
        description: "Ocorreu um erro ao tentar criar nova palavra-chave.",
      });
    }
  );

  return (
    <div className="font-bold text-base text-blue-strong">
      <label>Palavra-chave</label>
      <div className="flex items-center mt-2">
        <MultiSelect
          options={mappedKeywords}
          onValueChange={onChange}
          defaultValue={defaultValue}
          placeholder="Selecione palavras-chave"
          variant="inverted"
          maxCount={3}
          empty={(search) => <div className={"px-10"}><Button
            onClick={() => handleKeyword(search)}> Criar {search}</Button></div>}
        />
      </div>
    </div>
  );
}

export default Keywords;