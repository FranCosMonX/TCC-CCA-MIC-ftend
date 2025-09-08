import { Box, Button, List, ListItem, TextareaAutosize } from "@mui/material";
import MyContainer from "../MyContainer";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import React, { type ChangeEvent } from "react"
import MsgChatSistema from "./chat/MsgChatSistema";
import MsgChatUsuario from "./chat/MsjChatUsuario";
import api from "../../api/api";

interface InterfaceRegistroDeMensagem{
  entidade: 'usuario' | 'sistema';
  mensagem: string;
  index: number;
}

const Pagina_de_chat = () => {
  const [contador, setContador] = React.useState(5)
  const [inputMensagem, setInputMensagem] = React.useState("")
  const [mensagens, setMensagens] = React.useState<Array<InterfaceRegistroDeMensagem>>([
    {entidade: 'usuario', mensagem: 'gostaria de um exemplo de hello world', index: 0},
    {entidade: 'sistema', mensagem: `javascript
        int setup(){
              PINMODE();
        }
    
        int loop() {
        }`, index: 1},
        {entidade: 'usuario', mensagem: 'gostaria de um exemplo de hello world', index: 2},
        {entidade: 'usuario', mensagem: 'gostaria de um exemplo de hello world', index: 3},
        {entidade: 'usuario', mensagem: 'gostaria de um exemplo de hello world', index: 4},
        {entidade: 'usuario', mensagem: 'gostaria de um exemplo de hello world', index: 5},
  ])

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputMensagem)
    if(inputMensagem.length > 0){
      await api.post('/chat', {'mensagem': inputMensagem})
        .then((e) => {
          setContador(contador+1);
          console.log(e)
          setMensagens([
            ...mensagens,
            {
              entidade: 'sistema',
              mensagem: e.data.mensagem,
              index: contador
            }
          ])
        })
    }
  }

  return (
    <React.Fragment>
      <MyContainer 
      maxWidth={'md'}
      sx={{
        maxHeight: '100%',
        paddingBottom: '24px',
        paddingLeft: '0px',
        position: 'relative',
        border: '.5px solid black',
        borderRadius: '16px 2px 2px 16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        '::-webkit-scrollbar': {
          backgroundColor: '#969696ff',
          width: '8px',
          height: '90%'
        }, '::-webkit-scrollbar-thumb': {
          backgroundColor: '#dadadaff',
          width: '5px',
        }
      }}>
        {mensagens.map((mensagem) => {
          const retorno = mensagem.entidade === 'sistema' ?
            <MsgChatSistema key={mensagem.index} text={mensagem.mensagem} /> :
            <MsgChatUsuario key={mensagem.index} text={mensagem.mensagem} />
          
            return retorno;
        })}
      </MyContainer>
      <Box
        component={'form'}
        onSubmit={handleSubmit}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={"center"}
        gap={'16px'}
        alignItems={"center"}
        height={'max-content'}
        sx={{padding: '24px'}}
      >
        <TextareaAutosize id="mensagem" value={inputMensagem} maxRows={3} minRows={3} 
        onChange={(e) => setInputMensagem(e.target.value)}
        style={{
          width: 600,
          maxWidth: 600,
          maxHeight: 50,
          minHeight: 50,
          fontSize: '20px',
          backgroundColor: "#e9e9e9",
          color: 'black',
          borderColor: '#cfccccff',
          }}
        />
        <Box display={"flex"} justifyContent={"center"} height={'100%'}  gap={'16px'}>
          <Button type="submit" variant="outlined"><SendIcon /></Button>
          <Button variant="outlined"><MicIcon /></Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Pagina_de_chat;