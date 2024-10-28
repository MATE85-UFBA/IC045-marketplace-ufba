import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MinhasDemandas = () => {
  return (
    <main className="flex justify-center ">
      <section className="flex flex-col w-full max-w-7xl px-10 pt-12">
        <div className="flex justify-between">
          <h1 className="font-bold text-4xl text-blue-strong">
            Minhas Demandas
          </h1>
          <Button className="rounded-full">+ Nova demanda</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Título
              </TableHead>
              <TableHead>
                Status
              </TableHead>
              <TableHead>
                Criado Em
              </TableHead>
              <TableHead>
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            
          </TableBody>
        </Table>
      </section>
    </main>
  );
};

export default MinhasDemandas;
