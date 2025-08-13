import React from "react"
import MyContainer from "../MyContainer"
import { Box, Button, TextField, Typography } from "@mui/material"

interface ApresentacaoParams {
  irParaChat_funcion: () => void;
}

const Apresentacao: React.FC<ApresentacaoParams> = ({irParaChat_funcion}) => {
  return (
    <React.Fragment>
      <MyContainer
        sx={{
          height: '100%',
          paddingBottom: '24px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <Typography variant="h4" textAlign={"center"}>Como gostaria de ser chamado?</Typography>
        <TextField
          placeholder="Ex: Julho, Camila, Henry"
          type={'text'}
        />
        <Box
          display={'flex'}
          justifyContent={'center'}
        >
          <Button variant="contained" onClick={irParaChat_funcion}>Prosseguir</Button>
        </Box>
      </MyContainer>
    </React.Fragment>
  )
}

export default Apresentacao