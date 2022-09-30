import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function GeneralAlert({ type, message, setAlert }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);

      setAlert({
        'type': 'error',
        'message': '',
      });
    }, 10000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Stack sx={{ width: '100%' }} spacing={2} className="mb-16">
      <Alert severity={type}>{message}</Alert>
    </Stack>
  );
}

export default GeneralAlert;
