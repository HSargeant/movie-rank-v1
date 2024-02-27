import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid,Box,Typography } from '@mui/material';
import Modal from '@mui/material/Modal';

// import { styled } from '@emotion/styled';

// const StyledImage = styled(Image)(({ theme }) => ({
//   width: 200, // Adjust width as needed
//   height: 200, // Adjust height as needed
//   cursor: 'pointer', // Make the image clickable
// }));

function ImageModal({poster}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {lg: "30%", sm: 100},
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
  };
  return (
    // <div>
    //   <img onClick={handleOpen} src={poster} alt="movie poster" width={50} cursor='pointer' />
    //   <Dialog
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="image-modal-title"
    //     aria-describedby="image-modal-description"
    //     fullScreen
    //   >
    //     <DialogTitle id="image-modal-title">Image</DialogTitle>
    //     <DialogContent>
    //       <DialogContentText id="image-modal-description">
    //         <img src={poster} alt="Image description" style={{height: 300}} />
    //       </DialogContentText>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleClose}>Close</Button>
    //     </DialogActions>
    //   </Dialog>
    // </div>
    <div>
<img onClick={handleOpen} src={poster} alt="movie poster" width={50} cursor='pointer' />
    <Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box   sx={style} >
  {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
  <img  src={poster} alt="movie poster" width="100%" cursor='pointer' />

  {/* </Typography> */}
</Box>
</Modal>
</div>
  );
}

export default ImageModal;


