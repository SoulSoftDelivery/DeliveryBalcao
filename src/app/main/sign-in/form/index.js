import React from 'react';
import { Link } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import InputText from '../../../utilities/inputs/inputText';
import InputPassword from '../../../utilities/inputs/inputPassword';
import InputCheckbox from '../../../utilities/inputs/inputCheckbox';

const index = ({
  loadingLogin,
  dirtyFields,
  isValid,
  control,
  errors,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <form
      name="loginForm"
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

      <InputPassword
        label="Senha"
        name="senha"
        control={control}
        error={!!errors.senha}
        helperText={errors?.senha?.message}
      />

      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
        <InputCheckbox
          label="Lembrar login"
          name="lembrarLogin"
          control={control}
        />

        <Link className="font-normal" to="/forgot-password">
          Esqueceu a Senha?
        </Link>
      </div>

      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        loading={loadingLogin}
        className="w-full mt-16"
        aria-label="Entrar"
        disabled={_.isEmpty(dirtyFields) || !isValid}
        value="legacy"
      >
        Entrar
      </LoadingButton>
    </form>
  );
};

export default index;
