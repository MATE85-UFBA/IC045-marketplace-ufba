import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CreateResearchGroup } from "@/types/researchGroup";

async function addResearchGroup(_data: CreateResearchGroup) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, true).post(
    `/researchgroup`,
    JSON.stringify(_data),
    { headers: { "content-type": "application/json" } }
  );
  return data;
}

export default function useAddResearchGroup(
  onSuccess: () => void,
  onError: () => void
) {
  return useMutation({
    mutationFn: (data: CreateResearchGroup) => addResearchGroup(data),
    onSuccess,
    onError,
  });
}
