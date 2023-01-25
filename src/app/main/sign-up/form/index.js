import React from 'react';
import ButtonReset from 'src/app/utilities/buttons/reset';
import ButtonConfirm from 'src/app/utilities/buttons/confirm';
import InputText from '../../../utilities/inputs/inputText';
import InputPasswordToggleView from '../../../utilities/inputs/inputPasswordToggleView';

const index = ({
  showSenha,
  setShowSenha,
  showConfirmarSenha,
  setShowConfirmarSenha,
  loadingCreate,
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
      name="createForm"
      noValidate
      className="flex flex-col justify-center w-full mt-32"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="mb-8">
        <b>Dados do Estabelecimento</b>
      </span>

      <div className="grid grid-col md:grid-cols-2 md:gap-2">
        <div>
          <InputText
            label="Nome*"
            name="nomeEmpresa"
            disabled={false}
            iconInput="storefront"
            control={control}
            error={!!errors.nomeEmpresa}
            helperText={errors?.nomeEmpresa?.message}
          />
        </div>

        <div>
          <InputText
            label="CNPJ"
            name="cnpjEmpresa"
            disabled={false}
            iconInput="tag"
            control={control}
            error={!!errors.cnpjEmpresa}
            helperText={errors?.cnpjEmpresa?.message}
          />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-3 md:gap-3">
        <div>
          <InputText
            label="Telefone 1*"
            name="telefone1Empresa"
            disabled={false}
            iconInput="call"
            control={control}
            error={!!errors.telefone1Empresa}
            helperText={errors?.telefone1Empresa?.message}
          />
        </div>

        <div>
          <InputText
            label="Telefone 2"
            name="telefone2Empresa"
            disabled={false}
            iconInput="call"
            control={control}
            error={!!errors.telefone2Empresa}
            helperText={errors?.telefone2Empresa?.message}
          />
        </div>

        <div>
          <InputText
            label="Email"
            name="emailEmpresa"
            disabled={false}
            iconInput="mail"
            control={control}
            error={!!errors.emailEmpresa}
            helperText={errors?.emailEmpresa?.message}
          />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-3 md:gap-3">
        <div>
          <InputText
            label="CEP"
            name="cepEmpresa"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.cepEmpresa}
            helperText={errors?.cepEmpresa?.message}
          />
        </div>

        <div>
          <InputText
            label="Cidade"
            name="cidadeEmpresa"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.cidadeEmpresa}
            helperText={errors?.cidadeEmpresa?.message}
          />
        </div>

        <div>
          <InputText
            label="UF"
            name="ufEmpresa"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.ufEmpresa}
            helperText={errors?.ufEmpresa?.message}
          />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-2 md:gap-2">
        <div>
          <InputText
            label="Bairro"
            name="bairroEmpresa"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.bairroEmpresa}
            helperText={errors?.bairroEmpresa?.message}
          />
        </div>

        <div>
          <InputText
            label="Rua"
            name="ruaEmpresa"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.ruaEmpresa}
            helperText={errors?.ruaEmpresa?.message}
          />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-3 md:gap-3">
        <div>
          <InputText
            label="Quadra"
            name="quadraEmpresa"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.quadraEmpresa}
            helperText={errors?.quadraEmpresa?.message}
          />
        </div>

        <div>
          <InputText
            label="Lote"
            name="loteEmpresa"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.loteEmpresa}
            helperText={errors?.loteEmpresa?.message}
          />
        </div>

        <div>
          <InputText
            label="Número"
            name="numeroEmpresa"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.numeroEmpresa}
            helperText={errors?.numeroEmpresa?.message}
          />
        </div>
      </div>

      <InputText
        label="Complemento"
        name="complementoEmpresa"
        disabled={false}
        iconInput="location_on"
        control={control}
        error={!!errors.complementoEmpresa}
        helperText={errors?.complementoEmpresa?.message}
      />

      <span className="mb-8">
        <b>Dados do Usuário</b>
      </span>

      <div className="grid grid-col md:grid-cols-3 md:gap-3">
        <div>
          <InputText
            label="Nome*"
            name="nomeUsuario"
            disabled={false}
            iconInput="person"
            control={control}
            error={!!errors.nomeUsuario}
            helperText={errors?.nomeUsuario?.message}
          />
        </div>

        <div>
          <InputText
            label="Telefone"
            name="telefoneUsuario"
            disabled={false}
            iconInput="call"
            control={control}
            error={!!errors.telefoneUsuario}
            helperText={errors?.telefoneUsuario?.message}
          />
        </div>

        <div>
          <InputText
            label="Email*"
            name="emailUsuario"
            disabled={false}
            iconInput="mail"
            control={control}
            error={!!errors.emailUsuario}
            helperText={errors?.emailUsuario?.message}
          />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-2 md:gap-2">
        <div>
          <InputPasswordToggleView
            label="Senha*"
            name="senhaUsuario"
            showSenha={showSenha}
            setShowSenha={setShowSenha}
            control={control}
            error={!!errors.senhaUsuario}
            helperText={errors?.senhaUsuario?.message}
          />
        </div>

        <div>
          <InputPasswordToggleView
            label="Confirmar senha*"
            name="confirmarSenhaUsuario"
            showSenha={showConfirmarSenha}
            setShowSenha={setShowConfirmarSenha}
            control={control}
            error={!!errors.confirmarSenhaUsuario}
            helperText={errors?.confirmarSenhaUsuario?.message}
          />
        </div>
      </div>

      <div className="text-center">
        <ButtonReset label="Limpar" resetForm={resetForm} />
        <ButtonConfirm
          label="Confirmar"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          loading={loadingCreate}
        />
      </div>
    </form>
  );
};

export default index;
