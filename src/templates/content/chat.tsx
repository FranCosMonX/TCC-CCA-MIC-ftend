import { Box, Button, TextareaAutosize } from "@mui/material";
import MyContainer from "../MyContainer"
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import React from "react"

const Pagina_de_chat = () => {
  return (
    <React.Fragment>
      <MyContainer sx={{
        height: '100%',
        paddingBottom: '24px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '.5px solid black',
        borderRadius: '16px'
      }}>
        <div>
          Deve ficar o chat e a parte inicial da aplicação
        </div>
      </MyContainer>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{padding: '24px'}}
      >
        <TextareaAutosize maxRows={3} minRows={3} style={{
          width: 600,
          maxWidth: 600,
          maxHeight: 50,
          minHeight: 50,
          backgroundColor: "#e9e9e9",
          color: 'black',
          borderColor: '#cfccccff'
          }}
        />
        <Box>
          <Button><SendIcon /></Button>
          <Button><MicIcon /></Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Pagina_de_chat;