import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import * as yup from 'yup';
import _ from '@lodash';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import GeneralAlert from '../../utilities/generalAlert';
import Form from './form';

// Validação de Formulário
const schema = yup.object().shape({
  nomeEmpresa: yup
    .string()
    .nullable()
    .required('Digite o nome do estabelecimento.'),
  cnpjEmpresa: yup
    .string()
    .nullable(),
  telefone1Empresa: yup
    .string()
    .nullable()
    .required('Digite o telefone.'),
  telefone2Empresa: yup
    .string()
    .nullable(),
  emailEmpresa: yup
    .string()
    .nullable()
    .email('Digite um Email válido.'),
  cepEmpresa: yup
    .string()
    .nullable()
    .required('Digite o CEP.'),
  cidadeEmpresa: yup
    .string()
    .nullable()
    .required('Digite a Cidade.'),
  bairroEmpresa: yup
    .string()
    .nullable()
    .required('Digite o Bairro.'),
  ruaEmpresa: yup
    .string()
    .nullable()
    .required('Digite a Rua.'),
  numeroEmpresa: yup
    .string()
    .nullable(),
  quadraEmpresa: yup
    .string()
    .nullable(),
  loteEmpresa: yup
    .string()
    .nullable(),
  complementoEmpresa: yup
    .string()
    .nullable(),
  nomeUsuario: yup
    .string()
    .nullable()
    .required('Digite o nome.'),
  telefoneUsuario: yup
    .string()
    .nullable()
    .required('Digite o telefone.'),
  emailUsuario: yup
    .string()
    .nullable()
    .email('Digite um Email válido.')
    .required('Digite um email.'),
  senhaUsuario: yup
    .string()
    .nullable()
    .required('Digite a Senha.')
    .min(4, 'Senha inválida - Mínimo de 4 caracteres.'),
  confirmarSenhaUsuario: yup
    .string()
    .nullable()
    .required('Confirme a Senha.')
    .min(4, 'Senha inválida - Mínimo de 4 caracteres.')
    .oneOf([yup.ref('senhaUsuario'), null], 'Senhas diferentes.'),
});

const defaultValues = {
  nomeEmpresa: '',
  cnpjEmpresa: '',
  telefone1Empresa: '',
  telefone2Empresa: '',
  emailEmpresa: '',
  cepEmpresa: '',
  cidadeEmpresa: '',
  bairroEmpresa: '',
  ruaEmpresa: '',
  numeroEmpresa: '',
  quadraEmpresa: '',
  loteEmpresa: '',
  complementoEmpresa: '',
  nomeUsuario: '',
  telefoneUsuario: '',
  emailUsuario: '',
  senhaUsuario: '',
  confirmarSenhaUsuario: '',
};

function SignUpPage() {
  const [showSenhaUsuario, setShowSenhaUsuario] = useState(false);
  const [showConfirmarSenhaUsuario, setShowConfirmarSenhaUsuario] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const dispatch = useDispatch();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  async function onSubmit(data) {
    // Inicia o loading
    setLoadingCreate(true);

    axios
      .post('Empresa/CadastrarEmpresaUsuario', data)
      .then((response) => {
        dispatch(
          showMessage({
            message: 'Cadastrado realizado com sucesso.',
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );

        resetForm();
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: error.response.data.msg ? error.response.data.msg : 'Não foi possível concluir a solicitação.',
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

    // Finaliza o loading
    setLoadingCreate(false);
  }

  function resetForm() {
    reset();
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-500 sm:w-500 mx-auto sm:mx-0">
          <img className="w-60" src="assets/images/logo/logo-resumida.png" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Cadastrar
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Voltar para acessar?</Typography>
            <Link className="ml-4" to="/sign-in">
              Login
            </Link>
          </div>

          {/* Formulário de Login */}
          <div className="w-full">
            {/* Campo para alertas */}
            {errors.generalAlert && (
              <div className="mt-10">
                <GeneralAlert
                  type={errors.generalAlert.type}
                  message={errors.generalAlert.message}
                />
              </div>
            )}

            {/* Formulária da página */}
            <Form
              showSenha={showSenhaUsuario}
              setShowSenha={setShowSenhaUsuario}
              showConfirmarSenha={showConfirmarSenhaUsuario}
              setShowConfirmarSenha={setShowConfirmarSenhaUsuario}
              loadingCreate={loadingCreate}
              dirtyFields={dirtyFields}
              isValid={isValid}
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              resetForm={resetForm}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default SignUpPage;
