import { Container, type Breakpoint, type SxProps, type Theme } from "@mui/material"
import type React from "react";
import type { ReactNode } from "react"

interface MyContainerParams {
  children?: ReactNode;
  sx?: SxProps<Theme> | undefined;
  maxWidth?: false | Breakpoint | undefined;
  className?: string;
}

const MyContainer: React.FC<MyContainerParams> = ({className, children, sx, maxWidth}) => {
  
  return (
    <Container className={className} maxWidth={!maxWidth ? 'xs' : maxWidth} sx={sx}>
      {children}
    </Container>
  )
}

export default MyContainer