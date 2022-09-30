import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { lightBlue } from '@mui/material/colors';

const buttonConfirmDefault = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.getContrastText(lightBlue[800]),
  backgroundColor: lightBlue[800],
  '&:hover': {
    backgroundColor: lightBlue[900],
  },
}));

export default buttonConfirmDefault;
