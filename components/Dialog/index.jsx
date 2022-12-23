import React from 'react';
import { bool, func, node, string } from 'prop-types';
import MUIDialog from '@material-ui/core/Dialog';

const Dialog = ({ open, title, handleClose, children }) => {
  return (
    <div>
      <MUIDialog
        open={open}
        handleClose={handleClose}
      >
        {children}
      </MUIDialog>
    </div>
  )
};

Dialog.propTypes = {
  open: bool.isRequired,
  title: string.isRequired,
  handleClose: func.isRequired,
  children: node.isRequired,
};

export default Dialog;

