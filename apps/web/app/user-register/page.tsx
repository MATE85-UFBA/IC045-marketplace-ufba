"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Logo from "./assets/logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import registerStore from "../store/user-register/user.register.store";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import {registerSchema} from "./register.form.schema";

export default observer(function Cadastro() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const [utype, setUtype] = useState<"empresa" | "pesquisador">("empresa");

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          maxWidth: 416,
          maxHeight: 760,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 48,
        }}
      >
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
          <form onSubmit={onSubmit} style={{ marginTop: 40, width: 320 }}>
            {registerStore.errorMessage && (
              <div style={{ color: "red", marginBottom: 16 }}>
                {registerStore.errorMessage}
              </div>
            )}
            <FormField
              control={form.control}
              name="utype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ fontSize: 16 }}>Tipo de Cadastro</FormLabel>
                  <FormControl>
                    <Select
                      value={utype}
                      onValueChange={(value) => setUtype(value as "empresa" | "pesquisador")}
                    >
                      <SelectTrigger style={{ marginTop: 0 }}>
                        <SelectValue placeholder={"empresa"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="empresa">Empresa</SelectItem>
                        <SelectItem value="pesquisador">Pesquisador</SelectItem>
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
                    <Input style={{ marginTop: 0 }} placeholder="Digite seu nome" {...field} />
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
                  <FormLabel style={{ fontSize: 16 }}>Email</FormLabel>
                  <FormControl>
                    <Input style={{ marginTop: 0 }} placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem style={{ marginTop: 16 }}>
                  <FormLabel style={{ fontSize: 16 }}>Senha</FormLabel>
                  <FormControl>
                    <Input
                      style={{ marginTop: 0 }}
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem style={{ marginTop: 16 }}>
                  <FormLabel style={{ fontSize: 16 }}>Confirme sua senha</FormLabel>
                  <FormControl>
                    <Input
                      style={{ marginTop: 0 }}
                      placeholder="Confirme sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              style={{
                width: 320,
                height: 55,
                borderRadius: 64,
                marginTop: 32,
                backgroundColor: "#6D5BD0",
              }}
              disabled={registerStore.isLoading}
            >
              {registerStore.isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </Form>
        <Link href={"/login"}>
          <div
            style={{
              display: "flex",
              marginBottom: 41,
              marginTop: 16,
              alignItems: "center",
              color: "#6E6893",
            }}
          >
            <MoveLeftIcon />
            <p style={{ marginLeft: 5, fontSize: 12 }}>Voltar para login</p>
          </div>
        </Link>
      </Card>
    </div>
  );
});
