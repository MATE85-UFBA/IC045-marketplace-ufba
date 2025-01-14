export interface GrupoPesquisa {
  id: string;
  name: string;
  description: string;
  img: string;
  urlCNPQ: string;
  leader: {
    id: number;
    name: string;
    email: string;
    typeReseacher: string;
  };
  members: [];
  competences: [];
  knowlegdeAreas: [];
  createdAt: string;
  /*
  status: string; //todo fazer um enum
  company: {
    image: string
    name: string
    address: {
      city: string
      state: string
      country: string
    }
  }

  id: 2,
            name: "Onda Digital",
            description: "O Programa Onda Digital (POD) foi criado em 2004, sob a coordenação do Departamento de Ciência da Computação (DCC) do Instituto de Matemática e Estatística (IME), da Universidade Federal da Bahia (UFBA), como um programa permanente de extensão. Tendo como missão “contribuir com a inclusão sociodigital na Bahia, envolvendo a Universidade em ações educativas e de difusão da filosofia do Software Livre”, o POD atua de forma colaborativa, incentivando a interdisciplinaridade com o envolvimento de profissionais de computação, professores, funcionários e estudantes da UFBA de diferentes unidades de ensino da universidade atuando como estudantes-educadores.",
            img: "",
            urlCNPQ: "",
            leader: "",
            members: [],
            competences: [],
            knowlegdeAreas: [ { id: 1, name: "Ações afirmativas" }, { id: 2, name: "Inclusão Digital"} ]


    */
}
