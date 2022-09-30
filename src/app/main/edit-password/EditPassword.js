import react, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { selectUser } from 'app/store/userSlice';
import handlePassword from '../../services/handlePassword';
import ContentHeader from '../../utilities/layout/contentHeader';
import GeneralAlert from '../../utilities/generalAlert';
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
  senhaAtual: yup
    .string()
    .required('Digite a Senha Atual.')
    .min(4, 'Senha inválida - Mínimo de 4 caracteres.'),
  novaSenha: yup
    .string()
    .required('Digite a Nova Senha.')
    .min(4, 'Senha inválida - Mínimo de 4 caracteres.'),
  confirmarNovaSenha: yup
    .string()
    .required('Confirme a Nova Senha.')
    .min(4, 'Senha inválida - Mínimo de 4 caracteres.')
    .oneOf([yup.ref('novaSenha'), null], 'Senhas diferentes.'),
});

const defaultValues = {
  senhaAtual: '',
  novaSenha: '',
  confirmarNovaSenha: '',
};

function EditPassword() {
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showSenhaNova, setShowSenhaNova] = useState(false);
  const [showSenhaConfirmar, setShowSenhaConfirmar] = useState(false);
  const [loadingConfirmar, setLoadingConfirmar] = useState(false);
  const [alert, setAlert] = useState({
    'type': 'error',
    'message': '',
  });

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const user = useSelector(selectUser);

  async function onSubmit(data) {
    setLoadingConfirmar(true);
    // Acessando Api para criptografia da Nova Senha
    await handlePassword
      .handleEncripty(data.senhaAtual, true)
      .then((senha) => {
        // Verifica se a senha atual que foi digitada está correta
        if (senha === user.senha) {
          // Acessa a Api de Criptografa novamente para preparara nova senha para salvar
          handlePassword
            .handleEncripty(data.novaSenha, true)
            .then((novaSenha) => {
              const dataEditSenha = {
                'PartitionKey': user.partitionKey,
                'Email': user.email,
                'Senha': data.senhaAtual,
                'NovaSenha': novaSenha,
              };

              axios
                .post('Cliente/AlterarSenhaClienteLogado', dataEditSenha)
                .then((response) => {
                  setAlert({
                    'type': 'success',
                    'message': 'Senha Alterada com sucesso.',
                  });

                  reset();
                })
                .catch((error) => {
                  setAlert({
                    'type': 'error',
                    'message': 'Não foi possível concluir a Solicitação.',
                  });
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setAlert({
            'type': 'error',
            'message': 'Senha Atual Inválida.',
          });
        }
      })
      .catch((error) => {
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
          title="Alteração de senha"
          icon="https"
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
            showSenhaAtual={showSenhaAtual}
            setShowSenhaAtual={setShowSenhaAtual}
            showSenhaNova={showSenhaNova}
            setShowSenhaNova={setShowSenhaNova}
            showSenhaConfirmar={showSenhaConfirmar}
            setShowSenhaConfirmar={setShowSenhaConfirmar}
            resetForm={resetForm}
            loadingConfirmar={loadingConfirmar}
            isValid={isValid}
            dirtyFields={dirtyFields}
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

export default EditPassword;
