# Projeto Store Manager! :department_store:
Projeto desenvolvido por mim durante o curso de Desenvolvimento Web na Trybe. Divulgado aqui como portfólio de aprendizado.

<details>
<summary><strong>Objetivos do projeto:</strong></summary>

  * Desenvolver uma API que é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas.
  * Verificar se eu era capaz de:
    * Desenvolver a API utilizando a arquitetura MSC `model-service-controller`.
    * Desenvolver uma API `RESTful`.
    * Utilizar o banco de dados `MySQL` para a gestão de dados.
</details>
<details>
<summary><strong> Requisitos do projeto:</strong></summary>

  * Criar o endpoint GET /talker.
  * Criar o endpoint GET /talker/:id.
  * Criar o endpoint POST /login.
  * Adicionar as validações para o endpoint /login.
  * Criar o endpoint POST /talker.
  * Criar o endpoint PUT /talker/:id.
  * Criar o endpoint DELETE /talker/:id.
  * Criar o endpoint GET `/talker/search` e o parâmetro de consulta `q=searchTerm`.
  * Requisitos Bônus:
    * Criar no endpoint GET `/talker/search` o parâmetro de consulta `rate=rateNumber`.
    * Criar no endpoint GET `/talker/search` o parâmetro de consulta `date=watchedDate`.
    * Criar o endpoint PATCH `/talker/rate/:id`.
    * Criar o endpoint GET `/talker/db`.
</details>
  
## Rodando o projeto localmente

Para rodar o projeto em sua máquina, abra seu terminal, crie um diretório no local de sua preferência com o comando `mkdir` e acesse o diretório criado com o comando `cd`:

```bash
mkdir meu-diretorio &&
cd meu-diretorio
```

Clone o projeto com o comando `git clone`:

```bash
git clone git@github.com:marcosadrianoti/tb-talker-manager.git
```

Acesse o diretório do projeto com o comando `cd`:

```bash
cd tb-talker-manager
```

Instale as dependências executando:

```bash
npm install
```

Execute a aplicação:

```bash
npm run start
```
