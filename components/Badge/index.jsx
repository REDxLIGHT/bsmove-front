import React from 'react';
import MUIBadge from '@mui/material/Badge'

export default function Badge({ extrastyle = {}, count = 0, children, variant = "primary" }) {
  return (
    <>
      <MUIBadge
        badgeContent={count.toString()}
        color={variant}
        sx={{
          "& .MuiBadge-badge": {
            color: "white",
              backgroundColor: variant === "primary" ? 'primary' : extrastyle?.backgroundColor
          }
        }}
      >
        {children}
      </MUIBadge>
    </>
  )
}