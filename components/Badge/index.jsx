import React from 'react';
import MUIBadge from '@material-ui/core/Badge'
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  root: {
    opacity: 1,
  },
  badge: props => ({
    color: theme.colors.white,
    backgroundColor: props?.badgeBackgroundColor || theme.colors.mainGreen,
    opacity: 1,
    margin: '0 0 0.5em 1em',
  }),
}));


export default function Badge({ extrastyle = {}, count = 0, children, anchorOrigin = { vertical: 'top', horizontal: 'right' } }) {
  const classes = useStyle(extrastyle);
  return (
    <>
      <MUIBadge
        classes={classes}
        badgeContent={count.toString()}
        anchorOrigin={anchorOrigin}
      >
        {children}
      </MUIBadge>
    </>
  )
}