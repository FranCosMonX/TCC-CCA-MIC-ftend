import { Container, type SxProps, type Theme } from "@mui/material"
import type React from "react";
import type { ReactNode } from "react"

interface MyContainerParams {
  children?: ReactNode;
  sx?: SxProps<Theme> | undefined;
}

const MyContainer: React.FC<MyContainerParams> = ({children, sx}) => {
  return (
    <Container maxWidth={'xs'} sx={sx}>
      {children}
    </Container>
  )
}

export default MyContainer