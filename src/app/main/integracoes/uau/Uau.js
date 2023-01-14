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
  uauLoginUsuario: yup
    .string()
    .nullable()
    .required('Digite o Login do Usuário UAU.'),
  uauSenhaUsuario: yup
    .string()
    .nullable()
    .required('Digite a Senha.'),
  uauUrlBase: yup
    .string()
    .nullable()
    .required('Digite os caminhos dos WebService UAU'),
});

const defaultValues = {
  botNumero: '',
  uauLoginUsuario: '',
  uauSenhaUsuario: '',
  uauUrlBase: '',
};

function Uau() {
  const [listBots, setListBots] = useState([]);
  const [listUrlApiUAU, setListUrlApiUAU] = useState([]);
  const [urlApiUAUJson, setUrlApiUAUJson] = useState({});
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
    setValue('uauLoginUsuario', dataBot.uauLoginUsuario, { shouldValidate: true });

    // Acessando Api para criptografia da Nova Senha
    handlePassword
      .handleEncripty(dataBot.uauSenhaUsuario, false)
      .then((senha) => {
        setValue('uauSenhaUsuario', senha, { shouldValidate: true });
      })
      .catch((error) => {
        console.log(error);
      });

    if (!dataBot.uauUrlBase) {
      dataBot.uauUrlBase = '{"UrlApiUAU":[]}';
    }

    setValue('uauUrlBase', dataBot.uauUrlBase, { shouldValidate: true });

    const json = JSON.parse(dataBot.uauUrlBase);
    setUrlApiUAUJson(json);

    // Obtendo a lista de Url's
    if (json.UrlApiUAU.length > 0 && json.UrlApiUAU[0].Url) {
      setListUrlApiUAU(json.UrlApiUAU);
    }
  };

  function addUrlApiUAU(url) {
    // Limite de 4 chaves de integração
    if (listUrlApiUAU.length < 4) {
      // Gerando lista atualizada de URL's
      const newListUrlApiUAU = listUrlApiUAU;
      newListUrlApiUAU.push({
        Url: url.trim(),
      });

      setListUrlApiUAU(newListUrlApiUAU);

      // Gerando Json atualizado
      const newUrlApiUAUJson = urlApiUAUJson;
      newUrlApiUAUJson.UrlApiUAU = newListUrlApiUAU;
      setUrlApiUAUJson(newUrlApiUAUJson);

      // Converte o Json em string para atualizar input
      const newUrlApiUAUString = JSON.stringify(newUrlApiUAUJson);
      setValue('uauUrlBase', newUrlApiUAUString, { shouldValidate: true });
    } else {
      setError('uauUrlBase', { type: 'custom', message: 'Limite de 4 chaves de integração.' });
    }
  }

  function removeUrlApiUAU(indice) {
    // Gerando lista atualizada de URL's
    const newListUrlApiUAU = listUrlApiUAU.filter((item, i) => i !== indice);
    setListUrlApiUAU(newListUrlApiUAU);

    // Gerando Json atualizado
    const newUrlApiUAUJson = urlApiUAUJson;
    newUrlApiUAUJson.UrlApiUAU = newListUrlApiUAU;
    setUrlApiUAUJson(newUrlApiUAUJson);

    // Converte Json de Chaves de Integração para string para atualizar input
    const newUrlApiUAUString = JSON.stringify(newUrlApiUAUJson);
    setValue('uauUrlBase', newUrlApiUAUString, { shouldValidate: true });
  }

  async function onSubmit(data) {
    setLoadingConfirmar(true);

    const dataUau = listBots.find((bot) => bot.botNumero === selectedBot);

    dataUau.uauLoginUsuario = data.uauLoginUsuario;
    dataUau.uauUrlBase = data.uauUrlBase;

    // Acessando Api para criptografia da Nova Senha
    await handlePassword
      .handleEncripty(data.uauSenhaUsuario, true)
      .then((senha) => {
        dataUau.uauSenhaUsuario = senha;
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .post('Bot/GravarBotUAU', dataUau)
      .then((response) => {
        setAlert({
          'type': 'success',
          'message': 'Configurações do UAU gravadas com sucesso.',
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
    setListUrlApiUAU([]);
    setSelectedBot('');
  }

  return (
    <Root
      header={
        <ContentHeader
          title="Integração UAU"
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
            listUrlApiUAU={listUrlApiUAU}
            addUrlApiUAU={addUrlApiUAU}
            removeUrlApiUAU={removeUrlApiUAU}
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

export default Uau;
