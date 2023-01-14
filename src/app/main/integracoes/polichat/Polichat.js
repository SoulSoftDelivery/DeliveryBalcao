import react, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { selectUser } from 'app/store/userSlice';
import handlePassword from 'src/app/services/handlePassword';
import ContentHeader from '../../../utilities/layout/contentHeader';
import GeneralAlert from '../../../utilities/generalAlert';

import Form from './form';

const Root = styled(FusePageCarded)({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-toolbar': {},
  '& .FusePageCarded-content': {},
  '& .FusePageCarded-sidebarHeader': {},
  '& .FusePageCarded-sidebarContent': {},
});

// Validação de formulário
const schema = yup.object().shape({
  bot: yup
    .string()
    .required('Selecione um Bot.'),
  rotaWhatsapp: yup
    .string()
    .nullable()
    .required('Digite a Rota do Whatsapp.'),
  polichatCustomersId: yup
    .string()
    .nullable()
    .required('Digite o CustumersId.'),
  polichatUser: yup
    .string()
    .nullable()
    .required('Digite o User.'),
  polichatChannel: yup
    .string()
    .nullable()
    .required('Digite o Channel.'),
  polichatClientSecret: yup
    .string()
    .nullable()
    .required('Digite o Client Secret.'),
  polichatToken: yup
    .string()
    .nullable()
    .required('Digite o Token.'),
  polichatClientId: yup
    .string()
    .nullable()
    .required('Digite o Client Id.'),
  polichatUserName: yup
    .string()
    .nullable()
    .required('Digite o User Name.'),
  polichatSenha: yup
    .string()
    .nullable()
    .required('Digite a Senha.'),
  polichatChaveIntegracao: yup
    .string()
    .nullable()
    .required('Digite a Chave de Integração.'),
});

const defaultValues = {
  bot: '',
  rotaWhatsapp: '',
  polichatCustomersId: '',
  polichatUser: '',
  polichatChannel: '',
  polichatClientSecret: '',
  polichatToken: '',
  polichatClientId: '',
  polichatUserName: '',
  polichatSenha: '',
  polichatChaveIntegracao: '',
};

function Polichat() {
  const [listBots, setListBots] = useState([]);
  const [listChaveIntegracao, setListChaveIntegracao] = useState([]);
  const [chaveIntegracaoJson, setChaveIntegracaoJson] = useState({});
  const [selectedBot, setSelectedBot] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [loadingConfirmar, setLoadingConfirmar] = useState(false);
  const [alert, setAlert] = useState({
    'type': 'error',
    'message': '',
  });

  const { control, formState, setValue, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, errors } = formState;

  const user = useSelector(selectUser);

  // Lista os Bots no carregamento da página
  useEffect(() => {
    const getBots = async () => {
      const dataBot = {
        'PartitionKey': user.partitionKey,
      };

      axios
        .post('Bot/list', dataBot)
        .then((response) => {
          setListBots(response.data);
        })
        .catch((error) => {
          setAlert({
            'type': 'error',
            'message': 'Não foi possível concluir a Solicitação.',
          });
          console.log(error);
        });
    };

    getBots();
  }, []);

  const handleChangeBot = (event) => {
    setSelectedBot(event.target.value);

    const dataBot = listBots.find((bot) => bot.botNumero === event.target.value);

    setValue('bot', event.target.value, { shouldValidate: true });
    setValue('polichatUserName', dataBot.polichatUserName, { shouldValidate: true });
    setValue('rotaWhatsapp', dataBot.rotaWhatsapp, { shouldValidate: true });
    setValue('polichatCustomersId', dataBot.polichatCustomersId, { shouldValidate: true });
    setValue('polichatUser', dataBot.polichatUser, { shouldValidate: true });
    setValue('polichatChannel', dataBot.polichatChannel, { shouldValidate: true });
    setValue('polichatClientSecret', dataBot.polichatClientSecret, { shouldValidate: true });
    setValue('polichatClientId', dataBot.polichatClientId, { shouldValidate: true });
    setValue('polichatToken', dataBot.polichatToken, { shouldValidate: true });

    // Acessando Api para descriptografia
    handlePassword
      .handleEncripty(dataBot.polichatSenha, false)
      .then((senha) => {
        setValue('polichatSenha', senha, { shouldValidate: true });
      })
      .catch((error) => {
        console.log(error);
      });

    if (!dataBot.polichatChaveIntegracao) {
      dataBot.polichatChaveIntegracao = '{"ChaveApiPolichat":[]}';
    }

    setValue('polichatChaveIntegracao', dataBot.polichatChaveIntegracao, { shouldValidate: true });

    const json = JSON.parse(dataBot.polichatChaveIntegracao);
    setChaveIntegracaoJson(json);

    // Obtendo a lista de Chaves de Integração
    if (json.ChaveApiPolichat.length > 0 && json.ChaveApiPolichat[0].Key) {
      setListChaveIntegracao(json.ChaveApiPolichat);
    }
  };

  function addChaveIntegracao(url) {
    // Limite de 4 chaves de integração
    if (listChaveIntegracao.length < 4) {
      // Gerando lista atualizada de URL's
      const newListChaveIntegracao = listChaveIntegracao;
      newListChaveIntegracao.push({
        Key: url.trim(),
      });

      setListChaveIntegracao(newListChaveIntegracao);

      // Gerando Json atualizado
      const newChaveIntegracaoJson = chaveIntegracaoJson;
      newChaveIntegracaoJson.ChaveApiPolichat = newListChaveIntegracao;
      setChaveIntegracaoJson(newChaveIntegracaoJson);

      // Converte Json em string para atualizar input
      const chaveIntegracaoString = JSON.stringify(newChaveIntegracaoJson);
      setValue('polichatChaveIntegracao', chaveIntegracaoString, { shouldValidate: true });
    } else {
      setError('polichatChaveIntegracao', { type: 'custom', message: 'Limite de 4 chaves de integração.' });
    }
  }

  function removeChaveIntegracao(indice) {
    // Gerando lista atualizada de URL's
    const newListChaveIntegracao = listChaveIntegracao.filter((item, i) => i !== indice);
    setListChaveIntegracao(newListChaveIntegracao);

    // Gerando Json atualizado
    const newChaveIntegracaoJson = chaveIntegracaoJson;
    newChaveIntegracaoJson.ChaveApiPolichat = newListChaveIntegracao;
    setChaveIntegracaoJson(newChaveIntegracaoJson);

    // Converte Json em string para atualizar input
    const chaveIntegracaoString = JSON.stringify(newChaveIntegracaoJson);
    setValue('polichatChaveIntegracao', chaveIntegracaoString, { shouldValidate: true });
  }

  async function onSubmit(data) {
    setLoadingConfirmar(true);

    const dataPolichat = listBots.find((bot) => bot.botNumero === selectedBot);

    dataPolichat.polichatUserName = data.polichatUserName;
    dataPolichat.rotaWhatsapp = data.rotaWhatsapp;
    dataPolichat.polichatCustomersId = data.polichatCustomersId;
    dataPolichat.polichatUser = data.polichatUser;
    dataPolichat.polichatChannel = data.polichatChannel;
    dataPolichat.polichatClientSecret = data.polichatClientSecret;
    dataPolichat.polichatToken = data.polichatToken;
    dataPolichat.polichatClientId = data.polichatClientId;
    dataPolichat.polichatChaveIntegracao = data.polichatChaveIntegracao;

    // Acessando Api para criptografia da Nova Senha
    await handlePassword
      .handleEncripty(data.polichatSenha, true)
      .then((senha) => {
        dataPolichat.polichatSenha = senha;
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .post('Bot/GravarBotPolichat', dataPolichat)
      .then((response) => {
        setAlert({
          'type': 'success',
          'message': 'Configurações da Polichat gravadas com sucesso.',
        });
      })
      .catch((error) => {
        setAlert({
          'type': 'error',
          'message': 'Não foi possível concluir a Solicitação.',
        });
        console.log(error);
      });

    setLoadingConfirmar(false);
  }

  function resetForm() {
    reset();
    setListChaveIntegracao([]);
    setSelectedBot('');
  }

  return (
    <Root
      header={
        <ContentHeader
          title="Integração Polichat"
          icon="compare_arrows"
        />
      }

      content={
        <div className="flex-auto p-24 sm:p-40">
          {/* Alert para mensagem geral */}
          {alert.message && (
            <GeneralAlert
              type={alert.type}
              message={alert.message}
              setAlert={setAlert}
            />
          )}

          {/* Formulária da página */}
          <Form
            listBots={listBots}
            listChaveIntegracao={listChaveIntegracao}
            addChaveIntegracao={addChaveIntegracao}
            removeChaveIntegracao={removeChaveIntegracao}
            handleChangeBot={handleChangeBot}
            showSenha={showSenha}
            setShowSenha={setShowSenha}
            resetForm={resetForm}
            loadingConfirmar={loadingConfirmar}
            selectedBot={selectedBot}
            isValid={isValid}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </div>
      }
      scroll="normal"
    />
  );
}

export default Polichat;
