"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  return (
    <Link href={`/cadastro-competencias/${params.id}`}>
      cadastrar competência
    </Link>
  );
}
