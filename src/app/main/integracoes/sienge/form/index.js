import React from 'react';
import InputSelectBot from 'src/app/utilities/inputs/inputSelectBot';
import InputText from 'src/app/utilities/inputs/inputText';
import InputPassword from 'src/app/utilities/inputs/inputPassword';
import ContainerAddUrl from 'src/app/utilities/others/containerAddUrl';
import ButtonReset from 'src/app/utilities/buttons/reset';
import ButtonConfirm from 'src/app/utilities/buttons/confirm';

const index = ({
  listBots,
  listChaveIntegracao,
  addChaveIntegracao,
  removeChaveIntegracao,
  handleChangeBot,
  showSenha,
  setShowSenha,
  resetForm,
  loadingConfirmar,
  selectedBot,
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
            name="botNumero"
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
            label="Login Usuário Sienge"
            name="siengeLoginUsuario"
            disabled={false}
            iconInput="person"
            control={control}
            error={!!errors.siengeLoginUsuario}
            helperText={errors?.siengeLoginUsuario?.message}
          />
        </div>

        <div>
          <InputPassword
            label="Senha Usuário Sienge"
            name="siengeSenhaUsuario"
            showSenha={showSenha}
            setShowSenha={setShowSenha}
            control={control}
            error={!!errors.siengeSenhaUsuario}
            helperText={errors?.siengeSenhaUsuario?.message}
          />
        </div>
      </div>

      <div className="grid grid-col">
        <div>
          <InputText
            label="Caminho(s) webservice Sienge"
            name="siengeChaveIntegracao"
            disabled={true}
            iconInput="settings"
            control={control}
            error={!!errors.siengeChaveIntegracao}
            helperText={errors?.siengeChaveIntegracao?.message}
          />
        </div>
      </div>

      {selectedBot && (
        <>
          <ContainerAddUrl
            listUrl={listChaveIntegracao}
            addUrl={addChaveIntegracao}
            removeUrl={removeChaveIntegracao}
          />
        </>
      )}

      <div className="text-center">
        <ButtonReset label="Limpar" resetForm={resetForm} />
        <ButtonConfirm label="Confirmar" disabled={!isValid} loading={loadingConfirmar} />
      </div>
    </form>
  );
};

export default index;
