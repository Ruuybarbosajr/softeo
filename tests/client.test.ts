import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/api/app';
import sinon from 'sinon'
import repository from '../src/database/Repository';
import { newClientMock, newClientCreatedMock } from './mocks/clientMock'
import { adminMock } from './mocks/adminMock'
import generateToken from '../src/utils/generateToken';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa rota /client/create', () => {
  describe('Em caso de sucesso', () => {
    
    before(() => {
      sinon.stub(repository.client, 'readOne').resolves(null);
      sinon.stub(repository.client, 'create').resolves(newClientCreatedMock);
    });

    after(() => {
      (repository.client.create as sinon.SinonStub).restore();
      (repository.client.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 201 e o cliente criado', async () => {
      const token = generateToken(
        { id: adminMock.id, username: adminMock.username }
      );

      const { status, body } = await chai.request(server)
        .post('/client/create')
        .set('Authorization', token)
        .send(newClientMock);

      expect(status).to.be.equal(201);
      expect(body).to.deep.equal(newClientCreatedMock);
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
    })

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
        const token = generateToken(
          { id: adminMock.id, username: adminMock.username }
        );
  
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
        sinon.stub(repository.client, 'readOne').resolves(newClientCreatedMock);
        sinon.stub(repository.client, 'create').resolves();
      });
  
      after(() => {
        (repository.client.create as sinon.SinonStub).restore();
        (repository.client.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 409 e a mensagem "Cliente já está cadastrado"', async () => {
        const token = generateToken(
          { id: adminMock.id, username: adminMock.username }
        );
  
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