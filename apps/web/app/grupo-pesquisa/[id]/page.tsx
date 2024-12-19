"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  return (
    <Link href={`/cadastro-projetos/${params.id}`}>cadastrar projeto</Link>
  );
}
