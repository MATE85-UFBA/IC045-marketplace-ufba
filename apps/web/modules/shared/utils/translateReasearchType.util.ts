import { EResearcherType } from "@/modules/detalhe-grupo-pesquisa/types/researchgroup.type";

export function translateResearchType(researcherType: EResearcherType) {
  return researcherType === "TEACHER" ? "Professor" : "Estudante";
}
