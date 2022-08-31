import authToken from './authToken';
import handleError from './handleError';
import authBodyClient from './authBody.client';
import authBodyLogin from './authBody.login';

export default {
  authToken,
  handleError,
  authBodyNewClient: authBodyClient.create,
  authBodyLogin
};