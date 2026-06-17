import { Box, Button, LinearProgress, TextareaAutosize, Typography } from "@mui/material";
import MyContainer from "../MyContainer";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SendIcon from '@mui/icons-material/Send';
import AppsOutageIcon from '@mui/icons-material/AppsOutage';
import React, { useEffect, useState } from "react"
import MsgChatSistema from "./chat/MsgChatSistema";
import MsgChatUsuario from "./chat/MsjChatUsuario";
import api from "../../api/api";
import AssemblyTranscricao from "./audio/Record";
import { blueGrey, grey } from "@mui/material/colors";
import MsgChatIA from "./chat/MsgChatIA";
import OpcaoBinariaSistema from "./OpcaoBinariaSistema";

interface ChatParams {
  openMensagemSistema: (msg:string, links?: string[]) => void;
  tem_dados_salvos: boolean;
}

interface InterfaceRegistroDeMensagem{
  entidade: 'usuario' | 'sistema' | 'ia' | 'assistente_do_sistema';
  mensagem: string;
  id: number;
}

const Pagina_de_chat: React.FC<ChatParams> = ({openMensagemSistema,tem_dados_salvos}) => {
  const [init, setInit] = useState(true)
  const [contador, setContador] = React.useState(0)
  const [inputMensagem, setInputMensagem] = React.useState("")
  const [mensagens, setMensagens] = React.useState<Array<InterfaceRegistroDeMensagem>>([])
  const [modoMic, setModoMic] = React.useState<boolean>(false)
  const [estagiosMic, setEstagiosMic] = React.useState<'inicial' | 'intermediario' | 'final'>('inicial')
  const [esperandoResposta, setEsperandoResposta] = React.useState(false)
  const [conversaExiste, setConversaExiste] = React.useState<{abrir_msg_sys: boolean, existe:boolean}>({
    existe: tem_dados_salvos ? tem_dados_salvos != undefined || tem_dados_salvos : false, abrir_msg_sys: false
  })

  useEffect(() => {
    if(init){
      setEsperandoResposta(true)
      setInit(false)
      const verifica_conversa = async () => {
        await api.get('/chat/registro/conversa_usuario')
        .then((response) => {
          const dado:string = response.data.registro
          if (dado.length){
            setConversaExiste({
              ...conversaExiste,
              abrir_msg_sys:true,
              existe: true
            })
          }else {
            setConversaExiste({
              ...conversaExiste,
              abrir_msg_sys:false,
              existe: false
            })
          }
        })
        .finally(() => setEsperandoResposta(false))
      }
      verifica_conversa()
    }
  }, [init])

  useEffect(() => {
    const verUltimaMensagem = document.querySelector(".chatArea");
    if (mensagens.length-1 >= 0 && verUltimaMensagem && (mensagens[mensagens.length-1].entidade === "usuario" || mensagens[mensagens.length-1].entidade === "assistente_do_sistema")) {
      verUltimaMensagem.scrollTop = verUltimaMensagem.scrollHeight;
    }
  }, [mensagens]);

  const addMsgNoHistorico = async (index: number, entidade: 'sistema' | 'usuario' | 'ia' | 'assistente_do_sistema', mensagem: string) => {
    setMensagens((preventMsg) => [
      ...preventMsg,
      {
        entidade: entidade,
        mensagem: mensagem,
        id: index
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
            addMsgNoHistorico(cont + 2, "ia", e.data.mensagem)
            setEstagiosMic('inicial')
          }, 100)
        })
        .catch((error) => {
          if (error.response.status == 400){
            openMensagemSistema(error.response.mensagem)
          }

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
        if (response.status == 200 || response.status ==202){
          const resposta : string = response.data.mensagem
          addMsgNoHistorico(cont + 1, "assistente_do_sistema", resposta.length > 0 ? resposta : "Arquivos gerados com sucesso.")
          setEstagiosMic('intermediario')
        } else {
          addMsgNoHistorico(cont + 1, "assistente_do_sistema", `Erro ao gerar o arquivo. ${response.data.mensagem}`)
        }
      })
      .catch((error) => {
        if (error.response.status < 500){
          const resposta : string = error.response.data.mensagem
          addMsgNoHistorico(cont + 1, "assistente_do_sistema", resposta.length > 0 ? resposta : "Houve um problema ao gerar o arquivo.")
        } else {
          addMsgNoHistorico(cont + 1, "sistema", `Houve um problema ao gerar o arquivo. ${error.response.data.mensagem}`)
        }
      })
      .finally(() => {
        setEsperandoResposta(false)
        setContador((prev) => prev + 1);
      })
  }

  const handleCompilarProjeto = async () => {
    let cont = contador
    setEsperandoResposta(true)
    await api.post('/compilar', null, {timeout:5*60000})
      .then((response) => {
        if(response.status = 200){
          const resposta: string = response.data.mensagem
          addMsgNoHistorico(cont + 1, "assistente_do_sistema", resposta.length > 0 ? resposta : "Projeto compilado com sucesso")
          setEstagiosMic('final')
        } else {
          addMsgNoHistorico(cont + 1, "assistente_do_sistema", `Houve um problema ao compilar o arquivo. ${response.data.mensagem}`)
        }
      })
      .catch((error) => {
        if (error.response.status < 500){
          const resposta : string = error.response.data.mensagem
          addMsgNoHistorico(cont + 1, "assistente_do_sistema", resposta.length > 0 ? resposta : "Houve um problema ao compilar o arquivo.")
        } else {
          addMsgNoHistorico(cont + 1, "sistema", `Houve um problema ao compilar o arquivo. ${error.response.data.mensagem}`)
        }
      })
      .finally(() => {
        setEsperandoResposta(false)
        setContador((prev) => prev + 1);
      })
  }

  const handleGravarCodigo = async () => {
    let cont = contador
    setEsperandoResposta(true)
    await api.post('/gravar', null, {timeout:5*60000})
      .then((response) => {
        if(response.status = 200){
          const resposta: string = response.data.mensagem
          addMsgNoHistorico(cont + 1, "assistente_do_sistema", resposta.length > 0 ? resposta : "Código gravado com sucesso.")
        }
      })
      .catch((error) => {
        if (error.response.status < 500){
          const resposta : string = error.response.data.mensagem
          addMsgNoHistorico(cont + 1, "assistente_do_sistema", resposta.length > 0 ? resposta : "Houve um problema ao gravar o código no microcoontrolador.")
        } else {
          addMsgNoHistorico(cont + 1, "sistema", `Houve um problema ao gravar o código no microcoontrolador. ${error.response.data.mensagem}`)
        }
      })
      .finally(() => {
        setEsperandoResposta(false)
        setContador((prev) => prev + 1);
      })
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
          const retorno = mensagem.entidade === 'sistema' || mensagem.entidade === 'assistente_do_sistema' ?
            <MsgChatSistema key={mensagem.id} text={mensagem.mensagem} /> :
              mensagem.entidade === 'ia' ? <MsgChatIA key={mensagem.id} text={mensagem.mensagem} /> :
              <MsgChatUsuario key={mensagem.id} text={mensagem.mensagem} />
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
      {
        conversaExiste.abrir_msg_sys &&
        <OpcaoBinariaSistema 
          alternaticaTrueCallback={async() => {
            setEsperandoResposta((true))
            await api.get('/chat/historico')
              .then(async (response_hist) => {
                if (response_hist.status == 200){
                  await api.post('/ia/carregar_contexto_anterior')
                    .then((response) => {
                      if (response.status < 300){
                        setConversaExiste({
                          ...conversaExiste,
                          abrir_msg_sys:false
                        })
                        const dados: InterfaceRegistroDeMensagem[] = response_hist.data.registro

                        const conversas_chat = [];
                        for(const registro of dados){
                          if (registro.entidade === "ia" || registro.entidade === "usuario" || registro.entidade === "assistente_do_sistema")
                            conversas_chat.push(registro)
                        }
                        
                        if (conversas_chat.length == 0){
                          openMensagemSistema("Não há mensagens salvas.")
                          return
                        }

                        setContador(conversas_chat[conversas_chat.length-1].id)
                        setMensagens(conversas_chat)
                      }
                    })
                    .catch((responseError) => {
                      openMensagemSistema(responseError.response.data.mensagem)
                    })
                }
              })
              .catch((responseError) => {openMensagemSistema(responseError.response.data.mensagem)})
              .finally(() => setEsperandoResposta(false))
          }}
          alternativaFalseCallback={async () => {
            await api.delete('/chat/registro/remover_conversa')
              .then((response) => {
                if (response.status == 200){
                  setConversaExiste({
                    ...conversaExiste,
                    abrir_msg_sys:false
                  })
                  openMensagemSistema("Histórico apagado com êxito.")
                }
              })
              .catch((error) => {console.error(error)})
              .finally(() => setEsperandoResposta(false))
          }}
          mensagemSistema="Deseja continuar mantendo o histórico da última conversa?"
          textBtnFalse="Não"
          textBtnTrue="Sim"
        />
      }
    </Box>
  )
}

export default Pagina_de_chat;