import React from 'react';
import InputSelectBot from 'src/app/utilities/inputs/inputSelectBot';
import InputText from 'src/app/utilities/inputs/inputText';
import ButtonReset from 'src/app/utilities/buttons/reset';
import ButtonConfirm from 'src/app/utilities/buttons/confirm';

const index = ({
  listBots,
  handleChangeBot,
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
            label="Client ID"
            name="rdStationClienteId"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.rdStationClienteId}
            helperText={errors?.rdStationClienteId?.message}
          />
        </div>

        <div>
          <InputText
            label="Client Secret"
            name="rdStationClientSecret"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.rdStationClientSecret}
            helperText={errors?.rdStationClientSecret?.message}
          />
        </div>
      </div>

      <div className="grid grid-col">
        <div>
          <InputText
            label="Refresh Token"
            name="rdStationRefreshToken"
            disabled={false}
            iconInput="settings"
            control={control}
            error={!!errors.rdStationRefreshToken}
            helperText={errors?.rdStationRefreshToken?.message}
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
