import React from 'react';
import { ClickAwayListener, Fade, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';

import styles from './index.module.css';
import { ChevronRight } from '@material-ui/icons';

const Menu = ({
  open, handleOpen, anchorRef, containerStyle,
  children, growExtraStyle = {},
}) => {

  const handleClose = (event) => {
    if (!open) return ;
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    handleOpen(false);
  };

  return (
    <Fade in={open} timeout={300}>
      <div className={containerStyle}>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition onClick={handleClose}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={growExtraStyle}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    {children}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Fade>
  )
};

export default Menu;
