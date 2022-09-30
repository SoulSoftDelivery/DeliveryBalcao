import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { selectUser } from 'app/store/userSlice';
import axios from 'axios';
import ContactsSidebarContent from './ContactsSidebarContent';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
  },
}));

function Contacts(props) {
  const [listContatos, setListContatos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [showContactsAppDetails, setShowContactsAppDetails] = useState(false);
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false);
  const [contatoWhatsappState, setContatoWhatsappState] = useState('');
  const [loadingConfirmar, setLoadingConfirmar] = useState(false);
  const [alert, setAlert] = useState({
    'type': 'error',
    'message': '',
  });
  const [buttonLoading, setButtonLoading] = useState({
    'button': '',
    'contatoWhatsapp': '',
    'loading': false,
  });

  const pageLayout = useRef(null);
  const routeParams = useParams();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const user = useSelector(selectUser);

  // Função consulta lista de contatos
  const getContatos = async () => {
    const data = {
      params: {
        'partitionKey': user.partitionKey,
        'Page': page,
        'PageSize': 10,
        'searchText': searchText.trim(),
      },
    };

    axios
      .get('RegistrarContato/ListarContatos', data)
      .then((response) => {
        setListContatos(response.data.lista);
        setTotalPages(response.data.totalPages);
        setTotalRows(response.data.totalRows);
      })
      .catch((error) => {
        setListContatos([]);
        console.log(error);
      });
  };

  // Lista os Contatos no carregamento da página
  useEffect(() => {
    getContatos();
  }, []);

  // Lista os Contatos após digitar texto no filtro ou alteração na paginação
  useEffect(() => {
    getContatos();
  }, [searchText, page]);

  useEffect(() => {
    setRightSidebarOpen(Boolean(routeParams.id));
    getContatos();
  }, [routeParams]);

  return (
    <Root
      header={
        <ContactsHeader
          pageLayout={pageLayout}
          searchText={searchText}
          setSearchText={setSearchText}
          numContatos={totalRows}
        />
      }
      content={
        <ContactsList
          listContatos={listContatos}
          // handleExcluir={openConfirmExcluir}
          // handleEditar={openContactsAppDetails}
          buttonLoading={buttonLoading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalRows={totalRows}
        />
      }
      ref={pageLayout}
      rightSidebarContent={<ContactsSidebarContent />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={640}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Contacts;
