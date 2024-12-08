"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserType } from "../../types/user";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  utype: z.string(),
  status: z.string(),
});

interface EditFormProps {
  user: UserType;
  closeModal: () => void;
}

export function EditForm({ user, closeModal }: EditFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: user.id,
      name: user.name,
      role: user.role,
      utype: user.utype,
      status: user.status,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    closeModal();
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  disabled
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Papel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white h-12 text-blue-strong">
                    <SelectValue placeholder="Selecione o papel do usuário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                  <SelectItem value="USER">Usuário</SelectItem>
                  <SelectItem value="NONE">Nenhum</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="utype"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de acesso</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white h-12 text-blue-strong">
                    <SelectValue placeholder="Selecione o tipo do usuário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="COMPANY">Empresa</SelectItem>
                  <SelectItem value="RESEARCHER">Pesquisador</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white h-12 text-blue-strong">
                    <SelectValue placeholder="Selecione o tipo do usuário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="APPROVED">Aprovado</SelectItem>
                  <SelectItem value="BLOCKED">Bloqueado</SelectItem>
                  <SelectItem value="PENDING">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={closeModal}
          >
            Cancelar
          </Button>
          <Button type="submit" className="w-full">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
