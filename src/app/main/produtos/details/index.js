import react, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import numeral from 'numeral';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { showMessage } from 'app/store/fuse/messageSlice';
import { selectUser } from 'app/store/userSlice';
import FormHeader from './formHeader';
import ConfirmAlertExcluir from '../../../utilities/confirmAlert';
import { currencyMask } from '../../../utilities/mask/currency';
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
  descricao: yup
    .string()
    .nullable(),
  qtd: yup
    .string()
    .nullable(),
  valor: yup
    .string()
    // .required('Digite o valor')
    .nullable(),
  imgCapaUrl: yup
    .string()
    .nullable(),
  ativo: yup
    .bool(),
  categoriaProdutoId: yup
    .string()
    .nullable()
    .required("Selecione uma Categoria para o produto"),
  tipoMedidaId: yup
    .string()
    .nullable()
    .required("Selecione um Tipo de Medida para o produto")
});

const defaultValues = {
  id: 0,
  empresaId: 0,
  categoriaProdutoId: '',
  tipoMedidaId: '',
  nome: '',
  descricao: '',
  qtd: '',
  valor: '',
  imgCapaUrl: '',
  ativo: true,
};

function Produto() {
  const [loadingSalvar, setLoadingSalvar] = useState(false);
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false);
  const [checked, setChecked] = useState(true);
  const [categoriaProdutoList, setCategoriaProdutoList] = useState([]);
  const [tipoMedidaList, setTipoMedidaList] = useState([]);
  const [valor, setValor] = useState('');

  const [uploadFile, setUploadFile] = useState(null);

  const user = useSelector(selectUser);
  const routeParams = useParams();
  const dispatch = useDispatch();

  const { control, formState, setValue, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, errors } = formState;

  // Função consulta lista de contatos
  const getCategoriasProdutos = async () => {
    axios
      .get('CategoriaProduto')
      .then((response) => {
        setCategoriaProdutoList(response.data.conteudo[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Função consulta lista de contatos
  const getTiposMedidas = async () => {
    axios
      .get('TipoMedida')
      .then((response) => {
        setTipoMedidaList(response.data.conteudo[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Busca o Produto
  const getProduto = async (produtoId) => {
    axios
      .get(`Produto/${produtoId}`)
      .then((response) => {
        setValue('id', response.data.conteudo[0].id, { shouldValidate: true });
        setValue('nome', response.data.conteudo[0].nome, { shouldValidate: true });
        setValue('tipoMedidaId', response.data.conteudo[0].tipoMedidaId, { shouldValidate: true });
        setValue('categoriaProdutoId', response.data.conteudo[0].categoriaProdutoId, { shouldValidate: true });
        setValue('ativo', response.data.conteudo[0].ativo, { shouldValidate: true });

        if (response.data.conteudo[0].imgCapaUrl) {
          setValue('imgCapaUrl', response.data.conteudo[0].imgCapaUrl, { shouldValidate: true });
        }

        if (response.data.conteudo[0].descricao) {
          setValue('descricao', response.data.conteudo[0].descricao, { shouldValidate: true });
        }

        if (response.data.conteudo[0].qtd) {
          setValue('qtd', response.data.conteudo[0].qtd, { shouldValidate: true });
        }

        if (response.data.conteudo[0].valor) {
          setValue('valor', response.data.conteudo[0].valor, { shouldValidate: true });
        }

        let newValor = String(response.data.conteudo[0].valor);

        if (newValor !== '0') {
          // Ajusta casas decimais para padrão 2
          newValor = numeral(newValor).format('0.00');
          handleValor(newValor);
        }

        setChecked(response.data.conteudo[0].ativo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (routeParams.produtoId !== "new") {
      getProduto(routeParams.produtoId);
    }

    setValue('empresaId', user.empresaId, { shouldValidate: true });

    getCategoriasProdutos();
    getTiposMedidas();
  }, [routeParams]);

  useEffect(() => {
    if (uploadFile) {
      const fileUrl = URL.createObjectURL(uploadFile);
      setValue('imgCapaUrl', fileUrl, { shouldValidate: true });
    }
  }, [uploadFile]);

  function handleValor(data) {
    // Insere mascara monetária padrão pt-BR
    data = currencyMask(data);
    setValor(data);
    // // Altera para o padrão float
    data = data.replace(".", "");
    data = data.replace(",", ".");
    setValue('valor', data, { shouldValidate: true });
  }

  // Abre a caixa de confirmação de Exclusão
  function openConfirmExcluir() {
    setShowConfirmExcluir(true);
  }

  function handleExcluir() {
    // Inicia o load
    setLoadingExcluir(true);

    axios
      .delete(`Produto/${getValues('id')}`)
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
        setValor('');
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

    if (data.valor === '') {
      data.valor = '0';
    }

    // if (data.qtd === '') {
    //   data.qtd = '0';
    // }

    const newData = new FormData();
    newData.append('id', data.id);
    newData.append('empresaId', data.empresaId);
    newData.append('categoriaProdutoId', data.categoriaProdutoId);
    newData.append('tipoMedidaId', data.tipoMedidaId);
    newData.append('nome', data.nome);
    newData.append('descricao', data.descricao);
    newData.append('qtd', data.qtd);
    newData.append('valor', valor);
    newData.append('imgCapa', uploadFile);
    newData.append('imgCapaUrl', data.imgCapaUrl);
    newData.append('ativo', data.ativo);

    if (data.id) {
      await axios
        .patch('Produto', newData)
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
        .post('Produto', newData)
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
            isValid={isValid}
          />
        }
        content={
          <>
            <div className="flex-auto p-24 sm:p-40">
              {/* Formulária da página */}
              <Form
                categoriaProdutoList={categoriaProdutoList}
                tipoMedidaList={tipoMedidaList}
                control={control}
                errors={errors}
                checked={checked}
                setChecked={setChecked}
                valor={valor}
                handleValor={handleValor}
                setUploadFile={setUploadFile}
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

export default Produto;
