import { UsersTable } from "./components/UsersTable";

const PainelAdministrativoPage = () => {
  return (
    <main className="max-w-screen-xl w-full px-8 mx-auto mb-auto grid">
      <h1 className="font-semibold text-4xl mt-12 mb-6">Usuários do Sistema</h1>

      <UsersTable />
    </main>
  );
};

export { PainelAdministrativoPage };
