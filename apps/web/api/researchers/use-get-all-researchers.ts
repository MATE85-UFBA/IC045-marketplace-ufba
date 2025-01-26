import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

async function getAllResearchers(): Promise<{ id: string; name: string }[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, false).get<{ id: string; name: string }[]>(
    `/researchers/all`
  );

  return data;
}

export default function useGetAllResearchers() {
  return useQuery({
    queryKey: ["all-researchers"],
    queryFn: getAllResearchers,
  });
}
