import React from 'react';
import InputSelectBot from 'src/app/utilities/inputs/inputSelectBot';
import InputText from 'src/app/utilities/inputs/inputText';
import InputPassword from 'src/app/utilities/inputs/inputPassword';
import ContainerAddKey from 'src/app/utilities/others/containerAddKey';
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
            label="User Name"
            name="polichatUserName"
            disabled={false}
            iconInput="email"
            control={control}
            error={!!errors.polichatUserName}
            helperText={errors?.polichatUserName?.message}
          />
        </div>

        <div>
          <InputPassword
            label="Senha"
            name="polichatSenha"
            showSenha={showSenha}
            setShowSenha={setShowSenha}
            control={control}
            error={!!errors.polichatSenha}
            helperText={errors?.polichatSenha?.message}
          />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-4 md:gap-4">
        <div>
          <InputText
            label="Customer Id"
            name="polichatCustomersId"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.polichatCustomersId}
            helperText={errors?.polichatCustomersId?.message}
          />
        </div>

        <div>
          <InputText
            label="User"
            name="polichatUser"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.polichatUser}
            helperText={errors?.polichatUser?.message}
          />
        </div>

        <div>
          <InputText
            label="Channel"
            name="polichatChannel"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.polichatChannel}
            helperText={errors?.polichatChannel?.message}
          />
        </div>

        <div>
          <InputText
            label="Client Id"
            name="polichatClientId"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.polichatClientId}
            helperText={errors?.polichatClientId?.message}
          />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-3 md:gap-3">
        <div>
          <InputText
            label="Client Secret"
            name="polichatClientSecret"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.polichatClientSecret}
            helperText={errors?.polichatClientSecret?.message}
          />
        </div>

        <div>
          <InputText
            label="Rota Whatsapp"
            name="rotaWhatsapp"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.rotaWhatsapp}
            helperText={errors?.rotaWhatsapp?.message}
          />
        </div>

        <div>
          <InputText
            label="Token"
            name="polichatToken"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.polichatToken}
            helperText={errors?.polichatToken?.message}
          />
        </div>
      </div>

      <div className="grid grid-col">
        <div>
          <InputText
            label="Chave de Integração Final"
            name="polichatChaveIntegracao"
            disabled={true}
            iconInput="settings"
            control={control}
            error={!!errors.polichatChaveIntegracao}
            helperText={errors?.polichatChaveIntegracao?.message}
          />
        </div>
      </div>

      {selectedBot && (
        <>
          <ContainerAddKey
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
