import InputNumber from '../../../../utilities/inputs/inputNumber';
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
        <div className="grid grid-col md:grid-cols-3 md:gap-3">
          <div>
            <InputNumber
              label="Numero"
              name="numero"
              disabled={false}
              control={control}
              error={!!errors.numero}
              helperText={errors?.numero?.message}
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
