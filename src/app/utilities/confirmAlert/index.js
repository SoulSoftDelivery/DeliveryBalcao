import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  open,
  setOpen,
  message,
  returnFunction,
}) {

  const confirmAlert = () => {
    returnFunction();
    setOpen(false);
  };

  const cancelAlert = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{message}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Após a confirmação as alterações realizadas não poderão ser desfeitas. <br />
            {/* <b>A solicitação pode demorar alguns minutos.</b> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => cancelAlert()}>Cancelar</Button>
          <Button onClick={() => confirmAlert()}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
