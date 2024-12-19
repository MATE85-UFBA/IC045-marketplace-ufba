"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import userService from '@/api/user.service';

const formSchema = z.object({
  email: z.string().email("Endereço de email inválido"),
});

export default function PasswordRecovery() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await userService.recoverPassword(data.email);
    setIsLoading(false);
    if (response.status !== 201) {
      toast({
        title: "Erro ao enviar email!",
        description: "Verifique se o email está correto.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Email enviado com sucesso!",
      description: "Verifique sua caixa de entrada.",
      variant: "success",
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-col items-center">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="logo" className="w-25 h-20 mb-4" />
            <h2 className="text-3xl font-bold text-blue-strong">
              COOPERA-UFBA
            </h2>
          </div>
          <CardTitle>Recuperação de Senha</CardTitle>
          <CardDescription>
            Para recuperar a senha, informe abaixo o email de cadastro e uma
            nova senha será enviada para o email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 flex flex-col justify-center  ">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isLoading}>
                Enviar Email
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
