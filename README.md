# Documentação da Aplicação de Comércio Eletrônico

## Visão Geral

A aplicação de comércio eletrônico é um projeto construído usando AWS CDK e AWS Lambda para criar uma API que permite interações com produtos.

## Estrutura do Projeto

O projeto é dividido em várias partes:

1. **Stacks:** As stacks AWS CDK que provisionam os recursos necessários na AWS.
2. **Funções Lambda:** As funções Node.js responsáveis pelo processamento da lógica de negócios.
3. **Tabelas DynamoDB:** A camada de armazenamento para os produtos.
4. **Camadas Lambda:** As camadas de código compartilhado entre as funções Lambda.
5. **API Gateway:** A interface para interagir com as funções Lambda.

## Stacks

### ProductsAppLayersStack

Uma stack que cria a camada compartilhada para as funções Lambda.

### ProductsAppStack

Uma stack que cria a tabela DynamoDB para armazenar informações de produtos e as funções Lambda para recuperar e administrar produtos.

### ECommerceApiStack

Uma stack que cria a API Gateway e integra com as funções Lambda para expor endpoints para interações externas.

## Funções Lambda

### ProductsFetchFunction

Responsável por recuperar informações sobre produtos da tabela DynamoDB.

### ProductsAdminFunction

Responsável por adicionar, atualizar e excluir produtos na tabela DynamoDB.

### API Gateway Request Handler

Responsável por rotear as solicitações da API Gateway para as funções Lambda apropriadas com base no método HTTP e no caminho da URL.

## Como Iniciar o Projeto

1. Configure suas credenciais da AWS.
2. Instale as dependências do projeto executando `npm install` na raiz do projeto.
3. Implante as stacks na AWS usando o comando `cdk deploy` em cada diretório de stack.

## Uso da API

A API oferece os seguintes endpoints:

- **GET /products:** Recupera a lista de produtos.
- **GET /products/{id}:** Recupera informações sobre um produto específico.
- **POST /products:** Adiciona um novo produto.
- **PUT /products/{id}:** Atualiza informações de um produto existente.
- **DELETE /products/{id}:** Exclui um produto.
