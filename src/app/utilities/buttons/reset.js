import React from 'react';
import Button from '@mui/material/Button';

function Reset({ label, resetForm }) {
  return (
    <Button
      type="button"
      variant="text"
      size="large"
      className="mt-16 mx-8"
      aria-label={label.toUpperCase()}
      value="legacy"
      onClick={resetForm}
    >
      {label}
    </Button>
  );
}

export default Reset;
