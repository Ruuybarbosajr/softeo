import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/api/app';
import sinon from 'sinon'
import repository from '../src/database/Repository';
import {
  newClientMock,
  clientMock,
  allClientMock,
  clientUpdatedMock,
  clientUpdateMock
} from './mocks/clientMock'
import { adminMock } from './mocks/adminMock'
import generateToken from '../src/utils/generateToken';
chai.use(chaiHttp);

const token = generateToken(
  { id: adminMock.id, username: adminMock.username }
);

describe('Testa rota /client/create', () => {
  describe('Em caso de sucesso', () => {

    before(() => {
      sinon.stub(repository.client, 'readOne').resolves(null);
      sinon.stub(repository.client, 'create').resolves(clientMock);
    });

    after(() => {
      (repository.client.create as sinon.SinonStub).restore();
      (repository.client.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 201 e o cliente criado', async () => {
      const { status, body } = await chai.request(server)
        .post('/client/create')
        .set('Authorization', token)
        .send(newClientMock);

      expect(status).to.be.equal(201);
      expect(body).to.deep.equal({
        ...clientMock,
        services: clientMock.services.map((service) => ({ ...service, createdAt: service.createdAt.toISOString() }))
      });
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.client, 'readOne').resolves();
        sinon.stub(repository.client, 'create').resolves();
      });

      after(() => {
        (repository.client.create as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });
      
      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .post('/client/create')
          .set('Authorization', 'tokeninvalido')
          .send(newClientMock);
      
        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });

    describe('Caso algum campo do body seja inválido', () => {
      before(() => {
        sinon.stub(repository.client, 'readOne').resolves();
        sinon.stub(repository.client, 'create').resolves();
      });
  
      after(() => {
        (repository.client.create as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 400 e a mensagem "Campos inválidos"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .post('/client/create')
          .set('Authorization', token)
          .send({ ...newClientMock, name: '' });
  
        expect(status).to.be.equal(400);
        expect(message).to.be.equal('Campos inválidos');
      });
    });

    describe('Caso o cliente já tenha cadastro', () => {
      before(() => {
        sinon.stub(repository.client, 'readOne').resolves(clientMock);
        sinon.stub(repository.client, 'create').resolves();
      });
  
      after(() => {
        (repository.client.create as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 409 e a mensagem "Cliente já está cadastrado"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .post('/client/create')
          .set('Authorization', token)
          .send(newClientMock);
  
        expect(status).to.be.equal(409);
        expect(message).to.be.equal('Cliente já está cadastrado');
      });
    });
  });
});

describe('Testa rota /client/:id', () => {

  describe('Em caso de sucesso', () => {
    before(() => {
      sinon.stub(repository.client, 'readOne').resolves(clientMock);
    });

    after(() => {
      (repository.client.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 200 e o cliente', async () => {

      const { status, body } = await chai
        .request(server)
        .get('/client/197c7ac9-1054-44c1-909b-725a0fc14454')
        .set('Authorization', token);
      
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal({
        ...clientMock,
        services: clientMock.services.map((service) => {
          return {
            ...service,
            createdAt: service.createdAt.toISOString()
          }
        })
      });
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o cliente não esteja cadastrado', () => {
      before(() => {
        sinon.stub(repository.client, 'readOne').resolves(null);
      });

      after(() => {
        (repository.client.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 404 e uma mensagem "Cliente não encontrado"', async () => {

        const { status, body: { message } } = await chai
          .request(server)
          .get('/client/198c7ac9-1054-44c1-909b-725a0fc14454')
          .set('Authorization', token);

        expect(status).to.be.equal(404);
        expect(message).to.be.equal('Cliente não encontrado')
      });
    });

    describe('Caso o id seja inválido', () => {
      before(() => {
        sinon.stub(repository.client, 'readOne').resolves();
      });

      after(() => {
        (repository.client.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 400 e uma mensagem "Id inválido"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .get('/client/idinvalido')
          .set('Authorization', token);

        expect(status).to.be.equal(400);
        expect(message).to.be.equal('Id inválido');
      });
    });

    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.client, 'readOne').resolves();
      });
  
      after(() => {
        (repository.client.readOne as sinon.SinonStub).restore();
      });
      
      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .get('/client/197c7ac9-1054-44c1-909b-725a0fc14454')
          .set('Authorization', 'tokeninvalido')
      
        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });
  });
});

describe('Testa rota /client/all', () => {
  describe('Em caso de sucesso', () => {
    
    before(() => {
      sinon.stub(repository.client, 'readAll').resolves(allClientMock)
    });

    after(() => {
      (repository.client.readAll as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 200 e um array com todos os usuários', async () => {
      const { status, body } = await chai
        .request(server)
        .get('/client/all')
        .set('Authorization', token)

      expect(status).to.be.equal(200)
      expect(body).to.deep.equal(allClientMock.map((client) => {
        return {
          ...client,
          services: client.services.map((service) => ({ ...service, createdAt: service.createdAt.toISOString () }))
        }
      }))
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.client, 'readAll').resolves();
      });
  
      after(() => {
        (repository.client.readAll as sinon.SinonStub).restore();
      });
      
      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .get('/client/all')
          .set('Authorization', 'tokeninvalido')
      
        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });
  });
});

describe('Testa rota /client/update/:id', () => {
  describe('Em caso de sucesso', () => {
    
    before(() => {
      sinon.stub(repository.client, 'update').resolves(clientUpdatedMock)
      sinon.stub(repository.client, 'readOne').resolves(clientMock);
    });

    after(() => {
      (repository.client.update as sinon.SinonStub).restore();
      (repository.client.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 200 e o objeto atualizado', async () => {
      const { status, body } = await chai
        .request(server)
        .put('/client/update/197c7ac9-1054-44c1-909b-725a0fc14454')
        .set('Authorization', token)
        .send(clientUpdateMock);

      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(clientUpdatedMock);
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.client, 'update').resolves();
        sinon.stub(repository.client, 'readOne').resolves();
      });
  
      after(() => {
        (repository.client.update as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });
      
      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .put('/client/update/197c7ac9-1054-44c1-909b-725a0fc14454')
          .set('Authorization', 'tokeninvalido')
          .send(clientUpdatedMock);
      
        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });
    
    describe('Caso o cliente não esteja cadastrado', () => {
      before(() => {
        sinon.stub(repository.client, 'update').resolves();
        sinon.stub(repository.client, 'readOne').resolves(null);
      });
  
      after(() => {
        (repository.client.update as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 404 e uma mensagem "Cliente não encontrado"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .put('/client/update/197c7ac9-1054-44c1-909b-725a0fc14455')
          .set('Authorization', token)
          .send(clientUpdatedMock)

        expect(status).to.be.equal(404);
        expect(message).to.be.equal('Cliente não encontrado');
      });
    });

    describe('Caso algum campo do body seja inválido', () => {
      before(() => {
        sinon.stub(repository.client, 'readOne').resolves();
        sinon.stub(repository.client, 'update').resolves();
      });
  
      after(() => {
        (repository.client.readOne as sinon.SinonStub).restore();
        (repository.client.update as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 400 e a mensagem "Campos inválidos"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .put('/client/update/197c7ac9-1054-44c1-909b-725a0fc14455')
          .set('Authorization', token)
          .send({ ...clientUpdateMock, name: '' });
  
        expect(status).to.be.equal(400);
        expect(message).to.be.equal('Campos inválidos');
      });
    });
  });
});

describe('Testa rota client/delete/:id', () => {
  describe('Em caso de sucesso', () => {
    before(() => {
      sinon.stub(repository.client, 'destroy').resolves()
      sinon.stub(repository.client, 'readOne').resolves(clientMock);
    });

    after(() => {
      (repository.client.destroy as sinon.SinonStub).restore();
      (repository.client.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 204', async () => {
      const { status } = await chai
        .request(server)
        .delete('/client/delete/197c7ac9-1054-44c1-909b-725a0fc14454')
        .set('Authorization', token);
      
      expect(status).to.be.equal(204);
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.client, 'destroy').resolves();
        sinon.stub(repository.client, 'readOne').resolves();
      });

      after(() => {
        (repository.client.destroy as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .delete('/client/delete/197c7ac9-1054-44c1-909b-725a0fc14454')
          .set('Authorization', 'tokeninvalido');
      
        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });

    describe('Caso o cliente não esteja cadastrado', () => {
      before(() => {
        sinon.stub(repository.client, 'destroy').resolves();
        sinon.stub(repository.client, 'readOne').resolves(null);
      });
  
      after(() => {
        (repository.client.readOne as sinon.SinonStub).restore();
        (repository.client.destroy as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 404 e uma mensagem "Cliente não encontrado"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .delete('/client/delete/197c7ac9-1054-44c1-909b-725a0fc14455')
          .set('Authorization', token);

        expect(status).to.be.equal(404);
        expect(message).to.be.equal('Cliente não encontrado');
      });
    });
  });
});