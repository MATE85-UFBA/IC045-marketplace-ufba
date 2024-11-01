# Playbooks

> Um playbook é um conjunto de instruções ou diretrizes detalhadas que descrevem como realizar tarefas ou resolver problemas específicos de forma eficiente e padronizada.  
> Em ambientes de desenvolvimento, operações ou gestão de projetos, playbooks são fundamentais para garantir que equipes sigam os mesmos passos ao lidar com processos complexos ou repetitivos.

<details>
  <summary style="font-size:16pt;font-weight: bold;">&nbsp;[INFRA] Como iniciar o ambiente de desenvolvimento?</summary>

1. Certifique-se que o docker está instalado.
2. Navegue até a pasta `/apps/api/infra` onde está localizado o DockerFile
3. Execute `docker build -t marketplace-db .` para construir a imagem da aplicação.
4. Execute `docker run -d -p 5432:5432 --name my-marketplace-db marketplace-db` para executar um container docker com a imagem da aplicação.
</details>


<details>
  <summary style="font-size:16pt;font-weight: bold;">&nbsp;[INFRA] Como criar as tabelas do banco?</summary>

1. Certifique-se que o container docker está em execução com `docker ps`.  Uma saida parecida com a seguinte deve ser exibida:
    ```
    CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS         PORTS                    NAMES
    4ac7835ed331   marketplace-db   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:5432->5432/tcp   romantic_swartz 
   ```
2. Navegue até a pasta `/apps/api`
3. Execute `npx prisma migrate deploy` para construir o banco de dados com base nas migrations existentes.
</details>