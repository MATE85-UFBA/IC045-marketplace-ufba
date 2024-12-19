import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CreateProject } from "@/types/project";

async function addProject(_data: CreateProject) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, true).post(
    `/project`,
    JSON.stringify(_data),
    { headers: { "content-type": "application/json" } }
  );

  return data;
}

export default function useAddProject(
  onSuccess: () => void,
  onError: () => void
) {
  return useMutation({
    mutationFn: (data: CreateProject) => addProject(data),
    onSuccess,
    onError,
  });
}
