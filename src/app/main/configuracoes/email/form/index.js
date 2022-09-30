import React from 'react';
import InputPasswordToggleView from 'src/app/utilities/inputs/inputPasswordToggleView';
import InputSelectBot from 'src/app/utilities/inputs/inputSelectBot';
import InputText from 'src/app/utilities/inputs/inputText';
import InputCheckbox from 'src/app/utilities/inputs/inputCheckbox';
import ButtonReset from 'src/app/utilities/buttons/reset';
import ButtonConfirm from 'src/app/utilities/buttons/confirm';

const index = ({
  listBots,
  handleChangeBot,
  showSenha,
  setShowSenha,
  checked,
  setChecked,
  resetForm,
  loadingConfirmar,
  isValid,
  control,
  errors,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-col">
        <div>
          <InputSelectBot
            label="Bot"
            name="bot"
            control={control}
            listBots={listBots}
            handleChangeBot={handleChangeBot}
            // error={!!errors.bot}
            // helperText={errors?.bot?.message}
          />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-2 md:gap-2">
        <div>
          <InputText
            label="Email do Usuário"
            name="emailUsuario"
            disabled={false}
            iconInput="email"
            control={control}
            error={!!errors.emailUsuario}
            helperText={errors?.emailUsuario?.message}
          />
        </div>

        <div>
          <InputPasswordToggleView
            label="Senha"
            name="emailSenha"
            showSenha={showSenha}
            setShowSenha={setShowSenha}
            control={control}
            error={!!errors.emailSenha}
            helperText={errors?.emailSenha?.message}
          />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-3 md:gap-3">
        <div>
          <InputText
            label="Servidor"
            name="emailServidor"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.emailServidor}
            helperText={errors?.emailServidor?.message}
          />
        </div>

        <div>
          <InputText
            label="Porta"
            name="emailPorta"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.emailPorta}
            helperText={errors?.emailPorta?.message}
          />
        </div>

        <div>
          <InputText
            label="Remetente"
            name="emailRemetente"
            disabled={false}
            iconInput="email"
            control={control}
            error={!!errors.emailRemetente}
            helperText={errors?.emailRemetente?.message}
          />
        </div>

        <div>
          <InputCheckbox
            label="Usar SSL no Email?"
            name="emailUsarSSL"
            control={control}
            checked={checked}
            setChecked={setChecked}
          />
        </div>
      </div>

      <div className="text-center">
        <ButtonReset label="Limpar" resetForm={resetForm} />
        <ButtonConfirm label="Confirmar" disabled={!isValid} loading={loadingConfirmar} />
      </div>
    </form>
  );
};

export default index;
