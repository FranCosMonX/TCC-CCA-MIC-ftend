import { Container } from "@mui/material";
import type { ReactNode } from "react";

interface MyBodyParams {
  children?: ReactNode;
}

const MyBody: React.FC<MyBodyParams> = ({ children }) => {
  return (
    <Container disableGutters maxWidth={'xl'} sx={{
      minWidth: '100vw', 
      height: '100vh', 
      backgroundColor: 'white', 
      color: 'black',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {children}
    </Container>
  )
}

export default MyBody;