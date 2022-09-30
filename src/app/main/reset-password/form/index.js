import React from 'react';
import InputPasswordToggleView from '../../../utilities/inputs/inputPasswordToggleView';
import ButtonReset from '../../../utilities/buttons/reset';
import ButtonConfirm from '../../../utilities/buttons/confirm';

const index = ({
  showNovaSenha,
  setShowNovaSenha,
  showConfirmarNovaSenha,
  setShowConfirmarNovaSenha,
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
    <form
      name="resetPasswordForm"
      noValidate
      className="flex flex-col justify-center w-full mt-32"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputPasswordToggleView
        label="Nova senha"
        name="novaSenha"
        showSenha={showNovaSenha}
        setShowSenha={setShowNovaSenha}
        control={control}
        error={!!errors.novaSenha}
        helperText={errors?.novaSenha?.message}
      />

      <InputPasswordToggleView
        label="Confirmar nova senha"
        name="confirmarNovaSenha"
        showSenha={showConfirmarNovaSenha}
        setShowSenha={setShowConfirmarNovaSenha}
        control={control}
        error={!!errors.confirmarNovaSenha}
        helperText={errors?.confirmarNovaSenha?.message}
      />

      <div className="text-center">
        <ButtonReset label="Limpar" resetForm={resetForm} />

        <ButtonConfirm
          label="Alterar"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          loading={loadingConfirmar}
        />
      </div>
    </form>
  );
};

export default index;
