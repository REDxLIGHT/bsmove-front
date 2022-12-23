import React from 'react';
import MUIAvatar from '@material-ui/core/Avatar';
import styles from './index.module.css';

const Avatar = ({ customStyles, alt = '', src = '', children }) => (
  <MUIAvatar className={customStyles || styles.avatar_container} alt={alt} src={src}>
    {children}
  </MUIAvatar>
);

export default Avatar;