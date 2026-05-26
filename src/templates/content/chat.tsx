import { Box, Button, LinearProgress, TextareaAutosize, Typography } from "@mui/material";
import MyContainer from "../MyContainer";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SendIcon from '@mui/icons-material/Send';
import AppsOutageIcon from '@mui/icons-material/AppsOutage';
import React, { useEffect } from "react"
import MsgChatSistema from "./chat/MsgChatSistema";
import MsgChatUsuario from "./chat/MsjChatUsuario";
import api from "../../api/api";
import AssemblyTranscricao from "./audio/Record";
import { blueGrey, grey } from "@mui/material/colors";
import MsgChatIA from "./chat/MsgChatIA";

interface ChatParams {
  openMensagemSistema: (msg:string) => void;
}

interface InterfaceRegistroDeMensagem{
  entidade: 'usuario' | 'sistema' | 'ia';
  mensagem: string;
  index: number;
}

const Pagina_de_chat: React.FC<ChatParams> = (/*{openMensagemSistema}*/) => {
  const [contador, setContador] = React.useState(0)
  const [inputMensagem, setInputMensagem] = React.useState("")
  const [mensagens, setMensagens] = React.useState<Array<InterfaceRegistroDeMensagem>>([])
  const [modoMic, setModoMic] = React.useState<boolean>(false)
  const [estagiosMic, setEstagiosMic] = React.useState<'inicial' | 'intermediario' | 'final'>('inicial')
  const [esperandoResposta, setEsperandoResposta] = React.useState(false)

  useEffect(() => {
    const verUltimaMensagem = document.querySelector(".chatArea");
    if (mensagens.length-1 >= 0 && verUltimaMensagem && mensagens[mensagens.length-1].entidade === "usuario") {
      verUltimaMensagem.scrollTop = verUltimaMensagem.scrollHeight;
    }
  }, [mensagens]);

  const addMsgNoHistorico = async (index: number, entidade: 'sistema' | 'usuario' | 'ia', mensagem: string) => {
    setMensagens((preventMsg) => [
      ...preventMsg,
      {
        entidade: entidade,
        mensagem: mensagem,
        index: index
      }
    ])
  }

  const handleSubmitMessage = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let cont = contador
    setEsperandoResposta(true)
    setTimeout(() => {
      addMsgNoHistorico(cont + 1, "usuario", inputMensagem);
    }, 100)
    
    if(inputMensagem.length > 0){
      await api.post('/chat', {'mensagem': inputMensagem}, {timeout: 60000})
        .then((e) => {
          setTimeout(() => {
            addMsgNoHistorico(cont + 1, "ia", e.data.mensagem)
            setEstagiosMic('inicial')
          }, 100)
        })
        .finally(() => setEsperandoResposta(false))
        
        setInputMensagem("")
      }
    
    setContador((prev) => prev + 2);
  }

  const handleGerarCódigo = async () => {
    let cont = contador
    setEsperandoResposta(true)
    await api.post('/gerar', null, {timeout:3*60000})
      .then((response) => {
        if (response.status == 200){
          const resposta : string = response.data.mensagem
          addMsgNoHistorico(cont + 1, "sistema", resposta.length > 0 ? resposta : "Arquivos gerados com sucesso.")
          setEstagiosMic('intermediario')
        }
      })
      .finally(() => setEsperandoResposta(false))
    
    setContador((prev) => prev + 1);
  }

  const handleCompilarProjeto = async () => {
    let cont = contador
    setEsperandoResposta(true)
    await api.post('/compilar', null, {timeout:5*60000})
      .then((response) => {
        if(response.status = 200){
          const resposta: string = response.data.mensagem
          addMsgNoHistorico(cont + 1, "sistema", resposta.length > 0 ? resposta : "Projeto compilado com sucesso")
          setEstagiosMic('final')
        }
      })
      .finally(() => setEsperandoResposta(false))

    setContador((prev) => prev + 1);
  }

  const handleGravarCodigo = async () => {
    let cont = contador
    setEsperandoResposta(true)
    await api.post('/gravar', null, {timeout:5*60000})
      .then((response) => {
        if(response.status = 200){
          const resposta: string = response.data.mensagem
          addMsgNoHistorico(cont + 1, "sistema", resposta.length > 0 ? resposta : "Código gravado com sucesso.")
        }
      })
      .finally(() => setEsperandoResposta(false))

    setContador((prev) => prev + 1);
  }

  return (
    <Box height={'88%'} display={"flex"} flexDirection={"column"} justifyContent={"flex-end"} maxWidth={'100vw'}>
      <MyContainer
      className="chatArea"
      maxWidth={'md'}
      sx={{
        maxHeight: '100%',
        paddingBottom: '24px',
        paddingLeft: '0px',
        position: 'relative',
        border: 'none',
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
              mensagem.entidade === 'ia' ? <MsgChatIA key={mensagem.index} text={mensagem.mensagem} /> :
              <MsgChatUsuario key={mensagem.index} text={mensagem.mensagem} />
            return retorno;
        })}
      </MyContainer>
      <Box
        component={'form'}
        onSubmit={handleSubmitMessage}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={"center"}
        gap={'16px'}
        alignItems={"center"}
        height={'max-content'}
        sx={{padding: '24px'}}
      >
        {
          esperandoResposta &&
          <Box display={'flex'} flexDirection={'column'} gap={'7px'} justifyContent={'center'} alignItems={'center'} height={'58px'} width={'100%'}>
            <LinearProgress sx={{
              minWidth: '300px',
              width: '80px'
            }}/>
            <Typography>Esperando Resposta</Typography>
          </Box>
        }
        {
          !esperandoResposta && !modoMic && 
          <React.Fragment>
            <TextareaAutosize id="mensagem" value={inputMensagem} maxRows={3} minRows={3} 
              onChange={(e) => setInputMensagem(e.target.value)}
              style={{
                width: 600,
                maxWidth: 600,
                maxHeight: 50,
                minHeight: 50,
                fontSize: '20px',
                backgroundColor: grey[100],
                color: 'black',
                borderColor: '#cfccccff',
              }}
            />
            <Box display={"flex"} justifyContent={"center"} height={'100%'}  gap={'16px'}>
              <Button type="submit" variant="outlined" title="Enviar Mensagem" onClick={() => setTimeout(() => {
                setInputMensagem('');
              }, 100)}><SendIcon /></Button>
              <AssemblyTranscricao obterTextoTranscrito={(textoTranscrito) => setInputMensagem(textoTranscrito)}/>
              <Button variant="contained" title="Gerar, compilar e gravar código" onClick={() => setModoMic(true)}><AppsOutageIcon fontSize="large"/></Button>
            </Box>
          </React.Fragment>
        }
        {
          !esperandoResposta && modoMic && 
          <Box display={"flex"} justifyContent={"space-around"} height={'58px'}  gap={'16px'} width={'100%'}>
            <Button variant="outlined" title="Gerar código do proojeto" onClick={() => handleGerarCódigo()}>Gerar código</Button>
            <Button disabled={estagiosMic === 'inicial'} variant="outlined" title="Compilar projeto" onClick={() => handleCompilarProjeto()}>Compilar Projeto</Button>
            <Button disabled={estagiosMic === 'inicial' || estagiosMic === 'intermediario'} variant="outlined" title="Gravar projeto no microcontrolador" onClick={() => handleGravarCodigo()}>Gravar Código</Button>
            <Button variant="contained" title="Retornar para Chat" sx={{backgroundColor: blueGrey[500]}} onClick={() => setModoMic(false)}><KeyboardReturnIcon fontSize="large"/></Button>
          </Box>
        }
      </Box>
    </Box>
  )
}

export default Pagina_de_chat;