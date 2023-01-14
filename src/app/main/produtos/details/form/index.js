import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputText from '../../../../utilities/inputs/inputText';
// import InputCurrency from '../../../../utilities/inputs/inputCurrency';
import InputSelect from '../../../../utilities/inputs/inputSelect';
import InputCheckbox from '../../../../utilities/inputs/inputCheckbox';

const index = ({
  categoriaProdutoList,
  tipoMedidaList,
  control,
  errors,
  checked,
  setChecked,
  setValue,
  valor,
  handleValor,
}) => {
  return (
    <>
      <div className="h-full">
        <div className="grid grid-col md:grid-cols-3 md:gap-3">
          <div>
            <InputText
              label="Nome"
              name="nome"
              disabled={false}
              control={control}
              error={!!errors.nome}
              helperText={errors?.nome?.message}
            />
          </div>

          <div>
            <TextField
              className="mb-16 w-full"
              label="Preço"
              value={valor}
              onChange={(e) => handleValor(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
              variant="outlined"
            />
          </div>

          <div>
            <InputText
              label="Quantidade"
              name="qtd"
              disabled={false}
              control={control}
              error={!!errors.qtd}
              helperText={errors?.qtd?.message}
            />
          </div>
        </div>
        <div className="grid grid-col md:grid-cols-2 md:gap-2">
          <div>
            <InputSelect
              label="Categoria"
              name="categoriaProdutoId"
              control={control}
              list={categoriaProdutoList}
              // handleChange={handleChangeCategoriaProduto}
              error={!!errors.categoriaProdutoId}
              helperText={errors?.categoriaProdutoId?.message}
            />
          </div>
          <div>
            <InputSelect
              label="Tipo Medida"
              name="tipoMedidaId"
              control={control}
              list={tipoMedidaList}
              // handleChange={handleChangeCategoriaProduto}
              error={!!errors.tipoMedidaId}
              helperText={errors?.tipoMedidaId?.message}
            />
          </div>
        </div>
        <div className="grid grid-col">
          <div>
            <InputText
              label="Descricao"
              name="descricao"
              disabled={false}
              control={control}
              error={!!errors.descricao}
              helperText={errors?.descricao?.message}
            />
          </div>
        </div>
        <div className="grid grid-col">
          <div>
            <InputCheckbox
              label="Cadastro Ativo?"
              name="ativo"
              control={control}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
