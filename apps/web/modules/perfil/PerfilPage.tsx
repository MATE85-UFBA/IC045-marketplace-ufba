"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Edit } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContextType, useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const updateUserFormData = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  email: z.string().trim().email("E-mail inválido"),
  lattes: z.string().trim().url("Link inválido").optional(),
  contactName: z.string().trim().optional(),
  contactEmail: z.string().trim().email("E-mail inválido").optional(),
  contactPhone: z.string().trim().url("Formato do link inválido").optional(),
  img: z.any(),
});

function PerfilPage() {
  const { user, setUser } = useUser();

  const [isEditing, setIsEditing] = useState(false);

  function toggleIsEditingUser() {
    setIsEditing(!isEditing);
  }

  const form = useForm<z.infer<typeof updateUserFormData>>({
    resolver: zodResolver(updateUserFormData),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      img: user?.img,
    },
  });

  function onSubmit(data: z.infer<typeof updateUserFormData>) {
    toast({
      title: "Cadastro atualizado com sucesso!",
      variant: "success",
    });

    const updatedUser = {
      id: user?.id,
      name: data.name,
      email: data.email,
      img: data.img,
      role: user?.role,
      utype: user?.utype,
    } as UserContextType;

    setUser(updatedUser);
    toggleIsEditingUser();
  }

  return (
    <main className="max-w-screen-xl w-full px-8 mx-auto mb-auto">
      <div className="flex w-full justify-between items-center mt-12 mb-8">
        <h1 className="font-semibold text-4xl">Meu perfil</h1>
        <Button
          className="rounded-full"
          onClick={toggleIsEditingUser}
          disabled={isEditing}
        >
          <Edit color="white" />
          {isEditing ? "Editando..." : "Editar cadastro"}
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white shadow rounded-xl p-8 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Nome"
                    className="bg-white h-12 text-blue-strong"
                    disabled={!isEditing}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>

                <FormControl>
                  <Input
                    placeholder="E-mail"
                    className="bg-white h-12 text-blue-strong"
                    disabled={!isEditing}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {user?.utype === "RESEARCHER" ? (
            <>
              <FormField
                control={form.control}
                name="lattes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currículo lattes</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Informe o link do seu currículo lattes"
                        className="bg-white h-12 text-blue-strong"
                        disabled={!isEditing}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          ) : user?.utype === "COMPANY" ? (
            <>
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nome para Contato
                      <small className="text-blue-light pl-1">(opcional)</small>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Informe um nome para contato"
                        className="bg-white h-12 text-blue-strong"
                        disabled={!isEditing}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      E-mail para contato
                      <small className="text-blue-light pl-1">(opcional)</small>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Informe um e-mail para contato"
                        className="bg-white h-12 text-blue-strong"
                        disabled={!isEditing}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Telefone para contato
                      <small className="text-blue-light pl-1">(opcional)</small>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Informe um telefone para contato"
                        className="bg-white h-12 text-blue-strong"
                        disabled={!isEditing}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          ) : (
            <></>
          )}

          {isEditing && (
            <div className="flex flex-row-reverse gap-4">
              <Button type="submit" className="w-full">
                Salvar
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={toggleIsEditingUser}
              >
                Cancelar
              </Button>
            </div>
          )}
        </form>
      </Form>
    </main>
  );
}

export { PerfilPage };
