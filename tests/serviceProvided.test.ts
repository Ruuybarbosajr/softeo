import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/api/app';
import sinon from 'sinon'
import repository from '../src/database/Repository';
import { adminMock } from './mocks/adminMock'
import {
  serviceProvidedMock,
  newServiceProvidedMock,
  allServiceProvidedMock
} from './mocks/serviceProvidedMock'
import { clientMock } from './mocks/clientMock'
import { serviceMock } from './mocks/serviceMock'
import generateToken from '../src/utils/generateToken';
chai.use(chaiHttp);

const token = generateToken(
  { id: adminMock.id, username: adminMock.username }
);

describe('Testa rota /service-provided/create', () => {
  describe('Em caso de sucesso', () => {

    before(() => {
      sinon.stub(repository.service, 'readOne').resolves(serviceMock);
      sinon.stub(repository.client, 'readOne').resolves(clientMock);
      sinon.stub(repository.serviceProvided, 'create').resolves(serviceProvidedMock);
    });

    after(() => {
      (repository.serviceProvided.create as sinon.SinonStub).restore();
      (repository.service.readOne as sinon.SinonStub).restore();
      (repository.client.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 201 e o serviço prestado criado', async () => {
      const { status, body } = await chai.request(server)
        .post('/service-provided/create')
        .set('Authorization', token)
        .send(newServiceProvidedMock);

      expect(status).to.be.equal(201);
      expect(body).to.deep.equal({ 
        ...serviceProvidedMock,
        createdAt: serviceProvidedMock.createdAt.toISOString()
      });
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.service, 'readOne').resolves();
        sinon.stub(repository.client, 'readOne').resolves();
        sinon.stub(repository.serviceProvided, 'create').resolves();
      });
  
      after(() => {
        (repository.serviceProvided.create as sinon.SinonStub).restore();
        (repository.service.readOne as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });
      
      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .post('/service-provided/create')
          .set('Authorization', 'tokeninvalido')
          .send(newServiceProvidedMock);
        
        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });

    describe('Caso algum campo do body seja inválido', () => {
      before(() => {
        sinon.stub(repository.service, 'readOne').resolves();
        sinon.stub(repository.client, 'readOne').resolves();
        sinon.stub(repository.serviceProvided, 'create').resolves();
      });
  
      after(() => {
        (repository.serviceProvided.create as sinon.SinonStub).restore();
        (repository.service.readOne as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 400 e a mensagem "Campos inválidos"', async () => {  
        const { status, body: { message } } = await chai.request(server)
          .post('/service-provided/create')
          .set('Authorization', token)
          .send({ ...newServiceProvidedMock, serviceId: '' });
  
        expect(status).to.be.equal(400);
        expect(message).to.be.equal('Campos inválidos');
      });
    });

    describe('Caso o serviço não esteja cadastrado', () => {
      before(() => {
        sinon.stub(repository.service, 'readOne').resolves(null);
        sinon.stub(repository.client, 'readOne').resolves(clientMock);
        sinon.stub(repository.serviceProvided, 'create').resolves();
      });
  
      after(() => {
        (repository.serviceProvided.create as sinon.SinonStub).restore();
        (repository.service.readOne as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 404 e a mensagem "Serviço não encontrado"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .post('/service-provided/create')
          .set('Authorization', token)
          .send(newServiceProvidedMock);
  
        expect(status).to.be.equal(404);
        expect(message).to.be.equal('Serviço não encontrado');
      });
    });

    describe('Caso o cliente não esteja cadastrado', () => {
      before(() => {
        sinon.stub(repository.service, 'readOne').resolves(serviceMock);
        sinon.stub(repository.client, 'readOne').resolves(null);
        sinon.stub(repository.serviceProvided, 'create').resolves();
      });
  
      after(() => {
        (repository.serviceProvided.create as sinon.SinonStub).restore();
        (repository.service.readOne as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 404 e a mensagem "Cliente não encontrado"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .post('/service-provided/create')
          .set('Authorization', token)
          .send(newServiceProvidedMock);
  
        expect(status).to.be.equal(404);
        expect(message).to.be.equal('Cliente não encontrado');
      });
    });
  });
});

describe('Testa rota /service-provided/:id', () => {
  describe('Em caso de sucesso', () => {
    before(() => {
      sinon.stub(repository.serviceProvided, 'readOne').resolves(serviceProvidedMock);
    });

    after(() => {
      (repository.serviceProvided.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 200 e o serviço', async () => {
      const { status, body } = await chai
        .request(server)
        .get('/service-provided/197c7ac9-1054-44c1-909b-725a0fc14454')
        .set('Authorization', token);
      
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal({
        ...serviceProvidedMock,
        createdAt: serviceProvidedMock.createdAt.toISOString()
      });
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o serviço prestado não esteja cadastrado', () => {
      before(() => {
        sinon.stub(repository.serviceProvided, 'readOne').resolves(null);
      });

      after(() => {
        (repository.serviceProvided.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 404 e uma mensagem "Serviço prestado não encontrado"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .get('/service-provided/198c7ac9-1054-44c1-909b-725a0fc14454')
          .set('Authorization', token);

        expect(status).to.be.equal(404);
        expect(message).to.be.equal('Serviço prestado não encontrado')
      });
    });

    describe('Caso o id seja inválido', () => {
      before(() => {
        sinon.stub(repository.serviceProvided, 'readOne').resolves();
      });

      after(() => {
        (repository.serviceProvided.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 400 e uma mensagem "Id inválido"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .get('/service-provided/idinvalido')
          .set('Authorization', token);

        expect(status).to.be.equal(400);
        expect(message).to.be.equal('Id inválido');
      });
    });

    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.serviceProvided, 'readOne').resolves();
      });
  
      after(() => {
        (repository.serviceProvided.readOne as sinon.SinonStub).restore();
      });
      
      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .get('/service-provided/197c7ac9-1054-44c1-909b-725a0fc14454')
          .set('Authorization', 'tokeninvalido')
      
        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });
  });
});

describe('Testa rota /service-provided/all', () => {
  describe('Em caso de sucesso', () => {
    describe('Deve retornar todas os serviços prestados quando não houver querys', () => {
      before(() => {
        sinon.stub(repository.serviceProvided, 'readAll').resolves(allServiceProvidedMock)
      });

      after(() => {
        (repository.serviceProvided.readAll as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 200 e um array com todos os serviços prestados', async () => {
        const { status, body } = await chai
          .request(server)
          .get('/service-provided/all')
          .set('Authorization', token)
  
        expect(status).to.be.equal(200)
        expect(body).to.deep.equal(allServiceProvidedMock.map((serviceProvided) => {
          return {
            ...serviceProvided,
            createdAt: serviceProvided.createdAt.toISOString()
          };
        }));
      });
    });

    describe('Deve retornar todas os serviços prestados do mês escolhido na query', () => {
      before(() => {
        const [serviceProvidedSeptember] = allServiceProvidedMock;
        sinon.stub(repository.serviceProvided, 'readAll').resolves([serviceProvidedSeptember])
      });

      after(() => {
        (repository.serviceProvided.readAll as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 200 e um array com todos os serviços prestados no mês de Setembro', async () => {
        const { status, body } = await chai
          .request(server)
          .get('/service-provided/all?month=8')
          .set('Authorization', token)
  
        expect(status).to.be.equal(200)
        expect(body).to.deep.equal([
          { ...allServiceProvidedMock[0],
            createdAt: allServiceProvidedMock[0].createdAt.toISOString()
          }
        ]);
      });
    });

    describe('Deve retornar todas os serviços prestados do período escolhido na query', () => {
      before(() => {
        const [,serviceProvidedJune] = allServiceProvidedMock;
        sinon.stub(repository.serviceProvided, 'readAll').resolves([serviceProvidedJune])
      });

      after(() => {
        (repository.serviceProvided.readAll as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 200 e um array com todos os serviços prestados no período de 01/06/**** - 30/06/****', async () => {
        const year = new Date().getFullYear()
        const initialPeriod = new Date(year, 5, 1)
        const finalPeriod = new Date(year, 6, 0)
        const { status, body } = await chai
          .request(server)
          .get(`/service-provided/all?gte=${initialPeriod}&lte=${finalPeriod}`)
          .set('Authorization', token)
  
        expect(status).to.be.equal(200)
        expect(body).to.deep.equal([
          { ...allServiceProvidedMock[1],
            createdAt: allServiceProvidedMock[1].createdAt.toISOString()
          }
        ]);
      });
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.serviceProvided, 'readAll').resolves();
      });
  
      after(() => {
        (repository.serviceProvided.readAll as sinon.SinonStub).restore();
      });
      
      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .get('/service-provided/all')
          .set('Authorization', 'tokeninvalido');

        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });
  });
});
