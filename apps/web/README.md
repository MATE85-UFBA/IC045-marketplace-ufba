# Marketplace UFBA

## Tecnologias:

- Next.js
- Axios

## Configuração de Ambiente:

Para começar, instale todas as dependências do projeto com o seguinte comando:

```bash
npm install
```

Para iniciar, utilize o seguinte comando:

```bash
npm run dev
```

## Estrutura das pastas

O projeto segue a estrutura de pastas a seguir:

```MARKDOWN
📂web
	|__ 📂api
		|__ 📂demandas
		|__ 📂[entidade]
	|__ 📂app
		|__ 📂nova-pagina
			|__ 📄page.tsx
		|__ 📂\[nome-da-rota]
	|__ 📂context
		|__ 📂userContext
		|__ 📂\[nomeDoContexto]
	|__ 📂cypress
	|__ 📂hooks
	|__ 📂lib
	|__ 📂modules
		|__ 📂shared
			|__ 📂components
			|__ 📂interfaces
			|__ 📂utils
		|__ 📂nova-pagina
			|__ 📂components
			|__ 📂interfaces
			|__ 📂utils
			|__ 📄NovaPaginaPage.tsx
		|__ 📂\[nome-da-rota]
	|__ 📂public
```
### Pasta `web/app/[nome-da-rota]`

O nome dessa pasta corresponde ao nome que aparecerá no navegador, e deve ser escrito em português com palavras separadas por hífen e sem acentuação, ex.:  `/nova-pagina`.

A pasta deve conter apenas o arquivo `page.tsx`, responsável exclusivamente por renderizar o componente raiz, sem incluir lógica, regras de negócio, HTML ou outros elementos.

Exemplo de implementação do arquivo `web/app/home/page.tsx`.

```TSX
import { PerfilUsuarioPage } from 'modules/home/PerfilUsuarioPage'

export function PerfilUsuario(){
  return (
    <PerfilUsuarioPage/>
  )
}
```

### Pasta `web/modules/[nome-da-rota]`

O nome dessa pasta deve ser escrito em português com palavras separadas por hífen e sem acentuação, ex.:  `/nova-pagina`.

A pasta deve conter tudo que é específico para esta página web, como `/components`, `interfaces`, `utils` e outros.

```
|__ 📂nova-pagina
	|__ 📂components
	|__ 📂interfaces
	|__ 📂utils
	|__ 📄NovaPaginaPage.tsx
```

Deve existir um componente raiz que renderiza toda a lógica, regra de negócio, HTML e afins e será utilizada pelo `web/app/[nome-da-rota]/page.tsx`.

Exemplo de implementação do arquivo `web/app/home/page.tsx`.

````TSX
export function PerfilUsuarioPage(){
	const getUserData = (id:string)=>{
	  // Logica para coletar dados do usuario
	}

  return (
    <main>
      <div>
        <h1>Olá {userData.nome}<h1>
      </div>
    </main>
  )
}
````