import React from 'react';
import InputText from '../../../utilities/inputs/inputText';
import ButtonReset from '../../../utilities/buttons/reset';
import ButtonConfirm from '../../../utilities/buttons/confirm';

const index = ({
  loadingConfirmar,
  dirtyFields,
  isValid,
  control,
  errors,
  handleSubmit,
  onSubmit,
  resetForm,
}) => {
  return (
    <form
      name="forgotPasswordForm"
      noValidate
      className="flex flex-col justify-center w-full mt-32"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputText
        label="Email"
        name="email"
        disabled={false}
        iconInput="user"
        control={control}
        error={!!errors.email}
        helperText={errors?.email?.message}
      />

      <div className="text-center">
        <ButtonReset label="Limpar" resetForm={resetForm} />

        <ButtonConfirm
          label="Recuperar"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          loading={loadingConfirmar}
        />
      </div>
    </form>
  );
};

export default index;
