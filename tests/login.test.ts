import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/api/app';
import sinon from 'sinon'
import repository from '../src/database/Repository';
import jwt from 'jsonwebtoken'
import { adminMock } from './mocks/adminMock'
chai.use(chaiHttp);


describe('Testa rota /login', () => {
  describe('Em caso de sucesso', () => {
    
    before(() => {
      sinon.stub(repository.admin, 'execute').resolves(adminMock)
    });
    
    after(() => {
      (repository.admin.execute as sinon.SinonStub).restore()
    })

    it('Deve retornar um status 200', async () => {
      const { username, password } = adminMock;
      const { status } = await chai.request(server).post('/login').send({ username, password })
      expect(status).to.be.equal(200)
    });

    it('Deve retornar um body carregando um token válido', async () => {
      const { username, password } = adminMock;
      const { body: { token } } = await chai.request(server).post('/login').send({ username, password });
      const secret = process.env.JWT_SECRET as jwt.Secret;

      try {
        const payload = jwt.verify(token, secret)
        expect(payload).to.have.property('id', adminMock.id)
        expect(payload).to.have.property('username', adminMock.username)
      } catch (error) {
        console.log(error);
      }

    });
  });

  describe('Em caso de falha', () => {
    describe('Admin não está cadastrado na base de dados', () => {
      before(() => {
        sinon.stub(repository.admin, 'execute').resolves(null)
      })
  
      after(() => {
        (repository.admin.execute as sinon.SinonStub).restore()
      })
  
      it('Deve retornar um status 404 e uma mensagem "Admin not found"', async () => {
        const { status, body: { message } } = await chai.request(server).post('/login').send({
          username: 'admininvalido',
          password: 'passwordinvalido'
        })
        expect(status).to.be.equal(404)
        expect(message).to.be.equal('Admin not found')
      })
    });

    describe('A senha está incorreta', () => {
      before(() => {
        sinon.stub(repository.admin, 'execute').resolves(adminMock)
      })
  
      after(() => {
        (repository.admin.execute as sinon.SinonStub).restore()
      })

      it('Deve retornar uma 400 e uma messagem "Invalid fields"', async () => {
      const { status, body: { message } } = await chai.request(server).post('/login').send({
        username: adminMock.username,
        password: 'passwordinvalido'
      })
      expect(status).to.be.equal(400)
      expect(message).to.be.equal('Invalid fields')
    })
    });
  });
});
