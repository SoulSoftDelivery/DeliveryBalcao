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
            label="Usuário Capys"
            name="capysUsuario"
            disabled={false}
            iconInput="user"
            control={control}
            error={!!errors.capysUsuario}
            helperText={errors?.capysUsuario?.message}
          />
        </div>

        <div>
          <InputPassword
            label="Senha"
            name="capysSenhaUsuario"
            showSenha={showSenha}
            setShowSenha={setShowSenha}
            control={control}
            error={!!errors.capysSenhaUsuario}
            helperText={errors?.capysSenhaUsuario?.message}
          />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-4 md:gap-4">
        <div>
          <InputText
            label="Token Capys"
            name="capysToken"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.capysToken}
            helperText={errors?.capysToken?.message}
          />
        </div>

        <div>
          <InputText
            label="ID Organização Capys"
            name="capysIdOrganizacao"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.capysIdOrganizacao}
            helperText={errors?.capysIdOrganizacao?.message}
          />
        </div>

        <div>
          <InputText
            label="Número WhatsApp"
            name="capysNumWhatsapp"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.capysNumWhatsapp}
            helperText={errors?.capysNumWhatsapp?.message}
          />
        </div>

        <div>
          <InputText
            label="Rota WhatsApp"
            name="rotaWhatsapp"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.rotaWhatsapp}
            helperText={errors?.rotaWhatsapp?.message}
          />
        </div>
      </div>

      <div className="grid grid-col">
        <div>
          <InputText
            label="Capys Chave Integração"
            name="capysChaveIntegracao"
            disabled={true}
            iconInput="settings"
            control={control}
            error={!!errors.capysChaveIntegracao}
            helperText={errors?.capysChaveIntegracao?.message}
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
