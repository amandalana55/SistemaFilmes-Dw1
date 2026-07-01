🎬 Sistema de Filmes

Meu Projeto

Neste projeto desenvolvi um sistema de gerenciamento de filmes, onde o usuário pode cadastrar filmes, visualizar todos os filmes cadastrados, avaliá-los com notas de 1 a 5 estrelas, visualizar um ranking baseado na média das avaliações e excluir filmes ou avaliações.

O sistema foi desenvolvido utilizando Front-end e Back-end, permitindo a comunicação com um banco de dados PostgreSQL para armazenar todas as informações.

Funcionalidades

- Cadastrar novos filmes;
- Visualizar todos os filmes cadastrados;
- Excluir filmes;
- Avaliar filmes utilizando estrelas de 1 a 5;
- Visualizar o ranking dos filmes com base na média das avaliações;
- Excluir avaliações;
- Limpar todo o ranking de avaliações.

---
Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- PostgreSQL

---

## Banco de Dados

O banco de dados possui duas tabelas.

Tabela: filmes

| Campo | Tipo |
|--------|------|
| id | SERIAL PRIMARY KEY |
| titulo | VARCHAR(100) |
| genero | VARCHAR(50) |
| ano | INTEGER |

Tabela: avaliacoes

| Campo | Tipo |
|--------|------|
| id | SERIAL PRIMARY KEY |
| filme_id | INTEGER REFERENCES filmes(id) |
| nota | INTEGER |

---

Rotas da API

| Método | Rota | Função |
|---------|------|---------|
| GET | /filmes | Lista todos os filmes |
| POST | /filmes | Cadastra um novo filme |
| DELETE | /filmes/:id | Remove um filme |
| POST | /avaliacoes | Cadastra uma avaliação |
| DELETE | /avaliacoes/:id | Remove uma avaliação |
| GET | /ranking | Exibe o ranking dos filmes |
| DELETE | /ranking | Limpa todas as avaliações |

---

Como Funciona

Cadastro de Filmes

O usuário informa:

- título;
- gênero;
- ano de lançamento.

Essas informações são enviadas para o servidor utilizando **fetch()** e o método **POST**. O servidor recebe os dados, verifica se o filme já está cadastrado e, caso não exista, salva as informações no banco de dados PostgreSQL.

---

Visualização dos Filmes

Ao clicar em **Ver Filmes**, o Front-end realiza uma requisição utilizando o método **GET** para buscar todos os filmes cadastrados no banco de dados.

Os filmes são exibidos na tela juntamente com a opção de excluí-los.

---

Avaliações

O usuário seleciona um filme e atribui uma nota utilizando estrelas de 1 a 5.

Essa avaliação é enviada ao servidor através do método **POST** e armazenada na tabela **avaliacoes**.

---

Ranking

O ranking é gerado utilizando uma consulta SQL que calcula a média das notas de cada filme.

Os filmes são ordenados da maior para a menor média, permitindo visualizar quais receberam as melhores avaliações.

---
Como executar o projeto

1. Clone o repositório

```bash
git clone https://github.com/amandalana55/projeto-dw1.git
```

2. Instale as dependências

Dentro da pasta **backend**, execute:

```bash
npm install
```

3. Configure o arquivo `.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=trabalho
DB_USER=postgres
DB_PASSWORD=sua_senha
PORT=3001
```
4. Execute o script SQL

Crie o banco de dados no PostgreSQL utilizando o arquivo:

```
banco_de_dados/banco.sql
```

---

5. Inicie o servidor

Na pasta **backend** execute:

```bash
node server.js
```

---

6. Abra o Front-end

Abra o arquivo **index.html** da pasta **frontend** em seu navegador.

---
Desenvolvedora

Amanda Lana
