import React from 'react';
import ButtonConfirmDefault from '../buttonConfirmDefault';

function Confirm({ label, disabled, loading }) {
  return (
    <ButtonConfirmDefault
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      className="mt-16 mx-8"
      aria-label={label.toUpperCase()}
      disabled={disabled}
      loading={loading}
      value="legacy"
    >
      {label}
    </ButtonConfirmDefault>
  );
}

export default Confirm;
