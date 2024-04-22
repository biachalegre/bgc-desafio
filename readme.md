# Desafio BGC - Web Scraper com AWS.

## Tabela de Conteúdos

- [1. Introdução](#1-introdução)
- [2. Visão geral e Funcionalidades do Web Scraper](#2-visão-geral-e-funcionalidades-do-web-scraper)
<!-- - [3. Arquitetura do projeto](#3-arquitetura-do-projeto)
- [4. Configuração e instalação](#4-configuração-e-instalação)
- [5. Integração com a API](#5-integração-com-a-api) -->

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

## 2. Visão geral e Funcionalidades do Web Scraper

Um web scraper é uma ferramenta de automação que extrai dados de sites da web.

O web scraper desenvolvido neste projeto acessa a página de produtos mais vendidos do Mercado Livre e obtém informações (nome, preço e imagem) dos 3 produtos mais vendidos.
