import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Token inválido');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();
    const refresh_token = this.getRefreshToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token, refresh_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'Token expirado');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
          this.emit('onLogin', response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, senha) => {
    return new Promise((resolve, reject) => {
      const errorReturn = [];

      const data = {
        "email": email,
        "senha": senha
      }

      axios
        .post('Autenticador/Login', data)
        .then((response) => {
          if (response.data.ok) {
            var usuario = response.data.conteudo[0];

            const dataUserSession = {
              'usuarioId': usuario.usuarioId,
              'nome': (usuario.nome).substr(0, 20),
              'email': usuario.email,
              'telefone': usuario.telefone,
              'empresaId': usuario.empresaId,
              'tipoUsuarioId': usuario.tipoUsuarioId,
              'cidade': usuario.cidade,
              'uf': usuario.uf,
              'role': ['user'],
              'token': usuario.token,
              'refreshToken': usuario.refreshToken,
            };

            this.setSession(dataUserSession.token, dataUserSession.refreshToken);
            resolve(dataUserSession);
            this.emit('onLogin', dataUserSession);
          } else {
            errorReturn.push({
              type: 'generalErrors',
              message: response.data.msg ? response.data.msg : 'Não foi possível concluir a solicitação.',
            });

            reject(errorReturn);
          }
        })
        .catch((error) => {
          errorReturn.push({
            type: 'generalErrors',
            message: error.response.data.msg ? error.response.data.msg : 'Não foi possível concluir a solicitação.',
          });

          reject(errorReturn);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      const token = this.getAccessToken();
      const refresh_token = this.getRefreshToken();

      const data = {
        "token": token,
        "refreshToken": refresh_token
      }

      axios
        .post('Autenticador/LoginWithToken', data)
        .then((response) => {
          if (response.data.ok) {
            var usuario = response.data.conteudo[0];

            const dataUserSession = {
              'nome': usuario.nome,
              'email': usuario.email,
              'telefone': usuario.telefone,
              'empresaId': usuario.empresaId,
              'tipoUsuarioId': usuario.tipoUsuarioId,
              'cidade': usuario.cidade,
              'uf': usuario.uf,
              'role': ['user'],
              'token': usuario.token,
              'refreshToken': usuario.refreshToken,
            };

            this.setSession(dataUserSession.token, dataUserSession.refreshToken);
            resolve(dataUserSession);
          } else {
            this.logout();
            reject(new Error('Falha ao reconectar o Usuário'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Falha ao reconectar o Usuário'));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token, refresh_token) => {
    if (access_token && refresh_token) {
      // Salva o access_token JWT no localStorage
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      // Salva o Refresh Token e a Senha do usuario no localStorage
      localStorage.setItem('jwt_refresh_token', refresh_token);
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem('jwt_refresh_token');
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Desconectado');
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('Token expirado');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };

  getRefreshToken = () => {
    return window.localStorage.getItem('jwt_refresh_token');
  };
}

const instance = new JwtService();

export default instance;
