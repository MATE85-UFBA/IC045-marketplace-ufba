"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { AdminUpdateUser, UserRole, UserStatus } from "@/types/user";
import useAdminUpdateUser from "@/api/admin/user/use-update-users";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string(),
  role: z.string(),
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
      name: user.name,
      role: user.role,
      status: user.status,
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  
  const { mutate, isPending } = useAdminUpdateUser(user.id,
    () => {
      toast({
        variant: "success",
        title: "Sucesso",
        description: "Permissões atualizadas com sucesso.",
      });
      
      router.refresh();
    },
    () => {
      toast({
        variant: "destructive",
        title: "Ocorreu um problema",
        description: "Não foi possível atualizar as permissões.",
      });
    }
  );

  function onSubmit(data: z.infer<typeof FormSchema>) {

    closeModal();

    const userData: AdminUpdateUser = {
      role: data.role as UserRole,
      status: data.status as UserStatus,
    }
    mutate(userData);
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
           { isPending ? "Salvando" : "Salvar" }
          </Button>
        </div>
      </form>
    </Form>
  );
}
