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
  botNumero: yup
    .string()
    .required('Selecione um Bot.'),
  capysToken: yup
    .string()
    .nullable()
    .required('Digite o Token.'),
  capysIdOrganizacao: yup
    .string()
    .nullable()
    .required('Digite o Id da Organização.'),
  capysNumWhatsapp: yup
    .string()
    .nullable()
    .required('Digite o número de WhatsApp.'),
  capysUsuario: yup
    .string()
    .nullable()
    .required('Digite o Usuário.'),
  capysSenhaUsuario: yup
    .string()
    .nullable()
    .required('Digite a Senha.'),
  rotaWhatsapp: yup
    .string()
    .nullable()
    .required('Digite a rota WhatsApp.'),
  capysChaveIntegracao: yup
    .string()
    .nullable()
    .required('Digite a Chave de integração.'),
});

const defaultValues = {
  botNumero: '',
  capysToken: '',
  capysIdOrganizacao: '',
  capysNumWhatsapp: '',
  capysUsuario: '',
  capysSenhaUsuario: '',
  rotaWhatsapp: '',
  capysChaveIntegracao: '',
};

function Capys() {
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

    setValue('botNumero', event.target.value, { shouldValidate: true });
    setValue('capysToken', dataBot.capysToken, { shouldValidate: true });
    setValue('capysIdOrganizacao', dataBot.capysIdOrganizacao, { shouldValidate: true });
    setValue('capysNumWhatsapp', dataBot.capysNumWhatsapp, { shouldValidate: true });
    setValue('capysUsuario', dataBot.capysUsuario, { shouldValidate: true });
    setValue('rotaWhatsapp', dataBot.rotaWhatsapp, { shouldValidate: true });

    // Acessando Api para criptografia da Nova Senha
    handlePassword
      .handleEncripty(dataBot.capysSenhaUsuario, false)
      .then((senha) => {
        setValue('capysSenhaUsuario', senha, { shouldValidate: true });
      })
      .catch((error) => {
        console.log(error);
      });

    if (!dataBot.capysChaveIntegracao) {
      dataBot.capysChaveIntegracao = '{"ChaveApiCapys":[]}';
    }

    setValue('capysChaveIntegracao', dataBot.capysChaveIntegracao, { shouldValidate: true });

    const json = JSON.parse(dataBot.capysChaveIntegracao);
    setChaveIntegracaoJson(json);

    // Obtendo a lista de Chaves de Integração
    if (json.ChaveApiCapys.length > 0 && json.ChaveApiCapys[0].Key) {
      setListChaveIntegracao(json.ChaveApiCapys);
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
      newChaveIntegracaoJson.ChaveApiCapys = newListChaveIntegracao;
      setChaveIntegracaoJson(newChaveIntegracaoJson);

      // Converte o Json em string para atualizar input
      const newChaveIntegracaoString = JSON.stringify(newChaveIntegracaoJson);
      setValue('capysChaveIntegracao', newChaveIntegracaoString, { shouldValidate: true });
    } else {
      setError('capysChaveIntegracao', { type: 'custom', message: 'Limite de 4 chaves de integração.' });
    }
  }

  function removeChaveIntegracao(indice) {
    // Gerando lista atualizada de URL's
    const newListChaveIntegracao = listChaveIntegracao.filter((item, i) => i !== indice);
    setListChaveIntegracao(newListChaveIntegracao);

    // Gerando Json atualizado
    const newChaveIntegracaoJson = chaveIntegracaoJson;
    newChaveIntegracaoJson.ChaveApiCapys = newListChaveIntegracao;
    setChaveIntegracaoJson(newChaveIntegracaoJson);

    // Converte Json de Chaves de Integração para string para atualizar input
    const newChaveIntegracaoString = JSON.stringify(newChaveIntegracaoJson);
    setValue('capysChaveIntegracao', newChaveIntegracaoString, { shouldValidate: true });
  }

  async function onSubmit(data) {
    // Inicia o load
    setLoadingConfirmar(true);

    const newData = listBots.find((bot) => bot.botNumero === selectedBot);

    newData.capysToken = data.capysToken;
    newData.capysIdOrganizacao = data.capysIdOrganizacao;
    newData.capysNumWhatsapp = data.capysNumWhatsapp;
    newData.capysUsuario = data.capysUsuario;
    newData.rotaWhatsapp = data.rotaWhatsapp;
    newData.capysChaveIntegracao = data.capysChaveIntegracao;

    // Acessando Api para criptografia da Nova Senha
    await handlePassword
      .handleEncripty(data.capysSenhaUsuario, true)
      .then((senha) => {
        newData.capysSenhaUsuario = senha;
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .post('Bot/GravarBotCapys', newData)
      .then((response) => {
        setAlert({
          'type': 'success',
          'message': 'Configurações da Capys gravadas com sucesso.',
        });
      })
      .catch((error) => {
        setAlert({
          'type': 'error',
          'message': 'Não foi possível concluir a Solicitação.',
        });
        console.log(error);
      });

    // Finaliza o load
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
          title="Integração Capys"
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

export default Capys;
