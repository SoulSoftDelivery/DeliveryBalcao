import InputText from '../../../../utilities/inputs/inputText';
import InputSelect from '../../../../utilities/inputs/inputSelect';
import InputCheckbox from '../../../../utilities/inputs/inputCheckbox';

const index = ({
  categoriaProdutoList,
  tipoMedidaList,
  control,
  errors,
  checked,
  setChecked,
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
              iconInput="abc"
              control={control}
              error={!!errors.nome}
              helperText={errors?.nome?.message}
            />
          </div>

          <div>
            <InputText
              label="Preço"
              name="valor"
              disabled={false}
              iconInput="attach_money"
              control={control}
              error={!!errors.valor}
              helperText={errors?.valor?.message}
            />
          </div>

          <div>
            <InputText
              label="Quantidade"
              name="qtd"
              disabled={false}
              iconInput="123"
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
              iconInput="location_on"
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
