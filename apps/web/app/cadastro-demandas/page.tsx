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
import { Switch } from "@/components/ui/switch";

import { useForm } from "react-hook-form";
// import { addDemanda, CreateDemanda } from "@/api/demandas"; // Comentado para evitar dependência do backend

const CadastrarDemanda = () => {
  // Tipagem simulada para evitar erro
  type CreateDemanda = {
    titulo: string;
    links?: string;
    descricao: string;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateDemanda>();

  // Função mock para substituir o backend
  const onSubmit = (data: CreateDemanda) => {
    console.log("Dados enviados (mock):", data);
    alert("Demanda cadastrada (mock). Backend ainda não implementado.");
  };

  return (
    <main className="p-8 w-full flex justify-center">
      <section className="max-w-7xl w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:text-blue-strong" href="/minhas-demandas">
                Minhas Demandas
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-bold">
                Cadastrar Demandas
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex mb-4">
          <h2 className="text-4xl font-bold text-blue-strong">
            Cadastrar Demanda
          </h2>
        </div>
        <div className="p-4 bg-white shadow rounded-xl mt-4 h-[700] max-w-[1350]">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="font-bold text-blue-strong mt-4">
              Título*
              <input
                {...register("titulo", { required: true })}
                type="text"
                placeholder="Título do projeto"
                className="w-full py-3 px-4 text-base font-medium rounded-lg border mt-2"
              />
              {errors.titulo && (
                <span className="text-red font-normal text-sm">
                  Titulo é obrigatório
                </span>
              )}
            </label>

            <label className="font-bold text-blue-strong mt-4">
              Descrição*
              <textarea
                {...register("descricao", { required: true })}
                placeholder="Digite o texto..."
                rows={4}
                className="w-full py-3 px-4 text-base font-normal border rounded-lg mt-2"
              />
            </label>

            <div className="flex gap-2 items-center">
              <Switch />
              <label>Demanda Pública? </label>
            </div>

            {errors.links && <span>This field is required</span>}
            <label className="font-bold text-blue-strong mt-4">
              Links Úteis
              <input
                type="url"
                placeholder="Informe links úteis"
                className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                {...register("links", { required: false })}
              />
            </label>

            <div className="font-bold text-base text-blue-strong">
              <label>Anexo</label>
              <div className="flex items-center mt-2">
                <Button className="rounded-full py-2.5 px-8">
                  Adicionar anexo
                </Button>
              </div>
            </div>

            {errors.descricao && <span>This field is required</span>}

            <div className="flex gap-4 justify-center mt-10">
              <Button
                variant={"outline"}
                className="rounded-full py-2.5 px-8"
                type="reset"
              >
                Cancelar
              </Button>
              <Button type="submit" className="rounded-full py-2.5 px-8">
                Cadastrar demanda
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CadastrarDemanda;

/*
                                            ########################
                                            ##                    ##
                                            ## CÓDIGO COM BACKEND ##
                                            ##                    ##
                                            ########################

"use client"

import React from 'react';
import { useForm } from "react-hook-form";
import { addDemanda, CreateDemanda } from "@/api/demandas";

const CadastrarDemanda = () => {

    const { handleSubmit, register, formState: { errors } } = useForm<CreateDemanda>();

    const onSubmit = (data: CreateDemanda) => addDemanda(data);
    return (
        <div style={{ padding: '2rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                //justifyContent: 'relative',
                marginBottom: '1rem',
                position: 'relative',
                top: '0rem'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#24213B',
                    margin: '0'
                }}>
                    Cadastrar Demanda
                </h1>
            </div>

            <div style={{
                maxWidth: '1350px',
                height: '700px',
                margin: '0 auto',
                padding: '2rem',
                backgroundColor: '#F5F4FF',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginTop: '2rem'
            }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit(onSubmit)}>
                    {errors.titulo && <span style={{ color: "red" }}>Titulo é obrigatório</span>}

                    <label style={{ fontWeight: 'bold', color: '#24213B' }}>
                        Título
                        <input
                            {...register("titulo", { required: true })}
                            type="text"
                            placeholder="Título do projeto"
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                border: '1px solid #DDD',
                                borderRadius: '8px',
                                marginTop: '0.5rem',
                            }}
                        />
                    </label>

                    {errors.links && <span>This field is required</span>}
                    <label style={{ fontWeight: 'bold', color: '#24213B', marginTop: '1rem' }}>
                        Links Úteis
                        <input
                            type="url"
                            placeholder="Informe links úteis"
                            {...register("links", { required: false })}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                border: '1px solid #DDD',
                                borderRadius: '8px',
                                marginTop: '0.5rem',
                            }}
                        />
                    </label>



                    <div style={{ fontWeight: 'bold', color: '#24213B', marginTop: '1rem' }}>
                        <label>Anexo</label>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '0.5rem',
                        }}>
                            <button type="button" style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#6C63FF',
                                color: 'white',
                                borderRadius: '30px',
                                border: 'none',
                                cursor: 'pointer',
                            }}>Adicionar anexo</button>
                        </div>
                    </div>

                    {errors.descricao && <span>This field is required</span>}

                    <label style={{ fontWeight: 'bold', color: '#24213B', marginTop: '1rem' }}>
                        Descrição
                        <textarea
                            {...register("descricao", { required: true })}
                            placeholder="Digite o texto..."
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                border: '1px solid #DDD',
                                borderRadius: '8px',
                                marginTop: '0.5rem',
                            }}
                        />
                    </label>


                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '40px 0 0 0' }}>
                        <button type="button" style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'transparent',
                            border: '1px solid #6C63FF',
                            borderRadius: '30px',
                            color: '#6C63FF',
                            cursor: 'pointer'
                        }}>Cancelar</button>
                        <button type="submit" style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#6C63FF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer'
                        }}>Cadastrar demanda</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastrarDemanda;
*/
