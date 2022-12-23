import React from 'react';
import { Dialog, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import styles from './index.module.css';
import messages from './messages';
import Button from '../Button';
import { Subtitle } from '../Texts';

const DeleteDialog = ({
  open, onClose, fullWidth = true, title = 'Suppression', item = '[item non defini]', handleConfirm, handleDeny,
}) => {
  return (
    <Dialog fullWidth={fullWidth} open={open} onClose={onClose}>
      <div className={styles.delete_dialog_container}>
        <div className={styles.delete_dialog_header}>
          <Subtitle>{title}</Subtitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.delete_dialog_content}>
          <span>{messages.dialog.contentFirstPart}</span>
          <span>{item}</span>
          <span>{messages.dialog.contentSecondPart}</span>
        </div>
        <div className={styles.delete_dialog_actions}>
          <Button onClick={handleConfirm}>{messages.dialog.action.confirm}</Button>
          <Button onClick={handleDeny}>{messages.dialog.action.deny}</Button>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteDialog;
