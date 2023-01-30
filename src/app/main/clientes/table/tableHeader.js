import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';

const rows = [
  {
    id: 'codigo',
    align: 'center',
    disablePadding: false,
    label: '#',
    sort: false,
  },
  {
    id: 'nome',
    align: 'left',
    disablePadding: false,
    label: 'Nome',
    sort: false,
  },
  {
    id: 'telefone',
    align: 'left',
    disablePadding: false,
    label: 'Telefone',
    sort: false,
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
    sort: false,
  },
  {
    id: 'dtcadastro',
    align: 'left',
    disablePadding: false,
    label: 'Data Cadastro',
    sort: false,
  },
  {
    id: 'ativo',
    align: 'left',
    disablePadding: false,
    label: 'Ativo?',
    sort: false,
  },
  {
    id: 'opcoes',
    align: 'center',
    disablePadding: false,
    label: 'Opções',
    sort: false,
  },
];

function TableHeader(props) {
  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16 font-bold"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              // sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.label}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
