import InputText from '../../../../utilities/inputs/inputText';
import InputPhone from '../../../../utilities/inputs/inputPhone';
import InputSelectSexo from '../../../../utilities/inputs/inputSelectSexo';
import InputCheckbox from '../../../../utilities/inputs/inputCheckbox';

const index = ({
  control,
  errors,
  checked,
  setChecked,
}) => {
  return (
    <>
      <div className="h-full">
        <div className="grid grid-col md:grid-cols-2 md:gap-2">
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
            <InputPhone
              label="Número Telefone"
              name="telefone"
              disabled={false}
              control={control}
              iconInput="call"
              error={!!errors.telefone}
              helperText={errors?.telefone?.message}
            />
          </div>
        </div>

        <div className="grid grid-col md:grid-cols-2 md:gap-2">
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
            <InputSelectSexo
              label="Sexo"
              name="sexo"
              control={control}
              // error={!!errors.bot}
              // helperText={errors?.bot?.message}
            />
          </div>
        </div>

        <div className="grid grid-col md:grid-cols-2 md:gap-2">
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
        </div>

        <div className="grid grid-col md:grid-cols-3 md:gap-3">
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
        <div className="grid grid-col">
          <div>
            <InputText
              label="Complemento"
              name="complemento"
              disabled={false}
              iconInput="location_on"
              control={control}
              error={!!errors.complemento}
              helperText={errors?.complemento?.message}
            />
          </div>
        </div>
        <div className="grid grid-col">
          <div>
            <InputCheckbox
              label="Cadastro Ativo?"
              name="ativo"
              control={control}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
