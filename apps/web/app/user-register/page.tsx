"use client";
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Logo from './assets/logo.png';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { EyeIcon, EyeOffIcon, MoveLeftIcon } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './register.form.schema';
import { registerStore } from '@/context/userRegisterContext';

type UserType = "COMPANY" | "RESEARCHER"

export default observer(function Cadastro() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const [utype, setUtype] = useState<UserType>("COMPANY");

  const onSubmit = form.handleSubmit(async (data) => {
    await registerStore.registerUser(
      {
        name: data.name,
        email: data.email,
        utype: utype,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      },
      router
    );
  });

  return (
    <div className="flex items-center justify-center flex-1 py-8">
      <Card className="w-full max-w-lg bg-white px-8 py-8 rounded-lg shadow-lg border-none flex flex-col items-center justify-center">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image src={Logo} alt="logo" width={55} height={90} />
          <h1 style={{ fontSize: 48 }}>NEXUS</h1>
        </div>
        <Form {...form}>
          <form onSubmit={onSubmit} className="mt-4 w-full">
            {registerStore.errorMessage && (
              <div style={{ color: "red", marginBottom: 16 }}>
                {registerStore.errorMessage}
              </div>
            )}
            <FormField
              control={form.control}
              name="utype"
              render={() => (
                <FormItem>
                  <FormLabel style={{ fontSize: 16 }}>
                    Tipo de Cadastro
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={utype}
                      onValueChange={(value: UserType) =>
                        setUtype(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={"empresa"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COMPANY">Empresa</SelectItem>
                        <SelectItem value="RESEARCHER">Pesquisador</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem style={{ marginTop: 16 }}>
                  <FormLabel style={{ fontSize: 16 }}>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem style={{ marginTop: 16 }}>
                  <FormLabel style={{ fontSize: 16 }}>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu e-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem style={{ marginTop: 16 }} className="relative">
                  <FormLabel style={{ fontSize: 16 }}>Senha</FormLabel>
                  <FormControl>
                    <Input
                      className="pr-8"
                      placeholder="Digite sua senha"
                      type={passwordVisible ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <span className="absolute right-3 top-8">
                      <button
                        type="button"
                        onClick={() => {
                          setPasswordVisible(!passwordVisible);
                        }}
                      >
                        {passwordVisible ? (
                          <EyeIcon
                            size={20}
                            className="cursor-pointer text-slate-600"
                          />
                        ) : (
                          <EyeOffIcon
                            size={20}
                            className="cursor-pointer text-slate-600"
                          />
                        )}
                      </button>
                    </span>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem style={{ marginTop: 16 }} className="relative">
                  <FormLabel style={{ fontSize: 16 }}>
                    Confirme sua senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="pr-8"
                      placeholder="Confirme sua senha"
                      type={passwordConfirmationVisible ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <span className="absolute right-3 top-8">
                      <button
                        type="button"
                        onClick={() => {
                          setPasswordConfirmationVisible(!passwordConfirmationVisible);
                        }}
                      >
                        {passwordConfirmationVisible ? (
                          <EyeIcon
                            size={20}
                            className="cursor-pointer text-slate-600"
                          />
                        ) : (
                          <EyeOffIcon
                            size={20}
                            className="cursor-pointer text-slate-600"
                          />
                        )}
                      </button>
                    </span>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full rounded-full h-12 mt-4"
              disabled={registerStore.isLoading}
            >
              {registerStore.isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </Form>
        <Link href={"/login"} className="flex items-center justify-center mt-4 hover:underline">
          <MoveLeftIcon />
          <p style={{ marginLeft: 5, fontSize: 12 }}>Voltar para login</p>
        </Link>
      </Card>
    </div>
  );
});
