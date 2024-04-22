# Desafio BGC - Web Scraper com AWS.

## Tabela de Conteúdos

- [1. Introdução](#1-introdução)
- [2. Visão geral e Funcionalidades](#2-visão-geral-e-funcionalidades)
- [3. Arquitetura do projeto](#3-arquitetura-do-projeto)
- [4. Configuração e instalação](#4-configuração-e-instalação)
- [5. Integração com a API](#5-integração-com-a-api)

## 1. Introdução

Este projeto foi desenvolvido como parte do processo seletivo de estágio da empresa BGC. Seu objetivo principal é criar um web scraper que retorne os 3 produtos mais vendidos de um e-commerce (nesse projeto utilizamos o Mercado Livre).

O web scraper foi construído utilizando as seguintes tecnologias:

### Serverless Framework:

- AWS Lambda
- AWS API Gateway
- AWS DynamoDB

### Tecnologias de Desenvolvimento:

- Node.js 18.x

### Ferramentas de Web Scraping:

- Puppeteer 22.2.0
- Chromium 122.0.0

> O principal motivo pelo qual decidi utilizar o Puppeteer foi para me familiarizar com a ferramenta, já que é a utilizada nos projetos da BGC. Entretanto, ele também apresenta vantagens em relação a outras ferramentas de scraping disponíveis, principalmente devido à sua capacidade de automatizar tarefas em navegadores da web, como clicar em botões, preencher formulários e navegar nas páginas. Embora a versão atual do projeto não explore completamente essas capacidades do Puppeteer, planejo implementá-las em uma possível versão futura (v2).

## 2. Visão geral e Funcionalidades

O scraper desenvolvido neste projeto acessa a página de produtos mais vendidos do Mercado Livre e extrai informações relevantes, como ID do produto, nome, preço, categoria e URL da imagem. Ele retorna essas informações em formato JSON.

> O ID não está vinculado a um produto específico, mas sim à posição que esse produto ocupa na lista de produtos mais vendidos.

> Atualmente, o scraper não extrai os dados da categoria do produto. No entanto, essa informação foi incluída como um dos atributos do Produto visando uma versão futura (v2) do projeto, onde um novo endpoint será implementado para recuperar os produtos mais vendidos de cada categoria separadamente.

## 3. Arquitetura do Projeto

O projeto segue uma arquitetura modular, dividida em diferentes diretórios e arquivos, conforme descrito a seguir:

```
📦 bgc-desafio
│
└─── 📂 src
│    │   index.js
│    │
│    └─── 📂 core
│    │    │
│    │    └─── 📂 config
│    │         │   database.js
│    │    │
│    │    └─── 📂 scraper
│    │         │   mercadolivre_scraper.js
│    │
│    └─── 📂 features
│         │
│         └─── 📂 product
│              │
│              └─── 📂 controller
│              │    │   product_controller.js
│              │
│              └─── 📂 models
│              │    │   product_model.js
│              │
│              └─── 📂 repositories
│                   │   product_repository.js
│
└─── 📜 package-lock.json
└─── 📜 package.json
└─── 📜 readme.md
```

<details>
<summary>Mais Detalhes</summary>

- 📂 **core**: Contém arquivos de configuração e a lógica central do aplicativo.
  - 📂**config**: Configurações do banco de dados.
  - 📂 **scraper**: Lógica de scraping utilizando Puppeteer.
- 📂 **features**: Contém os módulos de funcionalidades específicas do aplicativo.
  - 📂 **product**: Módulo de produtos.
    - 📂 **controller**: Controladores para manipular solicitações HTTP.
    - 📂 **models**: Modelos de dados para representar os produtos.
    - 📂 **repositories**: Repositórios para interação com o banco de dados.
- 📜 **index.js**: Arquivo principal do aplicativo.
- 📜 **package-lock.json** e **package.json**: Gerenciamento de dependências.
- 📜 **readme.md**: Documentação do projeto.

</details>

### Fluxo de Funcionamento do Projeto

1. A requisição HTTP é recebida pelo Lambda através do API Gateway.
2. Com base na rota e no método HTTP, o Lambda invoca a função correspondente para processar a requisição.
3. No caso de uma requisição POST para salvar produtos, a função do Lambda executa o web scraper para obter os dados dos produtos mais vendidos.
4. Os dados extraídos são salvos no banco de dados DynamoDB.
5. Para uma requisição GET para recuperar produtos, a função do Lambda consulta o banco de dados e retorna os dados dos produtos armazenados.

## 4. Configuração e Instalação

Para configurar e utilizar o web scraper, siga estas etapas:

1. Clone o repositório do projeto.
2. Execute o comando `npm install` para instalar as dependências.
3. Para executar o web scraper e obter os dados dos produtos mais vendidos, acesse a rota do endpoint POST através de uma ferramenta como Postman.

<br>
<details>
  <summary>O web scraper não foi projetado para ser executado localmente. Em vez disso, é implementado na nuvem e executado quando uma requisição POST é feita para o endpoint <code>/products</code>
  </summary><br>
Apesar de ter sido mencionado que o scraper poderia ser executado localmente, decidi implementá-lo na nuvem e aproveitar essa oportunidade como um momento de aprendizado para me familiarizar com a AWS. Embora desafiador, o processo me proporcionou uma compreensão mais profunda dos serviços em nuvem e expandiu meu conhecimento técnico.
</details>

## 5. Integração com a API

### Base URL

`https://3buawvgca9.execute-api.us-east-1.amazonaws.com/prod/products`

### Endpoints

#### POST `/products`

Este endpoint permite salvar informações sobre os produtos mais vendidos do Mercado Livre no banco de dados. Não requer parâmetros de entrada na solicitação, pois os dados são enviados pelo web scraper.

##### Dados Obtidos

| Nome      | Tipo   | Descrição                  |
| --------- | ------ | -------------------------- |
| productId | String | O ID do produto            |
| name      | String | O nome do produto          |
| price     | Number | O preço do produto         |
| category  | String | A categoria do produto     |
| imgUrl    | String | O URL da imagem do produto |

##### Exemplo de solicitação

```json
{
  "productId": "12345",
  "name": "Exemplo de produto",
  "price": 99.99,
  "category": "Eletrônicos",
  "imgUrl": "https://example.com/image.jpg"
}
```

##### Exemplo de Resposta (Sucesso)

```json
{
  "status": true
}
```

##### Código de Status

- `200 OK`: A solicitação foi processada com sucesso.
- `500 Internal Server Error`: Ocorreu um erro interno no servidor.
- `502 Bad Gateway`: O servidor recebeu uma resposta inválida de um servidor upstream.
- `404 Not Found`: O recurso solicitado não foi encontrado.

#### GET `/products`

Este endpoint permite recuperar informações sobre os produtos salvos no banco de dados.

##### Exemplo de resposta

```json
[
  {
    "productId": "12345",
    "name": "Exemplo de produto",
    "price": 99.99,
    "category": "Eletrônicos",
    "imgUrl": "https://example.com/image.jpg"
  },
  {
    "productId": "67890",
    "name": "Outro exemplo de produto",
    "price": 49.99,
    "category": "Moda",
    "imgUrl": "https://example.com/image2.jpg"
  }
]
```

##### Código de Status

- `200 OK`: A solicitação foi processada com sucesso.
- `500 Internal Server Error`: Ocorreu um erro interno no servidor.

### Autenticação

Atualmente, a API não requer autenticação para acessar os endpoints.
