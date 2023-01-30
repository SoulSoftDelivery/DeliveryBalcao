import InputPasswordToggleView from 'src/app/utilities/inputs/inputPasswordToggleView';
import InputText from '../../../../utilities/inputs/inputText';
// import InputPhone from '../../../../utilities/inputs/inputPhone';
import InputCheckbox from '../../../../utilities/inputs/inputCheckbox';
import InputSelect from '../../../../utilities/inputs/inputSelect';

const index = ({
  tipoUsuarioLista,
  showSenha,
  setShowSenha,
  // showSenhaConfirmar,
  // setShowSenhaConfirmar,
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
              iconInput="person"
              control={control}
              error={!!errors.nome}
              helperText={errors?.nome?.message}
            />
          </div>

          <div>
            <InputSelect
              label="Tipo Usuário"
              name="tipoUsuarioId"
              control={control}
              list={tipoUsuarioLista}
              // handleChange={handleChangeCategoriaProduto}
              error={!!errors.tipoUsuarioId}
              helperText={errors?.tipoUsuarioId?.message}
            />
          </div>

          <div>
            {/* <InputPhone
              label="Número Telefone"
              name="telefone"
              disabled={false}
              control={control}
              iconInput="call"
              error={!!errors.telefone}
              helperText={errors?.telefone?.message}
            /> */}
            <InputText
              label="Telefone"
              name="telefone"
              disabled={false}
              iconInput="call"
              control={control}
              error={!!errors.telefone}
              helperText={errors?.telefone?.message}
            />
          </div>
        </div>

        <div className="grid grid-col md:grid-cols-2 md:gap-2">
          <div>
            <InputText
              label="Email"
              name="email"
              disabled={false}
              iconInput="mail"
              control={control}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </div>

          <div>
            <InputPasswordToggleView
              label="Senha"
              name="senha"
              showSenha={showSenha}
              setShowSenha={setShowSenha}
              control={control}
              error={!!errors.senha}
              helperText={errors?.senha?.message}
            />
          </div>

          {/* <div>
            <InputPasswordToggleView
              label="Confirmar Senha"
              name="confirmarSenha"
              showSenha={showSenhaConfirmar}
              setShowSenha={setShowSenhaConfirmar}
              control={control}
              error={!!errors.confirmarSenha}
              helperText={errors?.confirmarSenha?.message}
            />
          </div> */}
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
