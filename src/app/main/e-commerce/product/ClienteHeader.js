import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function ClienteHeader({
  loadingLogin,
  getValues,
  dirtyFields,
  isValid,
}) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const theme = useTheme();
  const navigate = useNavigate();

  function handleRemoveProduct() {
    // dispatch(removeProduct()).then(() => {
    //   navigate('/apps/e-commerce/products');
    // });
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/clientes"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Clientes</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            <img
              className="w-32 sm:w-48 rounded"
              src="assets/images/avatars/profile.jpg"
              alt="profile"
            />
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {getValues('nome') || 'Novo Cliente'}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Detalhes
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={handleRemoveProduct}
          startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
        >
          Deletar
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={loadingLogin}
          className="w-full mt-16"
          aria-label="Entrar"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          Salvar
        </LoadingButton>
      </motion.div>
    </div>
  );
}

export default ClienteHeader;
