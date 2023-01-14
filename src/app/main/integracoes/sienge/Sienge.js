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
    .required('Selecione o Bot.'),
  siengeLoginUsuario: yup
    .string()
    .nullable(),
  siengeSenhaUsuario: yup
    .string()
    .nullable(),
  siengeChaveIntegracao: yup
    .string()
    .nullable(),
});

const defaultValues = {
  botNumero: '',
  siengeLoginUsuario: '',
  siengeSenhaUsuario: '',
  siengeChaveIntegracao: '',
};

function Sienge() {
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
    setValue('siengeLoginUsuario', dataBot.siengeLoginUsuario, { shouldValidate: true });

    // Acessando Api para criptografia da Nova Senha
    handlePassword
      .handleEncripty(dataBot.siengeSenhaUsuario, false)
      .then((senha) => {
        setValue('siengeSenhaUsuario', senha, { shouldValidate: true });
      })
      .catch((error) => {
        console.log(error);
      });

    if (!dataBot.siengeChaveIntegracao) {
      dataBot.siengeChaveIntegracao = '{"ChaveApiSienge":[]}';
    }

    setValue('siengeChaveIntegracao', dataBot.siengeChaveIntegracao, { shouldValidate: true });

    const json = JSON.parse(dataBot.siengeChaveIntegracao);
    setChaveIntegracaoJson(json);

    // Obtendo a lista de Url's
    if (json.ChaveApiSienge.length > 0 && json.ChaveApiSienge[0].Url) {
      setListChaveIntegracao(json.ChaveApiSienge);
    }
  };

  function addChaveIntegracao(url) {
    // Limite de 4 chaves de integração
    if (listChaveIntegracao.length < 4) {
      // Gerando lista atualizada de URL's
      const newListChaveIntegracao = listChaveIntegracao;
      newListChaveIntegracao.push({
        Url: url.trim(),
      });

      setListChaveIntegracao(newListChaveIntegracao);

      // Gerando Json atualizado
      const newChaveIntegracaoJson = chaveIntegracaoJson;
      newChaveIntegracaoJson.ChaveApiSienge = newListChaveIntegracao;
      setChaveIntegracaoJson(newChaveIntegracaoJson);

      // Converte o Json em string para atualizar input
      const newChaveIntegracaoString = JSON.stringify(newChaveIntegracaoJson);
      setValue('siengeChaveIntegracao', newChaveIntegracaoString, { shouldValidate: true });
    } else {
      setError('siengeChaveIntegracao', { type: 'custom', message: 'Limite de 4 chaves de integração.' });
    }
  }

  function removeChaveIntegracao(indice) {
    // Gerando lista atualizada de URL's
    const newListChaveIntegracao = listChaveIntegracao.filter((item, i) => i !== indice);
    setListChaveIntegracao(newListChaveIntegracao);

    // Gerando Json atualizado
    const newChaveIntegracaoJson = chaveIntegracaoJson;
    newChaveIntegracaoJson.ChaveApiSienge = newListChaveIntegracao;
    setChaveIntegracaoJson(newChaveIntegracaoJson);

    // Converte Json de Chaves de Integração para string para atualizar input
    const newChaveIntegracaoString = JSON.stringify(newChaveIntegracaoJson);
    setValue('siengeChaveIntegracao', newChaveIntegracaoString, { shouldValidate: true });
  }

  async function onSubmit(data) {
    setLoadingConfirmar(true);

    const dataUau = listBots.find((bot) => bot.botNumero === selectedBot);

    dataUau.siengeLoginUsuario = data.siengeLoginUsuario;
    dataUau.siengeChaveIntegracao = data.siengeChaveIntegracao;

    // Acessando Api para criptografia da Nova Senha
    await handlePassword
      .handleEncripty(data.siengeSenhaUsuario, true)
      .then((senha) => {
        dataUau.siengeSenhaUsuario = senha;
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .post('Bot/GravarBotSienge', dataUau)
      .then((response) => {
        setAlert({
          'type': 'success',
          'message': 'Configurações do Sienge gravadas com sucesso.',
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
          title="Integração Sienge"
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

export default Sienge;
