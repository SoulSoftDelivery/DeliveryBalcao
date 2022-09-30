import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

function ContainerAddKey({ listUrl, addUrl, removeUrl }) {
  const [url, setUrl] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleAddUrl = () => {
    if (url !== '') {
      addUrl(url);
      setUrl('');
    }
  };

  const handleRemoveUrl = (indice) => {
    removeUrl(indice);
  };

  return (
    <>
      <div className="mb-16">
        <h4>Digite a URL e clique em Adicionar para incluir um novo registro.</h4>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-16">
        <div className="col-span-3">
          <TextField
            className="w-full"
            type="text"
            name="url"
            label="Nova URL"
            value={url}
            onChange={handleInputChange}
            InputProps={{
              type: 'text',
            }}
            variant="outlined"
          />
        </div>

        <div>
          <Button
            type="button"
            variant="contained"
            size="large"
            className="mt-6 mx-8"
            aria-label="ADICIONAR"
            value="legacy"
            onClick={handleAddUrl}
          >
            Adicionar
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUrl.length > 0 ? (
              <>
                {listUrl.map((item, indice) => (
                  <TableRow key={item.Key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {indice + 1}
                    </TableCell>
                    <TableCell>{item.Key}</TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveUrl(indice)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  Nenhum registro encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ContainerAddKey;
