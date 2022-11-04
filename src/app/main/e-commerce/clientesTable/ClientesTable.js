import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import FuseLoading from '@fuse/core/FuseLoading';
import ClientesTableHead from './ClientesTableHead';
import ClientesRowTable from './ClientesRowTable';

function 
ClientesTable({
  clienteList,
  buttonLoading,
  handleExcluir,
  handleEditar,
  page,
  totalRows,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  if (clienteList.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          Nenhum cliente encontrado
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ClientesTableHead
          // selectedProductIds={selected}
          // order={order}
          // onSelectAllClick={handleSelectAllClick}
          // onRequestSort={handleRequestSort}
          // rowCount={data.length}
          // onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {clienteList.map((cliente) => {
              return (
                <ClientesRowTable
                  key={cliente.id}
                  cliente={cliente}
                  handleExcluir={handleExcluir}
                  handleEditar={handleEditar}
                  buttonLoading={buttonLoading}
                />
              );
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ClientesTable;
