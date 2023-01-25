import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import TableHead from './tableHead';
import RowTable from './rowTable';

function TableContent({
  mesasLista,
  buttonLoading,
  handleExcluir,
  handleEditar,
  page,
  totalRows,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  if (mesasLista.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          Nenhum registro encontrado
        </Typography>
      </div>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead />
          <TableBody>
            {mesasLista.map((mesa) => {
              return (
                <RowTable
                  key={mesa.id}
                  mesa={mesa}
                  handleExcluir={handleExcluir}
                  handleEditar={handleEditar}
                  buttonLoading={buttonLoading}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableContent;