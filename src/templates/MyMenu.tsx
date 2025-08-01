import { MenuList } from "@mui/material";
import type { ReactNode } from "react"
import React from "react";

interface MenuParams {
  children: ReactNode;
}

const MyMenu: React.FC<MenuParams> = ({ children }) => {
  
  return (
    <MenuList sx={{
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: '16px',
      paddingRight: '16px'
    }}>
      {children}
    </MenuList>
  )
}

export default MyMenu