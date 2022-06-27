import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { modalStyles } from './styles';
import CommonButton from '../CommonButton/CommonButton';


const BasicModal = ({open, onClose, title, subTitle, content, onSubmit, disableSubmit}) => {        
   
  return (     
    <Modal      
      open={open}
      onClose={onClose}
    >
      <Box sx={modalStyles.wrapper}>
        <Typography 
          id="modal-modal-title" 
          variant="h6" 
          component="h2"
        >
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {subTitle}
        </Typography>
        {content}
        <Box sx={modalStyles.buttons}>
          <CommonButton
            variant="contained"
            onClick={onSubmit}
            disabled={disableSubmit}
          >
            Submit
          </CommonButton>
          <CommonButton 
            onClick={onClose}            
          >Cancel</CommonButton>
        </Box>
      </Box>
    </Modal>
  )
}

export default BasicModal
