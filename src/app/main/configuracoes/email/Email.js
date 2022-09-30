import react, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { selectUser } from 'app/store/userSlice';
import handlePassword from '../../../services/handlePassword';
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
  emailUsuario: yup
    .string()
    .nullable()
    .email('Digite um Email válido.')
    .required('Digite o Email do Usuário.'),
  emailSenha: yup
    .string()
    .nullable()
    .required('Digite a Senha.')
    .min(4, 'Senha inválida - Mínimo de 4 caracteres.'),
  emailServidor: yup
    .string()
    .nullable()
    .required('Digite o Servidor de Email.'),
  emailPorta: yup
    .string()
    .nullable()
    .required('Digite a Porta do Email.'),
  emailRemetente: yup
    .string()
    .nullable()
    .email('Digite um Email válido.')
    .required('Digite o Email do Remetente.'),
  emailUsarSSL: yup
    .bool(),
});

const defaultValues = {
  bot: '',
  emailUsuario: '',
  emailSenha: '',
  emailServidor: '',
  emailPorta: '',
  emailRemetente: '',
  emailUsarSSL: false,
};

function Email() {
  const [selectedBot, setSelectedBot] = useState('');
  const [listBots, setListBots] = useState([]);
  const [showSenha, setShowSenha] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loadingConfirmar, setLoadingConfirmar] = useState(false);
  const [alert, setAlert] = useState({
    'type': 'error',
    'message': '',
  });

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

  const { control, formState, setValue, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, errors } = formState;

  const handleChangeBot = (event) => {
    setSelectedBot(event.target.value);

    const dataBot = listBots.find((bot) => bot.botNumero === event.target.value);

    setValue('bot', event.target.value, { shouldValidate: true });
    setValue('emailUsuario', dataBot.emailUsuario, { shouldValidate: true });
    setValue('emailServidor', dataBot.emailServidor, { shouldValidate: true });
    setValue('emailPorta', dataBot.emailPorta, { shouldValidate: true });
    setValue('emailRemetente', dataBot.emailRemetente, { shouldValidate: true });
    setValue('emailUsarSSL', dataBot.emailUsarSSL, { shouldValidate: true });

    setChecked(dataBot.emailUsarSSL);

    // Acessando Api para criptografia da Nova Senha
    handlePassword
      .handleEncripty(dataBot.emailSenha, false)
      .then((senha) => {
        setValue('emailSenha', senha, { shouldValidate: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function onSubmit(data) {
    setLoadingConfirmar(true);

    const dataBot = listBots.find((bot) => bot.botNumero === selectedBot);

    dataBot.emailUsuario = data.emailUsuario;
    dataBot.emailServidor = data.emailServidor;
    dataBot.emailPorta = data.emailPorta;
    dataBot.emailRemetente = data.emailRemetente;
    dataBot.emailUsarSSL = data.emailUsarSSL;

    // Acessando Api para criptografia da Nova Senha
    await handlePassword
      .handleEncripty(data.emailSenha, true)
      .then((senha) => {
        dataBot.emailSenha = senha;
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .post('Bot/GravarBotEmail', dataBot)
      .then((response) => {
        setAlert({
          'type': 'success',
          'message': 'Configurações de Email gravadas com sucesso.',
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
    setChecked(false);
  }

  return (
    <Root
      header={
        <ContentHeader
          title="Configuração de Email"
          icon="email"
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
            handleChangeBot={handleChangeBot}
            showSenha={showSenha}
            setShowSenha={setShowSenha}
            checked={checked}
            setChecked={setChecked}
            resetForm={resetForm}
            loadingConfirmar={loadingConfirmar}
            isValid={isValid}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </div>
      }
      scroll="page"
    />
  );
}

export default Email;
