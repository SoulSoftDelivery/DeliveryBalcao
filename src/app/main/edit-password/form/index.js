import React from 'react';
import InputPassword from 'src/app/utilities/inputs/inputPassword';
import ButtonReset from 'src/app/utilities/buttons/reset';
import ButtonConfirm from 'src/app/utilities/buttons/confirm';

const index = ({
  showSenhaAtual,
  setShowSenhaAtual,
  showSenhaNova,
  setShowSenhaNova,
  showSenhaConfirmar,
  setShowSenhaConfirmar,
  resetForm,
  loadingConfirmar,
  isValid,
  dirtyFields,
  control,
  errors,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-col md:grid-cols-3 md:gap-3">
        <div>
          <InputPassword
            label="Senha Atual"
            name="senhaAtual"
            showSenha={showSenhaAtual}
            setShowSenha={setShowSenhaAtual}
            control={control}
            error={!!errors.senhaAtual}
            helperText={errors?.senhaAtual?.message}
          />
        </div>

        <div>
          <InputPassword
            label="Nova Senha"
            name="novaSenha"
            showSenha={showSenhaNova}
            setShowSenha={setShowSenhaNova}
            control={control}
            error={!!errors.novaSenha}
            helperText={errors?.novaSenha?.message}
          />
        </div>

        <div>
          <InputPassword
            label="Confirmar Nova Senha"
            name="confirmarNovaSenha"
            showSenha={showSenhaConfirmar}
            setShowSenha={setShowSenhaConfirmar}
            control={control}
            error={!!errors.confirmarNovaSenha}
            helperText={errors?.confirmarNovaSenha?.message}
          />
        </div>
      </div>

      <div className="text-center">
        <ButtonReset label="Limpar" resetForm={resetForm} />
        <ButtonConfirm
          label="Confirmar"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          loading={loadingConfirmar}
        />
      </div>
    </form>
  );
};

export default index;
