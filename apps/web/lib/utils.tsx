import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Circle, CircleCheck, Timer } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function statusToTextColor(status: 'CREATED' | 'PENDING' | 'COMPLETED') {
  switch (status) {
    case "PENDING":
      return "text-yellow-800"; // Dark yellow text
    case "CREATED":
      return "text-blue-800";
    case 'COMPLETED':
      return "text-green-800";
    default:
      return "text-gray-800";   // Dark gray for unknown status
  }
}

export function statusToBGColor(status: 'CREATED' | 'PENDING' | 'COMPLETED') {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100"; // Light yellow background
    case "CREATED":
      return "bg-blue-100";  // Light green background
    case "COMPLETED":
      return "bg-green-100";  // Light green background
    default:
      return "bg-gray-100";   // Light gray for unknown status
  }
}


export function statusToReadable(status: 'CREATED' | 'PENDING' | 'COMPLETED') {
  switch (status) {
    case 'CREATED':
      return 'Aberta';
    case 'PENDING':
      return 'Pendente';
    case 'COMPLETED':
      return 'Atendida';
    default:
      return "Desconhecido"
  }
}


export function statusToBadge(status: 'CREATED' | 'PENDING' | 'COMPLETED') {

  const icon = statusToIcon(status)
  return <span title={statusToAlt(status)} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusToTextColor(status)} ${statusToBGColor(status)}`}>{icon}&nbsp;{statusToReadable(status)}</span>
}

export function statusToIcon(status: 'CREATED' | 'PENDING' | 'COMPLETED') {
  if(status === "COMPLETED") {
    return <CircleCheck width={14} height={14} />
  }else if(status === "PENDING") {
    return <Timer width={14} height={14} />
  }
  else if(status === "CREATED") {
    return <Circle width={14} height={14}/>
  }
}


export function statusToAlt(status: 'CREATED' | 'PENDING' | 'COMPLETED') {
  switch (status) {
    case 'CREATED':
      return "Demanda criada. Sem contato com grupo de pesquisa."
    case 'PENDING':
      return "Demanda em contato com grupo de pesquisa."
    case 'COMPLETED':
      return "Demanda atendida por um grupo de pesquisa"
  }
}