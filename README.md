# Softeo API
### 🔧 Instalação

> É necessário ter Docker na sua máquina local para executar os seguintes comandos.

- Rode os serviços `backend` e `db` com o comando `docker-compose up -d --build`.
- Lembre-se de parar o `MySQL` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers
- Esses serviços irão inicializar um container chamado  `softeo_api` e outro chamado `softeo_db`.

- Ele vai subir sua API na porta `3001`

## 🛠️ Construído com

* [Express](https://expressjs.com/pt-br/)
* [Node](https://nodejs.org/pt-br/docs/)
* [TypeScript](https://www.typescriptlang.org/)
* [MySQL](https://dev.mysql.com/doc/)
* [Prisma](https://www.prisma.io/docs/getting-started/quickstart)
* [Chai](https://www.chaijs.com/)
* [Mocha](https://mochajs.org/)
* [Sinon](https://sinonjs.org/releases/latest/)
* [Joi](https://joi.dev/api/?v=17.6.0)
* [JWT](https://jwt.io/)
