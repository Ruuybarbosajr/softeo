import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/api/app';
import sinon from 'sinon'
import repository from '../src/database/Repository';
import { serviceMock, newServiceMock } from './mocks/serviceMock'
import { adminMock } from './mocks/adminMock'
import generateToken from '../src/utils/generateToken';
chai.use(chaiHttp);

const token = generateToken(
  { id: adminMock.id, username: adminMock.username }
);

describe('Testa rota /service/create', () => {
  describe('Em caso de sucesso', () => {

    before(() => {
      sinon.stub(repository.service, 'readOne').resolves(null);
      sinon.stub(repository.service, 'create').resolves(serviceMock);
    });

    after(() => {
      (repository.service.create as sinon.SinonStub).restore();
      (repository.service.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 201 e o serviço criado', async () => {
      const { status, body } = await chai.request(server)
        .post('/service/create')
        .set('Authorization', token)
        .send(newServiceMock);

      expect(status).to.be.equal(201);
      expect(body).to.deep.equal(serviceMock);
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.service, 'readOne').resolves();
        sinon.stub(repository.service, 'create').resolves();
      });

      after(() => {
        (repository.service.create as sinon.SinonStub).restore();
        (repository.service.readOne as sinon.SinonStub).restore();
      });
      
      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .post('/service/create')
          .set('Authorization', 'tokeninvalido')
          .send(newServiceMock);
      
        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });

    describe('Caso algum campo do body seja inválido', () => {
      before(() => {
        sinon.stub(repository.service, 'readOne').resolves();
        sinon.stub(repository.service, 'create').resolves();
      });
  
      after(() => {
        (repository.service.create as sinon.SinonStub).restore();
        (repository.service.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 400 e a mensagem "Campos inválidos"', async () => {  
        const { status, body: { message } } = await chai.request(server)
          .post('/service/create')
          .set('Authorization', token)
          .send({ ...newServiceMock, name: '' });
  
        expect(status).to.be.equal(400);
        expect(message).to.be.equal('Campos inválidos');
      });
    });

    describe('Caso o serviço já esteja cadastro', () => {
      before(() => {
        sinon.stub(repository.service, 'readOne').resolves(serviceMock);
        sinon.stub(repository.service, 'create').resolves();
      });
  
      after(() => {
        (repository.service.create as sinon.SinonStub).restore();
        (repository.service.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 409 e a mensagem "Serviço já está cadastrado"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .post('/service/create')
          .set('Authorization', token)
          .send(newServiceMock);
  
        expect(status).to.be.equal(409);
        expect(message).to.be.equal('Serviço já está cadastrado');
      });
    });
  });
});

describe('Testa rota /service/:id', () => {
  describe('Em caso de sucesso', () => {
    before(() => {
      sinon.stub(repository.service, 'readOne').resolves(serviceMock);
    });

    after(() => {
      (repository.service.readOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um status 200 e o serviço', async () => {
      const { status, body } = await chai
        .request(server)
        .get('/service/197c7ac9-1054-44c1-909b-725a0fc14454')
        .set('Authorization', token);
      
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(serviceMock);
    });
  });

  describe('Em caso de falha', () => {
    describe('Caso o serviço não esteja cadastrado', () => {
      before(() => {
        sinon.stub(repository.service, 'readOne').resolves(null);
      });

      after(() => {
        (repository.service.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 404 e uma mensagem "Serviço não encontrado"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .get('/service/198c7ac9-1054-44c1-909b-725a0fc14454')
          .set('Authorization', token);

        expect(status).to.be.equal(404);
        expect(message).to.be.equal('Serviço não encontrado')
      });
    });

    describe('Caso o id seja inválido', () => {
      before(() => {
        sinon.stub(repository.service, 'readOne').resolves();
      });

      after(() => {
        (repository.service.readOne as sinon.SinonStub).restore();
      });

      it('Deve retornar um status 400 e uma mensagem "Id inválido"', async () => {
        const { status, body: { message } } = await chai
          .request(server)
          .get('/service/idinvalido')
          .set('Authorization', token);

        expect(status).to.be.equal(400);
        expect(message).to.be.equal('Id inválido');
      });
    });

    describe('Caso o token seja inválido', () => {
      before(() => {
        sinon.stub(repository.service, 'readOne').resolves();
      });
  
      after(() => {
        (repository.service.readOne as sinon.SinonStub).restore();
      });
      
      it('Deve retornar um status 401 e uma mensagem "Você não possui autorização"', async () => {
        const { status, body: { message } } = await chai.request(server)
          .get('/service/197c7ac9-1054-44c1-909b-725a0fc14454')
          .set('Authorization', 'tokeninvalido')
      
        expect(status).to.be.equal(401);
        expect(message).to.be.equal('Você não possui autorização');
      });
    });
  });
});