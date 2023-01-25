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
  numero: yup
    .number()
    .nullable()
    .required('Digite o número da mesa'),
  ativo: yup
    .bool(),
});

const defaultValues = {
  id: 0,
  empresaId: 0,
  numero: 0,
  ativo: true,
};

function Details() {
  const [loadingSalvar, setLoadingSalvar] = useState(false);
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false);
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

  // Busca a Mesa
  const getMesa = async (mesaId) => {
    axios
      .get(`Mesa/${mesaId}`)
      .then((response) => {
        setValue('id', response.data.conteudo[0].id, { shouldValidate: true });
        setValue('numero', response.data.conteudo[0].numero, { shouldValidate: true });
        setValue('ativo', response.data.conteudo[0].ativo, { shouldValidate: true });

        setChecked(response.data.conteudo[0].ativo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (routeParams.mesaId !== "new") {
      getMesa(routeParams.mesaId);
    }

    setValue('empresaId', user.empresaId, { shouldValidate: true });
  }, [routeParams]);

  // Abre a caixa de confirmação de Exclusão
  function openConfirmExcluir() {
    setShowConfirmExcluir(true);
  }

  function handleExcluir() {
    // Inicia o load
    setLoadingExcluir(true);

    axios
      .delete(`Mesa/${getValues('mesaId')}`)
      .then((response) => {
        if (response.data.msg) {
          dispatch(
            showMessage({
              message: response.data.msg,
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'success',
            })
          );
        } else {
          dispatch(
            showMessage({
              message: 'Registro excluido com sucesso.',
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: 'success',
            })
          );
        }

        resetForm();
        setChecked(false);
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: 'Não foi possível concluir a solicitação.',
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

    // Finaliza o load
    setLoadingExcluir(false);
  }

  async function onSubmit(data) {
    setLoadingSalvar(true);

    if (data.id) {
      await axios
        .patch('Mesa', data)
        .then((response) => {
          dispatch(
            showMessage({
              message: 'Registro alterado com sucesso.',
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
              message: 'Não foi possível concluir a Solicitação.',
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
        .post('Mesa', data)
        .then((response) => {
          dispatch(
            showMessage({
              message: 'Registro cadastrado com sucesso.',
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
              message: 'Não foi possível concluir a Solicitação.',
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

export default Details;
