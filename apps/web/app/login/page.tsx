"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { loginFormSchema, LoginUserFormData } from "./login.form.schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import loginStore from "@/context/loginContext/login.context";
import { authStore } from "@/context/loginContext";
import { loadUserFromLocalStorage } from "@/lib/user.storage";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = observer(() => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  async function loginUser(data: LoginUserFormData) {
    await loginStore.login(data.email, data.password, router); // Pass router to login method
    setUser(loadUserFromLocalStorage());
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <section className="w-full max-w-sm bg-white px-8 py-8 rounded-lg shadow-lg">
        <Image
          style={{ display: "block", margin: "0 auto" }}
          src={"/header-logo.png"}
          alt="Logo Nexus"
          width={233}
          height={90}
        />
        <form
          onSubmit={handleSubmit(loginUser)}
          className="flex flex-col gap-2 w-full max-w-sm mt-8"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              className="border border-zinc-200 shadow-sm rounded-lg p-2"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password">Senha</label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="border border-zinc-200 shadow-sm rounded-lg p-2"
              {...register("password")}
            />
            <span className="absolute right-3 top-10">
              <button type="button" onClick={()=> {setPasswordVisible(!passwordVisible)}}>
                {passwordVisible ? (
                  <EyeIcon size={20} className="cursor-pointer text-slate-600" />

                ) : (
                  <EyeOffIcon size={20} className="cursor-pointer text-slate-600"/>
                )}
              </button>
            </span>
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>
          <Link
            href="/recuperar-senha"
            className="text-right text-xs underline"
          >
            Esqueci minha senha
          </Link>

          <button
            type="submit"
            className="rounded-full h-10 mt-8"
            style={{
              backgroundColor: "#6D5BD0",
              fontWeight: "bold",
              color: "white",
            }}
            disabled={authStore.isLoading}
          >
            {authStore.isLoading ? "Carregando..." : "Acessar"}
          </button>

          {authStore.errorMessage && (
            <span className="text-red-600 text-sm text-center mt-2">
              {authStore.errorMessage}
            </span>
          )}
        </form>

        <p className="text-xs text-center mt-12">
          Ainda não possui uma conta?{" "}
          <Link href="/user-register" className="text-center underline">
            Cadastre-se
          </Link>
        </p>
      </section>
    </main>
  );
});

export default Login;
