import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function Home(props) {
  return (
    <>
      <div className="h-full flex justify-center items-center">
        <div>
          <img className="h-64" src="assets/images/logo/logo2-sem-fundo.png" alt="logo" />
        </div>
      </div>

    </>
  );
}

export default Home;
