import react, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { showMessage } from 'app/store/fuse/messageSlice';
import { selectUser } from 'app/store/userSlice';
import FormHeader from './formHeader';
import ConfirmAlertExcluir from '../../../utilities/confirmAlert';
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
  nome: yup
    .string()
    .nullable()
    .required('Digite o nome'),
  telefone: yup
    .string()
    .nullable()
    .required('Digite o número de telefone'),
  email: yup
    .string()
    .email('Digite um email válido')
    .nullable(),
  senha: yup
    .string()
    .required('Digite a Senha.')
    .min(4, 'Senha inválida - Mínimo de 4 caracteres.'),
  // confirmarSenha: yup
  //   .string()
  //   .required('Confirme a Senha.')
  //   .min(4, 'Senha inválida - Mínimo de 4 caracteres.')
  //   .oneOf([yup.ref('senha'), null], 'Senhas diferentes.'),
  ativo: yup
    .bool(),
});

const defaultValues = {
  id: 0,
  empresaId: 0,
  tipoUsuarioId: '',
  nome: '',
  telefone: '',
  email: '',
  senha: '',
  // confirmarSenha: '',
  ativo: false,
};

function Index() {
  const [showSenha, setShowSenha] = useState(false);
  // const [showSenhaConfirmar, setShowSenhaConfirmar] = useState(false);
  const [loadingSalvar, setLoadingSalvar] = useState(false);
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false);
  const [tipoUsuarioLista, setTipoUsuarioLista] = useState([]);
  const [checked, setChecked] = useState(true);

  const user = useSelector(selectUser);
  const routeParams = useParams();
  const dispatch = useDispatch();

  const { control, formState, setValue, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, errors, dirtyFields } = formState;

  // Busca o Usuario
  const getItem = async (usuarioId) => {
    axios
      .get(`Usuario/${usuarioId}`)
      .then((response) => {
        setValue('id', response.data.conteudo[0].id, { shouldValidate: true });
        setValue('tipoUsuarioId', response.data.conteudo[0].tipoUsuarioId, { shouldValidate: true });
        setValue('nome', response.data.conteudo[0].nome, { shouldValidate: true });
        setValue('telefone', response.data.conteudo[0].telefone, { shouldValidate: true });
        setValue('email', response.data.conteudo[0].email, { shouldValidate: true });
        setValue('senha', response.data.conteudo[0].senha, { shouldValidate: true });
        setValue('ativo', response.data.conteudo[0].ativo, { shouldValidate: true });

        setChecked(response.data.conteudo[0].ativo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Função consulta lista de Tipos de Usuários
  const getTiposMedidas = async () => {
    axios
      .get('TipoUsuario')
      .then((response) => {
        setTipoUsuarioLista(response.data.conteudo[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (routeParams.usuarioId !== "new") {
      getItem(routeParams.usuarioId);
    }

    setValue('empresaId', user.empresaId, { shouldValidate: true });

    getTiposMedidas();
  }, [routeParams]);

  // Abre a caixa de confirmação de Exclusão
  function openConfirmExcluir() {
    setShowConfirmExcluir(true);
  }

  function handleExcluir() {
    // Inicia o load
    setLoadingExcluir(true);

    axios
      .delete(`Usuario/${getValues('id')}`)
      .then((response) => {
        dispatch(
          showMessage({
            message: response.data.msg !== '' ? response.data.msg : 'Registro excluido com sucesso.',
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        resetForm();
        setChecked(false);
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: error.response.data.msg !== '' ? error.response.data.msg : 'Não foi possível concluir a solicitação.',
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        console.log(error);
      });

    // Finaliza o load
    setLoadingExcluir(false);
  }

  async function onSubmit(data) {
    setLoadingSalvar(true);

    if (data.id) {
      await axios
        .patch('Usuario', data)
        .then((response) => {
          dispatch(
            showMessage({
              message: response.data.msg !== '' ? response.data.msg : 'Registro alterado com sucesso.',
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'success',
            })
          );
        })
        .catch((error) => {
          dispatch(
            showMessage({
              message: error.response.data.msg !== '' ? error.response.data.msg : 'Não foi possível concluir a Solicitação.',
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'error',
            })
          );
          console.log(error);
        });
    } else {
      await axios
        .post('Usuario', data)
        .then((response) => {
          dispatch(
            showMessage({
              message: response.data.msg !== '' ? response.data.msg : 'Registro cadastrado com sucesso.',
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'success',
            })
          );
        })
        .catch((error) => {
          dispatch(
            showMessage({
              message: error.response.data.msg !== '' ? error.response.data.msg : 'Não foi possível concluir a Solicitação.',
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'error',
            })
          );
          console.log(error);
        });
    }

    setLoadingSalvar(false);
  }

  function resetForm() {
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <Root
        header={
          <FormHeader
            handleExcluir={openConfirmExcluir}
            loadingSalvar={loadingSalvar}
            loadingExcluir={loadingExcluir}
            getValues={getValues}
            dirtyFields={dirtyFields}
            isValid={isValid}
          />
        }
        content={
          <>
            <div className="flex-auto p-24 sm:p-40">
              {/* Formulária da página */}
              <Form
                tipoUsuarioLista={tipoUsuarioLista}
                showSenha={showSenha}
                setShowSenha={setShowSenha}
                // showSenhaConfirmar={showSenhaConfirmar}
                // setShowSenhaConfirmar={setShowSenhaConfirmar}
                control={control}
                errors={errors}
                checked={checked}
                setChecked={setChecked}
              />
            </div>

            {/* ConfirmAlert Excluir */}
            <ConfirmAlertExcluir
              open={showConfirmExcluir}
              setOpen={setShowConfirmExcluir}
              message="Excluir o cadastro atual?"
              returnFunction={handleExcluir}
            />
          </>
        }
        scroll="normal"
      />
    </form>
  );
}

export default Index;
