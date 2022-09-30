import React from 'react';
import InputText from '../../../utilities/inputs/inputText';
import InputSelectSexo from '../../../utilities/inputs/inputSelectSexo';

const index = ({
  control,
  errors,
  getValues,
}) => {
  return (
    <>
      <div className="grid grid-col">
        <div>
          <InputText
            label="Nome"
            name="contatoNome"
            disabled={false}
            iconInput="person"
            control={control}
            error={!!errors.contatoNome}
            helperText={errors?.contatoNome?.message}
          />
        </div>

        <div>
          <InputText
            label="Número WhatsApp"
            name="contatoWhatsappNum"
            disabled={getValues('rowKey') ? true : false}
            iconInput="call"
            control={control}
            error={!!errors.contatoWhatsappNum}
            helperText={errors?.contatoWhatsappNum?.message}
          />
        </div>

        <div>
          <InputText
            label="Email"
            name="contatoEmail"
            disabled={false}
            iconInput="mail"
            control={control}
            error={!!errors.contatoEmail}
            helperText={errors?.contatoEmail?.message}
          />
        </div>

        <div>
          <InputText
            label="CPF/CNPJ"
            name="contatoCpfCnpj"
            disabled={false}
            iconInput="person"
            control={control}
            error={!!errors.contatoCpfCnpj}
            helperText={errors?.contatoCpfCnpj?.message}
          />
        </div>

        <div>
          <InputText
            label="Endereço"
            name="contatoEndereco"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.contatoEndereco}
            helperText={errors?.contatoEndereco?.message}
          />
        </div>

        {/* Input select */}
        <InputSelectSexo
          label="Sexo"
          name="contatoSexo"
          control={control}
          // error={!!errors.bot}
          // helperText={errors?.bot?.message}
        />
      </div>
    </>
  );
};

export default index;
