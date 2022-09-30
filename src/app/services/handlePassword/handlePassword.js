import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';

class HandlePassword extends FuseUtils.EventEmitter {
  handleEncripty = (senha, encripty) => {
    return new Promise((resolve, reject) => {
      const errorReturn = [];

      // Acessando Api para criptografia de senha
      const data = {
        'senha': senha,
        'criptografar': encripty,
      };

      axios
        .post('Autenticador/Criptografia', data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          errorReturn.push({
            type: 'generalErrors',
            message: error.response.data.message ? error.response.data.message : 'Não foi possível concluir a solicitação.',
          });

          reject(errorReturn);
        });
    });
  };
}

const instance = new HandlePassword();

export default instance;
