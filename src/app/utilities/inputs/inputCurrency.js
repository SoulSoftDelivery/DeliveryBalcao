import React, { useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <CurrencyFormat
      {...other}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      prefix="R$"
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function InputCurrency({ label, name, disabled, control, error, helperText, iconInput, setValue, valor }) {
  const [values, setValues] = React.useState({
    numberformat: '',
  });

  useEffect(() => {
    console.log(valor);

    setValues({
      ...values,
      'valor': 10000,
    });

    console.log(values);
  }, [valor]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

    setValue('valor', event.target.value, { shouldValidate: true });
  };

  return (
    <TextField
      name={name}
      disabled={disabled}
      label={label}
      onChange={handleChange}
      className="mb-16 w-full"
      error={error}
      helperText={helperText}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      variant="outlined"
    />
  );
}

export default InputCurrency;
