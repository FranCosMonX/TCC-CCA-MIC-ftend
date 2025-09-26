import { Box, Button, TextareaAutosize } from "@mui/material";
import MyContainer from "../MyContainer";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import React from "react"
import MsgChatSistema from "./chat/MsgChatSistema";
import MsgChatUsuario from "./chat/MsjChatUsuario";
import api from "../../api/api";

interface InterfaceRegistroDeMensagem{
  entidade: 'usuario' | 'sistema';
  mensagem: string;
  index: number;
}

const Pagina_de_chat = () => {
  const [contador, setContador] = React.useState(0)
  const [inputMensagem, setInputMensagem] = React.useState("")
  const [mensagens, setMensagens] = React.useState<Array<InterfaceRegistroDeMensagem>>([])

  const addMsgNoHistorico = async (index: number, entidade: 'sistema' | 'usuario', mensagem: string) => {
    console.log(index)
    setMensagens((preventMsg) => [
      ...preventMsg,
      {
        entidade: entidade,
        mensagem: mensagem,
        index: index
      }
    ])
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(mensagens)
    
    let cont = contador
    setTimeout(() => {
      addMsgNoHistorico(cont , "usuario", inputMensagem);
    }, 100)
    
    if(inputMensagem.length > 0){
      await api.post('/chat', {'mensagem': inputMensagem})
        .then((e) => {
          setTimeout(() => {
            addMsgNoHistorico(cont + 1, "sistema", e.data.mensagem)
          }, 100)
        })
      }
    
    setContador((prev) => prev + 2);
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
          <Button type="submit" variant="outlined" onClick={() => setTimeout(() => {
            setInputMensagem('');
          }, 100)}><SendIcon /></Button>
          <Button variant="outlined"><MicIcon /></Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Pagina_de_chat;