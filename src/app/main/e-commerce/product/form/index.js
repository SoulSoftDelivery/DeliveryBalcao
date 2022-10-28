import React from 'react';
import InputText from '../../../../utilities/inputs/inputText';
import InputSelectSexo from '../../../../utilities/inputs/inputSelectSexo';

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
            name="nome"
            disabled={false}
            iconInput="person"
            control={control}
            error={!!errors.nome}
            helperText={errors?.nome?.message}
          />
        </div>

        <div>
          <InputText
            label="Número Telefone"
            name="telefone"
            disabled={false}
            iconInput="call"
            control={control}
            error={!!errors.telefone}
            helperText={errors?.telefone?.message}
          />
        </div>

        <div>
          <InputText
            label="Email"
            name="email"
            disabled={false}
            iconInput="mail"
            control={control}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        </div>

        <div>
          <InputText
            label="Bairro"
            name="bairro"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.bairro}
            helperText={errors?.bairro?.message}
          />
        </div>

        <div>
          <InputText
            label="Rua"
            name="rua"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.rua}
            helperText={errors?.rua?.message}
          />
        </div>

        <div>
          <InputText
            label="Quadra"
            name="quadra"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.quadra}
            helperText={errors?.quadra?.message}
          />
        </div>

        <div>
          <InputText
            label="Lote"
            name="lote"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.lote}
            helperText={errors?.lote?.message}
          />
        </div>

        <div>
          <InputText
            label="Número"
            name="numero"
            disabled={false}
            iconInput="location_on"
            control={control}
            error={!!errors.numero}
            helperText={errors?.numero?.message}
          />
        </div>
      </div>
    </>
  );
};

export default index;
