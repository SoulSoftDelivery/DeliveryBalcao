import React from 'react';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Input = styled('input')({
  display: 'none',
});

function InputFile({
  label,
  name,
  control,
  selectedPlanilha,
  setSelectedPlanilha,
  error,
  helperText,
}) {
  function handleUpload(event, field) {
    setSelectedPlanilha(event.target.files[0].name);
    return field.onChange(event.target.files);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex">
            <div>
              <label htmlFor="contained-button-file">
                {/* Input file */}
                <Input
                  id="contained-button-file"
                  type="file"
                  name={name}
                  multiple
                  {...field}
                  value={field.value.filename}
                  onChange={(event) => handleUpload(event, field)}
                />
                <Button
                  variant="contained"
                  component="span"
                  size="large"
                >
                  {label}
                </Button>

                {/* Retorno de erro yup */}
                <div className="mt-10">
                  <span className="text-[#f44336]" color="error">{helperText}</span>
                </div>
              </label>
            </div>
            <div>
              {/* Nome da planilha selecionada */}
              {selectedPlanilha && (
                <div className="mt-10 ml-10">
                  <span>{selectedPlanilha}</span>
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}

export default InputFile;
