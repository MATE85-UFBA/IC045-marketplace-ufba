"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import userService from "@/api/user.service";
import { useSearchParams } from "next/navigation";

const formSchema: z.ZodSchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha precisa ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "A senha precisa ter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha precisa ter pelo menos uma letra minúscula")
      .regex(/\d/, "A senha precisa ter pelo menos um número")
      .regex(
        /[^a-zA-Z0-9]/,
        "A senha precisa ter pelo menos um caractere especial"
      ),

    passwordConfirmation: z.string(),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas não coincidem",
        path: ["passwordConfirmation"],
      });
    }
  });

export default function PasswordRecovery() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await userService.resetPassword(
      token ?? "",
      data.password
    );
    if (response.status !== 200) {
      toast({
        title: "Erro ao alterar a senha",
        description:
          "Não foi possível alterar a senha, tente novamente mais tarde",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Senha alterada com sucesso",
      variant: "success",
    });
    setIsLoading(false);
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
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 flex flex-col justify-center">
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-red-500 text-sm">
                    {String(form.formState.errors.password.message)}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="passwordConfirmation">Confirme a senha</Label>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  placeholder="Confirme sua senha"
                  {...form.register("passwordConfirmation")}
                />
                {form.formState.errors.passwordConfirmation && (
                  <p className="text-red-500 text-sm">
                    {String(form.formState.errors.passwordConfirmation.message)}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isLoading}>
                Enviar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
