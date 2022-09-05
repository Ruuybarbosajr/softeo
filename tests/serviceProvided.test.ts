import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/api/app';
import sinon from 'sinon'
import repository from '../src/database/Repository';
import { adminMock } from './mocks/adminMock'
import {
  serviceProvidedMock,
  newServiceProvidedMock
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