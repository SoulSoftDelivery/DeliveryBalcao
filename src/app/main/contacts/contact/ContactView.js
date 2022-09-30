import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { selectUser } from 'app/store/userSlice';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import _ from '@lodash';
import LoadingButton from '@mui/lab/LoadingButton';
import ButtonConfirm from 'src/app/utilities/buttons/confirm';
import ConfirmAlertExcluir from '../../../utilities/confirmAlert';
import GeneralAlert from '../../../utilities/generalAlert';
import Form from '../form';

// Validação de formulário yup
const schema = yup.object().shape({
  contatoNome: yup
    .string()
    .nullable()
    .required('Digite o Nome.'),
  contatoWhatsappNum: yup
    .string()
    .nullable()
    .required('Digite o número de WhatsApp.'),
  contatoEmail: yup
    .string()
    .nullable(),
  contatoCpfCnpj: yup
    .string()
    .nullable(),
  contatoEndereco: yup
    .string()
    .nullable(),
  contatoSexo: yup
    .string()
    .nullable(),
});

const defaultValues = {
  rowKey: '',
  partitionKey: '',
  contatoNome: '',
  contatoWhatsappNum: '',
  contatoEmail: '',
  contatoCpfCnpj: '',
  contatoEndereco: '',
  contatoSexo: '',
};

const ContactView = () => {
  const [loadingConfirmar, setLoadingConfirmar] = useState(false);
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false);
  const [contatoWhatsappState, setContatoWhatsappState] = useState('');
  const [alert, setAlert] = useState({
    'type': 'error',
    'message': '',
  });

  const routeParams = useParams();

  const { control, formState, setValue, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, errors } = formState;

  const user = useSelector(selectUser);

  // Função consulta lista de contatos
  const getContato = async (contatoWhatsappNum) => {
    const data = {
      params: {
        'partitionKey': user.partitionKey,
        'contatoWhatsappNum': contatoWhatsappNum,
      },
    };

    axios
      .get('RegistrarContato/BuscarContato', data)
      .then((response) => {
        setValue('rowKey', response.data.RowKey, { shouldValidate: true });
        setValue('contatoNome', response.data.ContatoNome, { shouldValidate: true });
        setValue('contatoWhatsappNum', response.data.ContatoWhatsappNum, { shouldValidate: true });
        setValue('contatoEmail', response.data.ContatoEmail, { shouldValidate: true });
        setValue('contatoCpfCnpj', response.data.ContatoCpfCnpj, { shouldValidate: true });
        setValue('contatoEndereco', response.data.ContatoEndereco, { shouldValidate: true });
        setValue('contatoSexo', response.data.ContatoSexo, { shouldValidate: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (routeParams.id !== "new") {
      getContato(routeParams.id);
    } else {
      reset();
    }

    setValue('partitionKey', user.partitionKey, { shouldValidate: true });
  }, [routeParams]);

  // if (!contact) {
  //   return <FuseLoading />;
  // }

  // Abre a caixa de confirmação de Exclusão
  function openConfirmExcluir(contatoWhatsappNum) {
    setShowConfirmExcluir(true);
    // Guarda o número de WhatsApp selecionado
    setContatoWhatsappState(contatoWhatsappNum);
  }

  async function handleExcluir() {
    // Inicia o load
    setLoadingExcluir(true);

    const dataContatoRegistro = {
      data: {
        'ContatoRegWhatsappNum': contatoWhatsappState,
        'PartitionKey': user.partitionKey,
        'ContatoRegGrupo': 'UAU',
      },
    };

    await axios
      .delete('RegistrarContato/ExcluirContatoRegistro', dataContatoRegistro)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const dataContato = {
      data: {
        'PartitionKey': user.partitionKey,
        'ContatoWhatsappNum': contatoWhatsappState,
      },
    };

    await axios
      .delete('RegistrarContato/ExcluirContato', dataContato)
      .then((response) => {
        if (response.data.mensagem) {
          setAlert({
            'type': 'warning',
            'message': response.data.mensagem,
          });
        } else {
          setAlert({
            'type': 'success',
            'message': 'Contato excluido com sucesso.',
          });
        }
      })
      .catch((error) => {
        setAlert({
          'type': 'error',
          'message': 'Não foi possível concluir a solicitação de exclusão do Contato.',
        });
        console.log(error);
      });

    // Finaliza o load
    setLoadingExcluir(false);
    setContatoWhatsappState('');
  }

  async function onSubmit(data) {
    setLoadingConfirmar(true);

    if (data.rowKey) {
      await axios
        .patch('RegistrarContato/EditarContato', data)
        .then((response) => {
          setAlert({
            'type': 'success',
            'message': 'Contato alterado com sucesso.',
          });
        })
        .catch((error) => {
          setAlert({
            'type': 'error',
            'message': 'Não foi possível concluir a Solicitação.',
          });
          console.log(error);
        });
    } else {
      await axios
        .post('RegistrarContato/GravarContato', data)
        .then((response) => {
          setAlert({
            'type': 'success',
            'message': 'Contato gravado com sucesso.',
          });
        })
        .catch((error) => {
          setAlert({
            'type': 'error',
            'message': 'Não foi possível concluir a Solicitação.',
          });
          console.log(error);
        });
    }

    setLoadingConfirmar(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        className="relative w-full h-160 sm:h-192 px-32 sm:px-48"
        sx={{
          backgroundColor: 'background.default',
        }}
      >
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src="assets/images/pages/profile/fundo_preto.png"
          alt="user background"
        />
      </Box>
      <div className="relative flex flex-col flex-auto items-center p-24 pt-0 sm:p-48 sm:pt-0">
        <div className="w-full max-w-3xl">
          <div className="flex flex-auto items-end -mt-64">
            <Avatar
              sx={{
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: 'background.paper',
                backgroundColor: 'background.default',
                color: 'text.secondary',
              }}
              className="w-128 h-128 text-64 font-bold"
              src="assets/images/avatars/profile.jpg"
              alt={getValues('ContatoNome')}
            >
              {getValues('ContatoNome')}
            </Avatar>
            <div className="flex items-center ml-auto mb-4">
              {/* <Button variant="contained" color="primary" component={NavLinkAdapter} to="save">
                <span className="mx-8">Salvar</span>
              </Button> */}
              <ButtonConfirm label="Salvar" disabled={!isValid} loading={loadingConfirmar} />
              {getValues('rowKey') && (
                <LoadingButton
                  variant="contained"
                  color="error"
                  size="large"
                  className="mt-16 mx-8"
                  loading={loadingExcluir}
                  onClick={() => openConfirmExcluir(getValues('contatoWhatsappNum'))}
                >
                  Excluir
                </LoadingButton>
              )}
            </div>
          </div>
          <Typography className="mt-12 text-4xl font-bold truncate">{getValues('ContatoNome')}</Typography>

          {/* <Divider className="mt-16 mb-24" /> */}

          {/* Alert para mensagem geral */}
          {alert.message && (
            <GeneralAlert
              type={alert.type}
              message={alert.message}
              setAlert={setAlert}
            />
          )}

          <Form
            control={control}
            errors={errors}
            getValues={getValues}
          />

          {/* ConfirmAlert Excluir */}
          <ConfirmAlertExcluir
            open={showConfirmExcluir}
            setOpen={setShowConfirmExcluir}
            message="Excluir o contato selecionado?"
            returnFunction={handleExcluir}
          />
        </div>
      </div>
    </form>
  );
};

export default ContactView;
