import react, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { selectUser } from 'app/store/userSlice';
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
  rdStationClienteId: yup
    .string()
    .nullable(),
  rdStationClientSecret: yup
    .string()
    .nullable(),
  rdStationRefreshToken: yup
    .string()
    .nullable(),
});

const defaultValues = {
  bot: '',
  rdStationClienteId: '',
  rdStationClientSecret: '',
  rdStationRefreshToken: '',
};

function RdStation() {
  const [selectedBot, setSelectedBot] = useState('');
  const [listBots, setListBots] = useState([]);
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
    setValue('rdStationClienteId', dataBot.rdStationClienteId, { shouldValidate: true });
    setValue('rdStationClientSecret', dataBot.rdStationClientSecret, { shouldValidate: true });
    setValue('rdStationRefreshToken', dataBot.rdStationRefreshToken, { shouldValidate: true });
  };

  async function onSubmit(data) {
    setLoadingConfirmar(true);

    const dataBot = listBots.find((bot) => bot.botNumero === selectedBot);

    dataBot.rdStationClienteId = data.rdStationClienteId;
    dataBot.rdStationClientSecret = data.rdStationClientSecret;
    dataBot.rdStationRefreshToken = data.rdStationRefreshToken;

    await axios
      .post('Bot/GravarBotRdStation', dataBot)
      .then((response) => {
        setAlert({
          'type': 'success',
          'message': 'Configurações RD Station gravadas com sucesso.',
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
  }

  return (
    <Root
      header={
        <ContentHeader
          title="Integração RD Station"
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
            handleChangeBot={handleChangeBot}
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

export default RdStation;
