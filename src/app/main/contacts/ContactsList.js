import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ContactListItem from './ContactListItem';

function ContactsList({
  listContatos,
  page,
  setPage,
  totalPages,
  totalRows,
}) {
  if (!listContatos) {
    return null;
  }

  if (listContatos.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          Nenhum contato encontrado
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-col flex-auto w-full max-h-full"
    >
      <div className="relative">
        <List className="w-full m-0 p-0">
          {listContatos.map((item) => (
            <ContactListItem key={item.rowKey} contact={item} />
          ))}
        </List>
      </div>
      {/* Paginação */}
      <div className="w-full flex justify-between mt-10">
        <div>
          Total de registros: {totalRows}
        </div>
        <div>
          <span className="mr-5">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="text"
            size="small"
            disabled={page > 1 ? false : true}
            onClick={() => setPage(page - 1)}
          >
            {"<"}
          </Button>
          <Button
            variant="text"
            size="small"
            disabled={page != totalPages ? false : true}
            onClick={() => setPage(page + 1)}
          >
            {">"}
          </Button>
        </div>
      </div>
      <br />
    </motion.div>
  );
}

export default ContactsList;
