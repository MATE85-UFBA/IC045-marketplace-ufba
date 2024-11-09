"use client";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from "next/image";

// representação da estrutura de dados
const myScheme = z.object({
  email : z.string()
                .min(1,'O e-mail é obrigatório')
                .email('Formato de e-mail inválido'),
  password: z.string(),
})

type loginUserFormData = z.infer<typeof myScheme>

const Login = () => {
  // aplicando validação ao formulário
  const { register, handleSubmit, formState: {errors} } = useForm<loginUserFormData>({
    resolver: zodResolver(myScheme)
  });


  function loginUser(data : loginUserFormData) {
    console.log(data);
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <section className="w-full max-w-sm bg-white px-8 py-8 rounded-lg shadow-lg">
        <Image style={{display:"block", margin:"0 auto"}} src={"/Logo.png"} alt="Logo Nexus" width={233} height={90} />
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
              {...register('email')}
            />
            { /* após o primeiro erro o react hook form entra em estado de watch*/}
            { errors.email && <span className="text-red-600">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className="border border-zinc-200 shadow-sm rounded-lg p-2"
              {...register('password')}
            />
          </div>
          <a href="" className="text-right text-xs underline">
            Esqueci minha senha
          </a>

          <button
            type="submit"
            className="rounded-full h-10 mt-8"
            style={{
              backgroundColor: "#6D5BD0",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Acessar
          </button>
        </form>

        <p className="text-xs text-center mt-12">
          Ainda não possui uma conta?{" "}
          <a href="#" className="text-center underline">
            cadastre-se
          </a>
        </p>
      </section>
    </main>
  );
};

export default Login;


//style={{backgroundColor: "#fff", padding: "48px 56px", borderRadius: "12px", width: "100%", maxWidth:"416px"}}
// uncontroled components busca os valores apenas no momento que faz o submit
// controled components anota ao estado cada interação do usuário com o campo, ocasionando muitas renderizações