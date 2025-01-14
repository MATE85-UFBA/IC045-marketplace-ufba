import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CreateCompetence } from "@/types/competence";

async function addCompetence(_data: CreateCompetence) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, true).post(
    `/competence`,
    JSON.stringify(_data),
    { headers: { "content-type": "application/json" } }
  );

  return data;
}

export default function useAddCompetence(
  onSuccess: () => void,
  onError: () => void
) {
  return useMutation({
    mutationFn: (data: CreateCompetence) => addCompetence(data),
    onSuccess,
    onError,
  });
}
