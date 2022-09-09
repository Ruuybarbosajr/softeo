import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/api/app';
import sinon from 'sinon'
import repository from '../src/database/Repository';
import { adminMock } from './mocks/adminMock'
import {
  serviceProvidedMock,
  newServiceProvidedMock,
  allServiceProvidedMock,
  serviceProvidedUpdateMock,
  serviceProvidedUpdatedMock
} from './mocks/serviceProvidedMock'
import { installmentsReadAllMock } from './mocks/installmentsServiceProvidedMock'
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
      sinon.stub(repository.installmentsServiceProvided, 'create').resolves({ count: 3})
    });

    after(() => {
      (repository.serviceProvided.create as sinon.SinonStub).restore();
      (repository.installmentsServiceProvided.create as sinon.SinonStub).restore();
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
        sinon.stub(repository.installmentsServiceProvided, 'readAll').resolves(installmentsReadAllMock)
      });

      after(() => {
        (repository.installmentsServiceProvided.readAll as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 200 e um array com todos os serviços prestados', async () => {
        const { status, body } = await chai
          .request(server)
          .get('/service-provided/all')
          .set('Authorization', token)
  
        expect(status).to.be.equal(200)
        expect(body).to.deep.equal(installmentsReadAllMock.map(({ serviceProvided }) => {
          return {
            ...serviceProvided,
            installmentsServiceProvided: serviceProvided.installmentsServiceProvided.map((installments) => ({
              ...installments,
              dateInstallment: installments.dateInstallment.toISOString()
            })),
            createdAt: serviceProvided.createdAt.toISOString()
          };
        }));
      });
    });

    describe('Deve retornar todas os serviços prestados do mês escolhido na query', () => {
      before(() => {
        sinon.stub(repository.installmentsServiceProvided, 'readAll').resolves(installmentsReadAllMock)
      });

      after(() => {
        (repository.installmentsServiceProvided.readAll as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 200 e um array com todos os serviços prestados no mês de Setembro', async () => {
        const { status, body } = await chai
          .request(server)
          .get('/service-provided/all?month=8')
          .set('Authorization', token)
  
        expect(status).to.be.equal(200)
        const { serviceProvided } = installmentsReadAllMock[0]
        expect(body).to.deep.equal([
          {
            ...serviceProvided,
              createdAt: serviceProvided.createdAt.toISOString(),
              installmentsServiceProvided: serviceProvided.installmentsServiceProvided.map((installments) => ({
                ...installments,
                dateInstallment: installments.dateInstallment.toISOString()
              }))
          }
        ]);
      });
    });

    describe('Deve retornar todas os serviços prestados do período escolhido na query', () => {
      before(() => {
        sinon.stub(repository.installmentsServiceProvided, 'readAll').resolves(installmentsReadAllMock)
      });

      after(() => {
        (repository.installmentsServiceProvided.readAll as sinon.SinonStub).restore();
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
        const { serviceProvided } = installmentsReadAllMock[0]
        expect(body).to.deep.equal([
          {
            ...serviceProvided,
              createdAt: serviceProvided.createdAt.toISOString(),
              installmentsServiceProvided: serviceProvided.installmentsServiceProvided.map((installments) => ({
                ...installments,
                dateInstallment: installments.dateInstallment.toISOString()
              }))
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

describe('Testa rota /service-provided/update/:id', () => {
  describe('Em caso de sucesso', () => {
    
    before(() => {
      sinon.stub(repository.serviceProvided, 'update').resolves(serviceProvidedUpdatedMock)
      sinon.stub(repository.serviceProvided, 'readOne').resolves(serviceProvidedMock);
    });

    after(() => {
      (repository.serviceProvided.update as sinon.SinonStub).restore();
      (repository.serviceProvided.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 200 e o objeto atualizado', async () => {
      const { status, body } = await chai
        .request(server)
        .patch('/service-provided/update/197c7ac9-1054-44c1-909b-725a0fc14454')
        .set('Authorization', token)
        .send(serviceProvidedUpdateMock);

      expect(status).to.be.equal(200);
      expect(body).to.deep.equal({
        ...serviceProvidedUpdatedMock,
        createdAt: serviceProvidedUpdatedMock.createdAt.toISOString()
      });
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.serviceProvided, 'update').resolves();
        sinon.stub(repository.serviceProvided, 'readOne').resolves();
      });
  
      after(() => {
        (repository.serviceProvided.update as sinon.SinonStub).restore();
        (repository.serviceProvided.readOne as sinon.SinonStub).restore();
      });
      
      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .patch('/service-provided/update/197c7ac9-1054-44c1-909b-725a0fc14454')
          .set('Authorization', 'tokeninvalido')
          .send(serviceProvidedUpdateMock);

        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });

    describe('Caso o serviço prestado não esteja cadastrado', () => {
      before(() => {
        sinon.stub(repository.serviceProvided, 'update').resolves();
        sinon.stub(repository.serviceProvided, 'readOne').resolves(null);
      });
  
      after(() => {
        (repository.serviceProvided.update as sinon.SinonStub).restore();
        (repository.serviceProvided.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 404 e uma mensagem "Serviço prestado não encontrado"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .patch('/service-provided/update/197c7ac9-1054-44c1-909b-725a0fc14455')
          .set('Authorization', token)
          .send(serviceProvidedUpdateMock);

        expect(status).to.be.equal(404);
        expect(message).to.be.equal('Serviço prestado não encontrado');
      });
    });

    describe('Caso algum campo do body seja inválido', () => {
      before(() => {
        sinon.stub(repository.serviceProvided, 'readOne').resolves();
        sinon.stub(repository.serviceProvided, 'update').resolves();
      });

      after(() => {
        (repository.serviceProvided.update as sinon.SinonStub).restore();
        (repository.serviceProvided.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 400 e a mensagem "Campos inválidos"', async () => {  
        const { status, body: { message } } = await chai
          .request(server)
          .patch('/service-provided/update/197c7ac9-1054-44c1-909b-725a0fc14455')
          .set('Authorization', token)
          .send({ ...serviceProvidedUpdateMock, installmentsPaid: 0 });

        expect(status).to.be.equal(400);
        expect(message).to.be.equal('Campos inválidos');
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
          .patch('/service-provided/update/idinvalido')
          .set('Authorization', token)
          .send(serviceProvidedUpdateMock);

        expect(status).to.be.equal(400);
        expect(message).to.be.equal('Id inválido');
      });
    });
  });
});

describe('Testa rota /service-provided/delete/:id', () => {
  describe('Em caso de sucesso', () => {
    before(() => {
      sinon.stub(repository.serviceProvided, 'destroy').resolves()
      sinon.stub(repository.serviceProvided, 'readOne').resolves(serviceProvidedMock);
    });

    after(() => {
      (repository.serviceProvided.destroy as sinon.SinonStub).restore();
      (repository.serviceProvided.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 204', async () => {
      const { status } = await chai
        .request(server)
        .delete('/service-provided/delete/197c7ac9-1054-44c1-909b-725a0fc14454')
        .set('Authorization', token);
      
      expect(status).to.be.equal(204);
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.serviceProvided, 'destroy').resolves();
        sinon.stub(repository.serviceProvided, 'readOne').resolves();
      });

      after(() => {
        (repository.serviceProvided.destroy as sinon.SinonStub).restore();
        (repository.serviceProvided.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .delete('/service-provided/delete/197c7ac9-1054-44c1-909b-725a0fc14454')
          .set('Authorization', 'tokeninvalido');
      
        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });

    describe('Caso o serviço prestado não esteja cadastrado', () => {
      before(() => {
        sinon.stub(repository.serviceProvided, 'destroy').resolves();
        sinon.stub(repository.serviceProvided, 'readOne').resolves(null);
      });
  
      after(() => {
        (repository.serviceProvided.readOne as sinon.SinonStub).restore();
        (repository.serviceProvided.destroy as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 404 e uma mensagem "Serviço prestado não encontrado"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .delete('/service-provided/delete/197c7ac9-1054-44c1-909b-725a0fc14455')
          .set('Authorization', token);

        expect(status).to.be.equal(404);
        expect(message).to.be.equal('Serviço prestado não encontrado');
      });
    });
  });
});